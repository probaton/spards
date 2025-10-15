export interface SpellDetails {
  index: string;
  name: string;
  level: number;
  desc: string[];
  range: string;
  components: string[];
  material?: string;
  ritual: boolean;
  duration: string;
  concentration: boolean;
  casting_time: string;
  school: {
    name: string;
    url: string;
  };
  classes: Array<{
    name: string;
    url: string;
  }>;
}

export async function fetchSpellDetails(index: string): Promise<SpellDetails | string> {
  try {
    const response = await fetch(`https://www.dnd5eapi.co/api/spells/${index}`);

    if (!response.ok) {
      return `Failed to fetch spell: ${response.statusText}`;
    }

    return await response.json();
  } catch (e) {
    return `Unknown error occurred${e instanceof Error && e.message ? `: ${e.message}` : ''}`;
  }
}
