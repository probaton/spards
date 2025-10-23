import { JSDOM } from 'jsdom';

export interface SpellDetails extends Stub {
  area_of_effect?: AreaOfEffect;
  casting_time: string;
  classes: Stub[];
  components: string[];
  concentration: boolean;
  desc: string[];
  damage?: Damage;
  duration: string;
  higher_level?: string[];
  level: number;
  material?: string;
  range: string;
  ritual: boolean;
  school: Stub;
  subclasses?: Stub[];
  updated_at: string;
}

interface Stub {
  index: string;
  name: string;
  url: string;
}

interface AreaOfEffect {
  type: string;
  size: number;
}

interface Damage {
  damage_type: Stub;
  damage_at_slot_level: Record<string, string>;
  damage_at_character_level: Record<string, string>;
}

export async function fetchSpellDetails(index: string): Promise<SpellDetails | string> {
  try {
    const response = await fetch(`https://www.dnd5eapi.co/api/spells/${index}`);
    if (response.ok) return response.json();

    if (response.status == 404) {
      const wikidotResponse = await fetch(`https://dnd5e.wikidot.com/spell:${index}`);
      if (wikidotResponse.status === 404) {
        return `Failed to find spell ${index}: ${wikidotResponse.statusText}`;
      }
      
      if (!wikidotResponse.ok) {
        return `Failed to fetch spell from Wikidot: ${wikidotResponse.statusText}`;
      }

      return parseSpellDetailsFromWikidot(index, await wikidotResponse.text());
    }

    return `Failed to fetch spell from SRE: ${response.statusText}`;
  } catch (e) {
    return `Unknown error occurred${e instanceof Error && e.message ? `: ${e.message}` : ''}`;
  }
}

function parseSpellDetailsFromWikidot(index: string, html: string): SpellDetails {
  const { document } = new JSDOM(html).window;
  const [
    _source,
    subheader,
    stats,
    ...descriptionParagraphsAndClassList
  ] = [...document.querySelectorAll('#page-content > p')].map(e => e.textContent)

  const { level, ritual, school } = parseSubheader(subheader);
  const { casting_time, range, components, material, duration, concentration } = parseStats(stats);
  return {
    casting_time,
    concentration,
    classes: parseClasses(descriptionParagraphsAndClassList),
    components,
    desc: descriptionParagraphsAndClassList.slice(0, -1),
    duration,
    index,
    level,
    material, 
    name: getTextContent(document, '.page-title > span'),
    range,
    ritual,
    school: { name: school, url: '', index: school.toLowerCase() },
    updated_at: '',
    url: `https://dnd5e.wikidot.com/spell:${index}`,
  };
}

function getTextContent(parentNode: Document | Element, selector: string): string {
  const text = parentNode.querySelector(selector)?.textContent?.trim();
  if (!text) throw new Error(`Failed to find text content for selector: ${selector}`);
  return text;
}

function capitalizeFirstLetter(txt: string): string {
  return `${txt[0].toUpperCase()}${txt.slice(1)}`;
}

function parseSubheader(subheaderText: string): { level: number; ritual: boolean; school: string } {
  const firstCharNum = Number(subheaderText.slice(0, 1));
  const rawSchool = subheaderText.replace(/^(?:\d\w\w-level )?(\w+).*/, '$1');
  return {
    level: isNaN(firstCharNum) ? 0 : firstCharNum,
    ritual: subheaderText.includes('(ritual)'),
    school: capitalizeFirstLetter(rawSchool),
  };
}

function parseStats(statsText: string): { casting_time: string; range: string; components: string[]; material?: string, duration: string; concentration: boolean } {
  const [casting_time, range, rawComponents, rawDuration] = statsText.split('\n').map(t => t.replace(/.+: (.*)/, '$1').trim());
  const rawMaterial = rawComponents.match(/\((.*)\)/)?.[1];
  const concentration = rawDuration.startsWith('Concentration');
  return {
    casting_time,
    range,
    components: rawComponents.match(/\b[A-Z]\b/g) || [],
    material: rawMaterial && capitalizeFirstLetter(rawMaterial),
    duration: rawDuration.replace('Concentration, ', ''),
    concentration, 
  };
}

function parseClasses(texts: string[]): Stub[] {
  const classStrings = texts[texts.length - 1].split(', ').map(s => s.trim());
  return classStrings.map(name => ({ name, url: '', index: name.toLowerCase() }));
}
