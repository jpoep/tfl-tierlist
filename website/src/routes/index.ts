import type { RequestHandler } from '@sveltejs/kit';
import prodTierlist from '$lib/data/tierlist.json';
import devTierlist from '$lib/data/tierlist-dev.json';
import teamsData from '$lib/data/teams.json';
import pkg, { type PokemonForm, type PokemonSpecies } from 'pokenode-ts';
import type { Ability, PokemonType, Stats, Team, Typing } from '$lib/types/pokemon';
import {
	transformTeam,
	type JsonPokemon,
	type JsonPokemonObject,
	type JsonTier
} from '$lib/types/json';
const { PokemonClient } = pkg;

const api = new PokemonClient();

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

export const GET: RequestHandler = async ({ url }) => {
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

	function throwExpression(errorMessage: string): never {
		throw new Error(errorMessage);
	}

	async function getAbility(abilityName: string): Promise<Ability> {
		if (abilityName in abilityCache) {
			return abilityCache[abilityName];
		}
		const ability = await api.getAbilityByName(abilityName);
		const error = () => throwExpression(`Ability "${abilityName}" not found.`);
		const byLanguage = (language: string) => (verboseEffect: pkg.Name | pkg.VerboseEffect) =>
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
				.catch((it) => logError(it, pokemonName, 'species')),
			api
				.getPokemonFormByName(pokemon.forms[0].name)
				.then((it) => {
					console.info('\tForm data for ' + pokemonName + ' fetched');
					return it;
				})
				.catch((it) => logError(it, pokemonName, 'form')),
			...pokemon.abilities.map((it) =>
				getAbility(it.ability.name)
					.then((it) => {
						console.info('\tAbility data for ' + pokemonName + ' fetched');
						return it;
					})
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

	const tierlistJson: JsonTier[] = (dev ? devTierlist.tiers : prodTierlist.tiers) as JsonTier[];

	const tierlist = await Promise.all(
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
