import type { RequestHandler } from '@sveltejs/kit';
import tierlistJson from '$lib/tierlist.json';

export type Tier = {
	name: string;
	rank: number;
	pokemon: Pokemon[];
};

export type Pokemon = {
	name: {
		en: string;
		de: string;
	};
	id: string,
	typing: string[];
	imageUrl: string;
	pokemonDbUrl: string;
};

export const get: RequestHandler = async () => {
	const pokeApi = `https://pokeapi.co/api/v2/pokemon`;

	const getNames: { (url: string): Promise<{ en: string; de: string }> } = async (
		url
	) => {
		const response = await fetch(url).catch((error) => {
			console.error(error.message);
		});
		if (!response) return;

		const names = await response.json();

		return {
			en: names.names.find((it) => it.language.name === 'en').name as string,
			de: names.names.find((it) => it.language.name === 'de').name as string
		};
	};

	const fetchPokemon: { (pokemonName: string): Promise<Pokemon> } = async (pokemonName: string) => {
		const response = await fetch(`${pokeApi}/${pokemonName}`);
		if (!response.ok) {
			return Promise.reject(`Pokemon ${pokemonName} failed to resolve.`);
		}
		const pokemon = await response.json();
		const species = pokemon.species.name;
		return {
			typing: pokemon.types.map((it) => it.type.name),
			imageUrl: pokemon.sprites.front_default,
			name: await getNames(pokemon.species.url),
			id: pokemonName,
			pokemonDbUrl: `https://pokemondb.net/pokedex/${species}`
		} as Pokemon;
	};

	const tierlist = async () =>
		await Promise.all(
			tierlistJson.tiers.map(async (element) => {
				return {
					name: element.name,
					rank: element.rank,
					pokemon: (
						await Promise.allSettled(element.pokemon.map(async (it) => await fetchPokemon(it)))
					)
					//  .filter(it => it.status == 'rejected')
						.map((it: PromiseFulfilledResult<Pokemon>) => it.value)
				};
			})
		);

	return {
		body: {
			tierlist: await tierlist()
		}
	};
};
