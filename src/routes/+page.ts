import type { PageLoad } from './$types';

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

export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch('https://www.dnd5eapi.co/api/spells');
	const data: GetSpellsResponse = await response.json();

	return {
		spells: data.results
	};
};
