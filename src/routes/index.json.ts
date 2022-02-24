import type { RequestHandler } from '@sveltejs/kit';
import prodTierlist from '$lib/tierlist.json';
import devTierlist from '$lib/tierlist-dev.json';

const dev = process.env.NODE_ENV === 'development';

export type Tier = {
	name: string;
	rank: number;
	subtitles: string[] | undefined;
	pokemon: PokemonType[];
};

export type PokemonType = {
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

	const fetchPokemon: { (pokemonName: string): Promise<PokemonType> } = async (
		pokemonName: string
	) => {
		console.info(`Fetching data for ${pokemonName}`);
		const response = await fetch(`${pokeApi}/${pokemonName}`).catch((error) =>
			Promise.reject(error.message)
		);
		if (!response.ok) {
			return Promise.reject(`Pokemon ${pokemonName} failed to resolve.`);
		}
		console.info(`Data for ${pokemonName} fetched; names and form names are next.`);

		const pokemon = await response.json();
		const species = pokemon.species.name;
		const [name, form] = await Promise.all([
			getName(pokemon.species.url),
			getForm(pokemon.forms[0].url)
		]).catch(() => ['???', '']);

		const returnValue = {
			typing: pokemon.types.map((it) => it.type.name),
			imageUrl: pokemon.sprites.front_default,
			name,
			form,
			id: pokemonName,
			pokemonDbUrl: `https://pokemondb.net/pokedex/${species}`
		} as PokemonType;

		console.info(`Names for ${pokemonName} fetched.`);
		return returnValue;
	};

	const tierlistJson = dev ? devTierlist : prodTierlist;

	const tierlist = await Promise.all(
		tierlistJson.tiers.map(async (element) => {
			console.info(`Fetching Pokemon for ${element.name} tier`);
			return {
				name: element.name,
				rank: element.rank as number,
				subtitles: element.subtitles,
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
