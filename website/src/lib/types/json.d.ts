import type { OptionalPokemonType, Tier } from './pokemon';

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
