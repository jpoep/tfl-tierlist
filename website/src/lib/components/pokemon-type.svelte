<script lang="ts" context="module">
	export const types: {
		[key in Type]: {
			de: string;
			en: string;
		};
	} = {
		normal: {
			de: 'Normal',
			en: 'Normal'
		},
		fire: {
			de: 'Feuer',
			en: 'Fire'
		},
		water: {
			de: 'Wasser',
			en: 'Water'
		},
		electric: {
			de: 'Elektro',
			en: 'Electric'
		},
		grass: {
			de: 'Pflanze',
			en: 'Grass'
		},
		ice: {
			de: 'Eis',
			en: 'Ice'
		},
		fighting: {
			de: 'Kampf',
			en: 'Fighting'
		},
		poison: {
			de: 'Gift',
			en: 'Poison'
		},
		ground: {
			de: 'Boden',
			en: 'Ground'
		},
		flying: {
			de: 'Flug',
			en: 'Flying'
		},
		psychic: {
			de: 'Psycho',
			en: 'Psychic'
		},
		bug: {
			de: 'Käfer',
			en: 'Bug'
		},
		rock: {
			de: 'Gestein',
			en: 'Rock'
		},
		ghost: {
			de: 'Geist',
			en: 'Ghost'
		},
		dragon: {
			de: 'Drache',
			en: 'Dragon'
		},
		dark: {
			de: 'Unlicht',
			en: 'Dark'
		},
		steel: {
			de: 'Stahl',
			en: 'Steel'
		},
		fairy: {
			de: 'Fee',
			en: 'Fairy'
		},
		salt: {
			de: 'Salz',
			en: 'Salt'
		}
	};
</script>

<script lang="ts">
	import { language } from '$lib/stores/language';
	import type { Type } from '../types/pokemon';

	export let type1: Type;
	export let type2: Type | null = null;
</script>

<div>
	<span class={type1}>{types[type1][$language]}</span>
	{#if type2}
		<span class={type2}>{types[type2][$language]}</span>
	{/if}
</div>

<style lang="scss">
	div {
		display: flex;
		justify-content: center;
		gap: 0.5rem;
	}
	span {
		display: block;
		max-width: 9ch;
		min-width: 9ch;
		border-radius: 2px;
		color: white;
		padding: 0.2rem 0.2rem;
		text-align: center;
		font-size: small;
		font-weight: 700;
		text-transform: uppercase;
		flex-grow: 1;
	}
</style>
