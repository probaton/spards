import { fetchMonsterDetails } from '../util/fetchMonsterDetails';
import { fetchSpellDetails } from '../util/fetchSpellDetails';
import { readConfFile } from '../util/readConfFile';
import type { PageServerLoad } from './$types';

// export interface Spell {
// 	index: string;
// 	name: string;
// 	level: number;
// 	url: string;
// }

// interface GetSpellsResponse {
// 	count: number;
// 	results: Spell[];
// }

// export const load: PageServerLoad = async ({ fetch }) => {
// 	const response = await fetch('https://www.dnd5eapi.co/api/spells');
// 	const data: GetSpellsResponse = await response.json();
// 	const spellRequests = data.results.map(spell => fetchSpellDetails(spell.index));
//   const spells = await Promise.all(spellRequests) as SpellDetails[];

// 	return { spellInfo: spells.map(s => ({ spell: s, error: typeof s === 'string' ? s : undefined })) };
// };

export const load: PageServerLoad = async () => {
	const spellRequests = (await readConfFile('spells')).map(index => fetchSpellDetails(index));
	const monsterRequests = (await readConfFile('monsters')).map(index => fetchMonsterDetails(index));

  const [spells, monsters] = await Promise.all([Promise.all(spellRequests), Promise.all(monsterRequests)]);

	return {
		spells: spells.filter(s => typeof s !== 'string'),
		monsters: monsters.filter(m => typeof m !== 'string'),
		errors: [...spells, ...monsters].filter(result => typeof result === 'string'),
	};
};
