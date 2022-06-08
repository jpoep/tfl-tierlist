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

export type StatKeys = 'hp' | 'atk' | 'def' | 'spatk' | 'spdef' | 'spd';

export type Stats = {
	[Property in StatKeys]: number;
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
	form?: {
		en: string;
		de: string;
	};
	notes?: {
		en: string;
		de: string;
	};
	baseStats: Stats;
	abilities: Ability[];
	id: string;
	team?: Team;
	typing: Typing;
	imageUrl?: string;
	miniSpriteUrl?: string;
	pokemonDbUrl?: string;
};

export type OptionalPokemonType = {
	[Property in keyof PokemonType]?: PokemonType[Property];
};

export type Type =
	| 'normal'
	| 'fire'
	| 'water'
	| 'electric'
	| 'grass'
	| 'ice'
	| 'fighting'
	| 'poison'
	| 'ground'
	| 'flying'
	| 'psychic'
	| 'bug'
	| 'rock'
	| 'ghost'
	| 'dragon'
	| 'dark'
	| 'steel'
	| 'fairy'
	| 'salt';

export type Typing = Type[];
