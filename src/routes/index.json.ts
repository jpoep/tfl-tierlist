import type { RequestHandler } from '@sveltejs/kit';
import prodTierlist from '$lib/data/tierlist.json';
import devTierlist from '$lib/data/tierlist-dev.json';
import teamsData from '$lib/data/teams.json';
import pkg, { ItemClient, type PokemonForm, type PokemonSpecies } from 'pokenode-ts';
const { PokemonClient } = pkg;

const api = new PokemonClient();

const dev = process.env.NODE_ENV === 'development';

export type Team = {
	name: string;
	player: string;
	logo: {
		avif: string;
		webp: string;
		png: string;
	};
	pokemon: string[];
};

export type Tier = {
	name: string;
	rank: number;
	emptyText: string;
	subtitles: string[] | undefined;
	pokemon: PokemonType[];
};

export type Stats = {
	hp: number;
	atk: number;
	def: number;
	spatk: number;
	spdef: number;
	spd: number;
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
	baseStats: Stats;
	abilities: string[];
	id: string;
	team: Team | undefined;
	typing: string[];
	imageUrl: string;
	pokemonDbUrl: string;
};

type JsonPokemonObject = {
	internalName: string,
	pokemon: string,	
	overrides: PokemonType
}

type JsonPokemon = string | JsonPokemonObject

function isJsonPokemonObject(jsonPokemon: any): jsonPokemon is JsonPokemonObject {
	return typeof jsonPokemon === 'object' && "internalName" in jsonPokemon;
}


function transformTeam(team): Team {
	return {
		...team,
		logo: {
			avif: team.logo + '.avif',
			webp: team.logo + '.webp',
			png: team.logo + '.png'
		}
	};
}

const transformedTeamsData: Team[] = teamsData.teams.map(transformTeam);

export const get: RequestHandler = async ({ url }) => {
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

	const getStats: {
		(pokemon: pkg.Pokemon): Stats;
	} = (pokemon) => {
		const stats = pokemon.stats.map((stat) => stat.base_stat);
		return {
			hp: stats[0],
			atk: stats[1],
			def: stats[2],
			spatk: stats[3],
			spdef: stats[4],
			spd: stats[5]
		};
	};

	const getAbilities: {
		(pokemon: pkg.Pokemon): string[];
	} = (pokemon) => pokemon.abilities.map((ability) => ability.ability.name);

	const logError = (error: Error, pokemonName: string, method: string) => {
		console.log(`${pokemonName}, ${method}: ${error}`);
		throw error;
	};

	const fetchPokemon: { (pokemon: JsonPokemon): Promise<PokemonType> } = async (
		jsonPokemon: JsonPokemon
		) => {
		const jsonPokemonObject = isJsonPokemonObject(jsonPokemon) ? jsonPokemon : undefined;
		const pokemonName = jsonPokemonObject?.pokemon|| jsonPokemon as string;

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
			id: jsonPokemonObject?.internalName || pokemonName,
			baseStats: getStats(pokemon),
			abilities: getAbilities(pokemon),
			pokemonDbUrl: `https://pokemondb.net/pokedex/${species.name}`,
			...jsonPokemonObject?.overrides
		} as PokemonType;

		console.info(`Names for ${jsonPokemon} fetched.`);
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
				pokemon: (await Promise.all(element.pokemon.map(async (pokemon: JsonPokemon) => fetchPokemon(pokemon)))).map(
					(it) => ({
						...it,
						notes: element.notes?.[it.id],
						team: transformedTeamsData.find((team) => team.pokemon.includes(it.id))
					})
				)
			};
		})
	);

	return {
		body: {
			tierlist,
			teams: transformedTeamsData,
			initialFilter: url.searchParams.get('q')
		}
	};
};
