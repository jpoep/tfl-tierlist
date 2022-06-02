import type { PokemonType, Team } from 'src/routes/index.json';
import { language } from '$lib/stores/store';
import { get } from 'svelte/store';

export class Pokemon implements PokemonType {
	constructor(pokemon: PokemonType) {
		Object.assign(this, pokemon);
	}
	baseStats: { hp: number; atk: number; def: number; spatk: number; spdef: number; spd: number };
	abilities: string[];

	name: { en: string; de: string };
	form: { en: string; de: string } | undefined;
	notes: { en: string; de: string } | undefined;
	id: string;
	team: Team | undefined;
	typing: string[];
	imageUrl: string;
	pokemonDbUrl: string;

	get localName(): string {
		return this.name[get(language)];
	}

	get localForm(): string | undefined {
		return this.form?.[get(language)];
	}

	get localNotes(): string | undefined {
		return this.notes?.[get(language)];
	}
}
