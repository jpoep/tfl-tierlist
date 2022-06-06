import type { RequestHandler } from '@sveltejs/kit';
import prodTierlist from '$lib/data/tierlist.json';
import devTierlist from '$lib/data/tierlist-dev.json';
import teamsData from '$lib/data/teams.json';
import pkg, { type PokemonForm, type PokemonSpecies } from 'pokenode-ts';
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

export type Ability = {
	de: {
		name: string;
		description: string;
	};
	en: {
		name: string;
		description: string;
	};
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
	abilities: Ability[];
	id: string;
	team: Team | undefined;
	typing: string[];
	imageUrl: string;
	pokemonDbUrl: string;
};

type AbilityCache = {
	[key: string]: Ability;
};

type JsonPokemonObject = {
	internalName: string;
	pokemon: string;
	overrides: PokemonType;
};

type JsonPokemon = string | JsonPokemonObject;

const abilityCache: AbilityCache = {};

function isJsonPokemonObject(jsonPokemon: unknown): jsonPokemon is JsonPokemonObject {
	return typeof jsonPokemon === 'object' && 'internalName' in jsonPokemon;
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

	async function getAbility(abilityName: string): Promise<Ability> {
		if (abilityName in abilityCache) {
			return abilityCache[abilityName];
		}
		const ability = await api.getAbilityByName(abilityName);
		const byLanguage = (language: string) => (verboseEffect: pkg.Name | pkg.VerboseEffect) =>
			verboseEffect.language.name === language;

		const returnAbility: Ability = {
			de: {
				name: ability.names.find(byLanguage('de')).name,
				description:
					ability.effect_entries.find(byLanguage('de'))?.effect ||
					ability.flavor_text_entries
						.filter((it) => it.language.name === 'de')
						?.find((it) => it.version_group.name === 'sword-shield').flavor_text
			},
			en: {
				name: ability.names.find(byLanguage('en')).name,
				description:
					ability.effect_entries.find(byLanguage('en'))?.effect ||
					ability.flavor_text_entries
						.filter((it) => it.language.name === 'en')
						?.find((it) => it.version_group.name === 'sword-shield').flavor_text
			}
		};
		abilityCache[abilityName] = returnAbility;
		return returnAbility;
	}

	const logError = (error: Error, pokemonName: string, method: string) => {
		console.error(`${pokemonName}, ${method}: ${error}`);
		if (!dev) {
			console.error('Not in Dev environment; aborting.');
			throw error;
		}
	};

	const fetchPokemon: { (pokemon: JsonPokemon): Promise<PokemonType> } = async (
		jsonPokemon: JsonPokemon
	) => {
		const jsonPokemonObject = isJsonPokemonObject(jsonPokemon) ? jsonPokemon : undefined;
		const pokemonName = jsonPokemonObject?.pokemon || (jsonPokemon as string);

		console.info(`Fetching data for ${pokemonName}`);

		const pokemon = await api
			.getPokemonByName(pokemonName)
			.catch((it) => logError(it, pokemonName, 'main'));

		if (!pokemon) {
			console.error(`${pokemonName} could not be fetched. Continuing with mock Pokemon`);
			return {
				id: pokemonName,
				abilities: [
					{
						de: {
							description: 'Test Description Lorem ipsum dolor sit amet bla',
							name: 'Ability'
						},
						en: {
							description: 'another one',
							name: 'Ability'
						}
					},
					{
						de: {
							description: 'Test Description Lorem ipsum dolor sit amet bla',
							name: 'Ability'
						},
						en: {
							description: 'Test Description Lorem ipsum dolor sit amet bla',
							name: 'Ability'
						}
					}
				],
				baseStats: {
					atk: 0,
					def: 0,
					hp: 0,
					spatk: 0,
					spd: 0,
					spdef: 0
				},
				imageUrl: '',
				name: {
					en: pokemonName,
					de: pokemonName
				},
				pokemonDbUrl: '',
				typing: ['normal'],
				form: undefined,
				notes: undefined,
				team: undefined
			} as PokemonType;
		}

		console.info(`Data for ${pokemonName} fetched; names and forms are next`);

		const [species, form, ...abilities] = await Promise.all([
			api
				.getPokemonSpeciesByName(pokemon.species.name)
				.catch((it) => logError(it, pokemonName, 'species')),
			api
				.getPokemonFormByName(pokemon.forms[0].name)
				.catch((it) => logError(it, pokemonName, 'form')),
			...pokemon.abilities.map((it) =>
				getAbility(it.ability.name).catch((it) => logError(it, pokemonName, 'abilities'))
			)
		]);

		if (!species) {
			console.error(`${pokemonName} could be resolved, but not its form or species. Aborting.`);
		}

		const returnValue = {
			typing: pokemon.types.map((it) => it.type.name),
			imageUrl: pokemon.sprites.front_default,
			name: (species && getName(species)) || { de: pokemonName, en: pokemonName },
			form: form && getForm(form),
			id: jsonPokemonObject?.internalName || pokemonName,
			baseStats: getStats(pokemon),
			abilities: abilities,
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
				pokemon: (
					await Promise.all(
						element.pokemon.map(async (pokemon: JsonPokemon) => fetchPokemon(pokemon))
					)
				).map((it) => ({
					...it,
					notes: element.notes?.[it.id],
					team: transformedTeamsData.find((team) => team.pokemon.includes(it.id))
				}))
			};
		})
	);

	return {
		body: {
			tierlist,
			teams: transformedTeamsData,
			initialFilter: url.searchParams.get('q')
		},
		status: 200,
		headers: { 'Content-Type': 'application/json' }
	};
};