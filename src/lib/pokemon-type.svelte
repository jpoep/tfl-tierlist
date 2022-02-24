<script lang="ts" context="module">
	export const types = {
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
		}
	};
</script>

<script lang="ts">
	import { language } from '$lib/stores/store';

	export let type1: string;
	export let type2: string | null = null;
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
		max-width: 8ch;
		min-width: 7ch;
		border-radius: 2px;
		color: white;
		padding: 0.2rem 0.5rem;
		text-align: center;
		font-size: small;
		font-weight: 700;
		text-transform: uppercase;
	}
</style>
