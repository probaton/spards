import { JSDOM } from 'jsdom';
import type { Stub } from './sreTypes';

export interface ItemDetails extends Stub {
  equipment_category: Stub;
  rarity: Rarity;
  variants: Stub[];
  variant: boolean;
  desc: string[];
  image: string;
  updated_at: string;
}

interface Rarity {
  name: string;
}

export async function fetchItemDetails(index: string): Promise<ItemDetails | string> {
  try {
    if (index.startsWith('w ')) {
      return fetchItemDetailsFromWikidot(index.slice(2));
    }

    const response = await fetch(`https://www.dnd5eapi.co/api/magic-items/${index}`);
    if (response.ok) {
      return response.json();
    }

    if (response.status !== 404) {
      return `Unknown error occurred fetching item ${index} from SRE: ${response.statusText}`;
    }

    return fetchItemDetailsFromWikidot(index);
  } catch (e) {
    return `Unknown error occurred fetching item ${index}: ${e instanceof Error && e.message ? `: ${e.message}` : ''}`;
  }
}

async function fetchItemDetailsFromWikidot(index: string): Promise<ItemDetails | string> {
  const wikidotResponse = await fetch(`https://dnd5e.wikidot.com/wondrous-items:${index}`);
  if (wikidotResponse.ok) {
    return parseItemDetailsFromWikidot(index, await wikidotResponse.text());
  }

  if (wikidotResponse.status === 404) {
    return `Failed to find item ${index} on Wikidot: ${wikidotResponse.statusText}`;
  }
  
  return `Failed to fetch item ${index} from Wikidot: ${wikidotResponse.statusText}`;
}

function parseItemDetailsFromWikidot(index: string, html: string): ItemDetails {
  const { document } = new JSDOM(html).window;
  const [
    _source,
    ...paragraphs
  ] = [...document.querySelectorAll('#page-content > p')].map(e => e.textContent);

  return {
    desc: paragraphs,
    rarity: parseRarity(paragraphs[0] || ''),
    index,
    equipment_category: { name: 'Wondrous Items', index: 'wondrous-item', url: `https://dnd5e.wikidot.com/wondrous-items:${index}` },
    variant: false,
    variants: [],
    image: '',
    name: getTextContent(document, '.page-title > span'),
    updated_at: '',
    url: `https://dnd5e.wikidot.com/wondrous-items:${index}`,
  };
}

function getTextContent(parentNode: Document | Element, selector: string): string {
  const text = parentNode.querySelector(selector)?.textContent?.trim();
  if (!text) throw new Error(`Failed to find text content for selector: ${selector}`);
  return text;
}

function parseRarity(text: string): Rarity {
  const rarityString = text.split(', ')[1]?.trim().toLowerCase() || 'Could not parse rarity';
  return { name: rarityString };
}
