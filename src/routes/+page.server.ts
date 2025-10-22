import { fetchSpellDetails, type SpellDetails } from '../util/fetchSpellDetails';
import type { PageServerLoad } from './$types';

export interface Spell {
	index: string;
	name: string;
	level: number;
	url: string;
}

// interface GetSpellsResponse {
// 	count: number;
// 	results: Spell[];
// }

// export const load: PageServerLoad = async ({ fetch }) => {
// 	const response = await fetch('https://www.dnd5eapi.co/api/spells');
// 	const data: GetSpellsResponse = await response.json();

// 	return {
// 		spells: data.results
// 	};
// };

export const load: PageServerLoad = async () => {
	const galSpellRequests: Promise<SpellDetails | string>[] = [
		'toll-the-dead',
		'silvery-barbs',
		'protection-from-evil-and-good',
		'levitate',
		'sending',
		'message',
		'alarm',
		'identify',
		'flaming-sphere',
		'chill-touch',
		'burning-hands',
		'mage-armor',
		'magic-missile',
		'shield',
		'counterspell',
		'invisibility',
		'mage-hand',
		'hold-person',
		'misty-step',
		'scorching-ray',
		'mending',
		'comprehend-languages',
		'charm-person',
		'detect-magic',
		// too big
		// { index: 'animate-dead' },
	].map(index => fetchSpellDetails(index));
  const spells = await Promise.all(galSpellRequests);
	return { spellInfo: spells.map(s => ({ spell: s, error: typeof s === 'string' ? s : undefined })) };
};
