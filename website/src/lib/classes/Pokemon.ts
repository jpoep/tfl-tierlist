import { language } from '$lib/stores/store';
import { get } from 'svelte/store';
import type { Ability, PokemonType, Stats, Team, Typing } from '$lib/types/pokemon';

export class Pokemon implements PokemonType {
	constructor(pokemon: PokemonType) {
		Object.assign(this, pokemon);
	}
	name!: { en: string; de: string };
	form?: { en: string; de: string } | undefined;
	notes?: { en: string; de: string } | undefined;
	baseStats!: Stats;
	abilities!: Ability[];
	id!: string;
	team?: Team | undefined;
	typing!: Typing;
	imageUrl?: string | undefined;
	pokemonDbUrl?: string | undefined;

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
