import type { RequestHandler } from '@sveltejs/kit';
import prodTierlist from '$data/tierlist.json';
import devTierlist from '$data/tierlist-dev.json';
import pkg, { type PokemonForm, type PokemonSpecies } from 'pokenode-ts';
const { PokemonClient } = pkg;

const api = new PokemonClient();

const dev = process.env.NODE_ENV === 'development';

export type Tier = {
	name: string;
	rank: number;
	emptyText: string;
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
	const getName: {
		(species: PokemonSpecies): { en: string; de: string };
	} = (species) => {
		return {
			en: species.names.find((it) => it.language.name === 'en').name as string,
			de: species.names.find((it) => it.language.name === 'de').name as string
		};
	};

	const getForm: {
		(form: PokemonForm): { en: string; de: string } | null;
	} = (form) => {
		if (form.form_names.length === 0) {
			return null;
		}

		return {
			en: form.form_names.find((it) => it.language.name === 'en').name as string,
			de: form.form_names.find((it) => it.language.name === 'de').name as string
		};
	};

	const logError = (error: Error, pokemonName: string, method: string) => {
		console.log(`${pokemonName}, ${method}: ${error}`);
		throw error;
	};

	const fetchPokemon: { (pokemonName: string): Promise<PokemonType> } = async (
		pokemonName: string
	) => {
		console.info(`Fetching data for ${pokemonName}`);

		const pokemon = await api.getPokemonByName(pokemonName);

		console.info(`Data for ${pokemonName} fetched; names and forms are next`);

		const [species, form] = await Promise.all([
			api
				.getPokemonSpeciesByName(pokemon.species.name)
				.catch((it) => logError(it, pokemonName, 'species')),
			api
				.getPokemonFormByName(pokemon.forms[0].name)
				.catch((it) => logError(it, pokemonName, 'form'))
		]);

		const returnValue = {
			typing: pokemon.types.map((it) => it.type.name),
			imageUrl: pokemon.sprites.front_default,
			name: getName(species),
			form: getForm(form),
			id: pokemonName,
			pokemonDbUrl: `https://pokemondb.net/pokedex/${species.name}`
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
				emptyText: element.emptyText,
				pokemon: (await Promise.all(element.pokemon.map(async (it) => fetchPokemon(it)))).map(
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
