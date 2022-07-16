import type { OptionalPokemonType, Team, Tier } from './pokemon';

export type JsonTier = Omit<Tier, 'pokemon'> & {
	pokemon: JsonPokemon[];
	notes: {
		[key: string]:
			| {
					de: string;
					en: string;
			  }
			| undefined;
	};
};

export type JsonPokemonObject = {
	internalName: string;
	pokemon: string;
	overrides?: OptionalPokemonType;
};

export type JsonPokemon = string | JsonPokemonObject;

// ye idk, this function has no business being here
export function transformTeam(team: Omit<Team, 'logo'> & { logo: string }): Team {
	return {
		...team,
		logo: {
			avif: team.logo + '.avif',
			webp: team.logo + '.webp',
			png: team.logo + '.png'
		}
	};
}
