import prodTierlist from '../data/tierlist.json' assert { type: 'json' };
import teamsData from '../data/teams.json' assert { type: 'json' };
import {
	type PokemonForm,
	type PokemonSpecies,
	PokemonClient,
	type Pokemon,
	type VerboseEffect,
	type Name
} from 'pokenode-ts';
import type {
	Ability,
	InflatedTeam,
	PokemonType,
	PokemonTypeWithoutTeam,
	Stats,
	Team,
	Typing
} from '../src/lib/types/pokemon';
import { writeFileSync } from 'fs';
import {
	transformTeam,
	type JsonPokemon,
	type JsonPokemonObject,
	type JsonTier
} from '../src/lib/types/json.js';

const api = new PokemonClient({
	cacheOptions: {
		maxAge: 60 * 1000
	}
});

const dev = process.env.NODE_ENV === 'development';

type AbilityCache = {
	[key: string]: Ability;
};
const abilityCache: AbilityCache = {};

function isJsonPokemonObject(jsonPokemon: unknown): jsonPokemon is JsonPokemonObject {
	if (jsonPokemon) {
		return typeof jsonPokemon === 'object' && 'internalName' in jsonPokemon;
	}
	return false;
}

const transformedTeamsData: Team[] = teamsData.teams.map(transformTeam);

const getName: {
	(species: PokemonSpecies): { en: string; de: string };
} = (species) => {
	return {
		en: species.names.find((it) => it.language.name === 'en')?.name as string,
		de: species.names.find((it) => it.language.name === 'de')?.name as string
	};
};

const getForm: {
	(form: PokemonForm): { en: string; de: string } | null;
} = (form) => {
	if (form.form_names.length === 0) {
		return null;
	}

	return {
		en: form.form_names.find((it) => it.language.name === 'en')?.name as string,
		de: form.form_names.find((it) => it.language.name === 'de')?.name as string
	};
};

const getStats: {
	(pokemon: Pokemon): Stats;
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

function throwExpression(errorMessage: string): never {
	throw new Error(errorMessage);
}

async function getAbility(abilityName: string): Promise<Ability> {
	if (abilityName in abilityCache) {
		return abilityCache[abilityName];
	}
	const ability = await api.getAbilityByName(abilityName);
	const error = () => throwExpression(`Ability "${abilityName}" not found.`);
	const byLanguage = (language: string) => (verboseEffect: Name | VerboseEffect) =>
		verboseEffect.language.name === language;

	const returnAbility: Ability = {
		de: {
			name: ability.names.find(byLanguage('de'))?.name ?? error(),
			description:
				(ability.effect_entries.find(byLanguage('de'))?.effect ||
					ability.flavor_text_entries
						.filter((it) => it.language.name === 'de')
						?.find((it) => it.version_group.name === 'sword-shield')?.flavor_text) ??
				error()
		},
		en: {
			name: ability.names.find(byLanguage('en'))?.name ?? error(),
			description:
				(ability.effect_entries.find(byLanguage('en'))?.effect ||
					ability.flavor_text_entries
						.filter((it) => it.language.name === 'en')
						?.find((it) => it.version_group.name === 'sword-shield')?.flavor_text) ??
				error()
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
		.catch(() => api.getPokemonByName(pokemonName))
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

	console.info(`Data for ${pokemonName} fetched; additional data is next`);

	const [species, form, ...abilities] = await Promise.all([
		api
			.getPokemonSpeciesByName(pokemon.species.name)
			.then((it) => {
				console.info('\tSpecies data for ' + pokemonName + ' fetched');
				return it;
			})
			.catch(() => api.getPokemonSpeciesByName(pokemon.species.name))
			.catch((it) => logError(it, pokemonName, 'species')),
		api
			.getPokemonFormByName(pokemon.forms[0].name)
			.then((it) => {
				console.info('\tForm data for ' + pokemonName + ' fetched');
				return it;
			})
			.catch(() => api.getPokemonFormByName(pokemon.forms[0].name))
			.catch((it) => logError(it, pokemonName, 'form')),
		...pokemon.abilities.map((it) =>
			getAbility(it.ability.name)
				.then((it) => {
					console.info('\tAbility data for ' + pokemonName + ' fetched');
					return it;
				})
				.catch(() => getAbility(it.ability.name))
				.catch((it) => logError(it, pokemonName, 'abilities'))
		)
	]);

	const FALLBACK_ABILITY_TEXT = 'Konnte Ability nicht laden';
	const fallbackAbility: Ability = {
		de: {
			description: FALLBACK_ABILITY_TEXT,
			name: FALLBACK_ABILITY_TEXT
		},
		en: {
			description: FALLBACK_ABILITY_TEXT,
			name: FALLBACK_ABILITY_TEXT
		}
	};

	const returnValue: PokemonType = {
		typing: pokemon.types.map((it) => it.type.name) as Typing,
		imageUrl: pokemon.sprites.front_default || undefined,
		officialArtworkUrl: pokemon.sprites.other['official-artwork'].front_default || undefined,
		name: (species && getName(species)) || { de: pokemonName, en: pokemonName },
		miniSpriteUrl:
			pokemon.sprites.versions['generation-vii'].icons.front_default ??
			pokemon.sprites.versions['generation-viii'].icons.front_default ??
			undefined,
		form: (form && getForm(form)) || undefined,
		id: jsonPokemonObject?.internalName || pokemonName,
		baseStats: getStats(pokemon),
		abilities: abilities.map((it) => it || fallbackAbility),
		pokemonDbUrl: species?.name && `https://pokemondb.net/pokedex/${species.name}`,
		...jsonPokemonObject?.overrides
	};

	console.info(`\t\tAll data for ${jsonPokemon} fetched.`);
	return returnValue;
};

const tierlistJson: JsonTier[] = prodTierlist.tiers as JsonTier[];

Promise.all(
	tierlistJson.map(async (element: JsonTier) => {
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
).then((tierlist) => {
	writeFileSync('src/lib/data/generated/tierlist.json', JSON.stringify(tierlist));

	const expandedTeams = transformedTeamsData.map((team) => {
		return {
			...team,
			pokemon: team.pokemon.reduce<{ [key: string]: PokemonTypeWithoutTeam[] }>((acc, cur) => {
				const tier = tierlist.find((tier) => tier.pokemon.map((it) => it.id).includes(cur))?.name;
				const errorMessage = `Invalid team: ${team.name}; Pokemon ${cur} not found in tierlist.`;
				if (!tier) {
					throw new Error(errorMessage);
				}
				const pokemon = tierlist.flatMap((it) => it.pokemon).find((it) => it.id === cur);
				delete pokemon?.team;
				if (!pokemon) {
					throw new Error(errorMessage);
				}
				acc[tier] = acc[tier] === undefined ? [pokemon] : [...acc[tier], pokemon];
				return acc;
			}, {})
		} as InflatedTeam;
	});

	writeFileSync('src/lib/data/generated/teams.json', JSON.stringify(expandedTeams));
});
