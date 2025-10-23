import { fetchSpellDetails, type SpellDetails } from '../util/fetchSpellDetails';
import type { PageServerLoad } from './$types';

export interface Spell {
	index: string;
	name: string;
	level: number;
	url: string;
}

interface GetSpellsResponse {
	count: number;
	results: Spell[];
}

export const load: PageServerLoad = async ({ fetch }) => {
	const response = await fetch('https://www.dnd5eapi.co/api/spells');
	const data: GetSpellsResponse = await response.json();
	const spellRequests = data.results.map(spell => fetchSpellDetails(spell.index));
  const spells = await Promise.all(spellRequests) as SpellDetails[];

	return { spellInfo: spells.map(s => ({ spell: s, error: typeof s === 'string' ? s : undefined })) };

};

// export const load: PageServerLoad = async () => {
// 	const galSpellRequests: Promise<SpellDetails | string>[] = [
// 		'toll-the-dead',
// 		'silvery-barbs',
// 		'protection-from-evil-and-good',
// 		'levitate',
// 		'sending',
// 		'message',
// 		'alarm',
// 		'identify',
// 		'chill-touch',
// 		'mage-armor',
// 		'shield',
// 		'counterspell',
// 		'mage-hand',
// 		'misty-step',
// 		'mending',
// 		'comprehend-languages',
// 		'detect-magic',
// 		'flaming-sphere',
// 		'burning-hands',
// 		'magic-missile',
// 		'invisibility',
// 		'hold-person',
// 		'scorching-ray',
// 		'charm-person',
// 		'phantom-steed',
// 		'animate-dead',
// 		'find-familiar',
// 	].map(index => fetchSpellDetails(index));
//   const spells = await Promise.all(galSpellRequests);
// 	return { spellInfo: spells.map(s => ({ spell: s, error: typeof s === 'string' ? s : undefined })) };
// };
