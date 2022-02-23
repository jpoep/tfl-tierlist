import type { RequestHandler } from '@sveltejs/kit';
import prodTierlist from '$lib/tierlist.json';
import devTierlist from '$lib/tierlist-dev.json';

const dev = process.env.NODE_ENV === 'development';

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
	form:
		| {
				en: string;
				de: string;
		  }
		| undefined;
	notes:
		| {
				en: string;
				de: string;
		  }
		| undefined;
	id: string;
	typing: string[];
	imageUrl: string;
	pokemonDbUrl: string;
};

export const get: RequestHandler = async () => {
	const pokeApi = `https://pokeapi.co/api/v2/pokemon`;

	const getName: {
		(speciesUrl: string): Promise<{ en: string; de: string }>;
	} = async (speciesUrl) => {
		const speciesResponse = await fetch(speciesUrl).catch((error) => Promise.reject(error.message));

		if (!speciesResponse.ok) {
			return Promise.reject(`Species of the Pokemon couldn't be accessed. \
								   Species Response: ${speciesResponse.status}`);
		}

		const species = await speciesResponse.json();

		return {
			en: species.names.find((it) => it.language.name === 'en').name as string,
			de: species.names.find((it) => it.language.name === 'de').name as string
		};
	};

	const getForm: {
		(formUrl: string): Promise<{ en: string; de: string } | null>;
	} = async (formUrl) => {
		const formResponse = await fetch(formUrl).catch((error) => Promise.reject(error.message));

		if (!formResponse.ok) {
			return Promise.reject(`Form of the Pokemon couldn't be accessed. \
								   Form Response: ${formResponse.status};`);
		}

		const pokemonForm = await formResponse.json();

		if (pokemonForm.form_names.length === 0) {
			return null;
		}

		return {
			en: pokemonForm.form_names.find((it) => it.language.name === 'en').name as string,
			de: pokemonForm.form_names.find((it) => it.language.name === 'de').name as string
		};
	};

	const fetchPokemon: { (pokemonName: string): Promise<Pokemon> } = async (pokemonName: string) => {
		const response = await fetch(`${pokeApi}/${pokemonName}`).catch((error) =>
			Promise.reject(error.message)
		);
		if (!response.ok) {
			return Promise.reject(`Pokemon ${pokemonName} failed to resolve.`);
		}
		const pokemon = await response.json();
		const species = pokemon.species.name;
		return {
			typing: pokemon.types.map((it) => it.type.name),
			imageUrl: pokemon.sprites.front_default,
			name: await getName(pokemon.species.url),
			form: await getForm(pokemon.forms[0].url),
			id: pokemonName,
			pokemonDbUrl: `https://pokemondb.net/pokedex/${species}`
		} as Pokemon;
	};

	const tierlistJson = dev ? devTierlist : prodTierlist;

	const tierlist = await Promise.all(
		tierlistJson.tiers.map(async (element) => {
			return {
				name: element.name,
				rank: element.rank,
				pokemon: (await Promise.all(element.pokemon.map(async (it) => await fetchPokemon(it)))).map(
					(it) => ({
						...it,
						notes: element.notes?.[it.id]
					})
				)
			};
		})
	);

	return {
		body: {
			tierlist
		}
	};
};
