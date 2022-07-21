import type { Tier } from '$lib/types/pokemon.js';
import { writable } from 'svelte/store';

export const tierlist = writable<Tier[]>([]);
