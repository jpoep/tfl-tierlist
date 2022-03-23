<script lang="ts">
	import DarkModeButton from '$lib/dark-mode-button.svelte';
	import TierComponent from '$lib/tier.svelte';
	import { language } from '$lib/stores/store';
	import type { PokemonType, Team, Tier } from './index.json';
	import LanguageButton from '$lib/language-button.svelte';
	import { types } from '$lib/pokemon-type.svelte';
	import { filter } from '$lib/stores/store';

	export let tierlist: Tier[];
	export let initialFilter: string | undefined;
	
	console.log(initialFilter)
	
	if (initialFilter) {
		$filter = initialFilter
	}

	const contains = (pokemon: PokemonType, term: string) =>
		[
			pokemon.form?.de,
			pokemon.form?.en,
			pokemon.name.de,
			pokemon.name.en,
			types[pokemon.typing[0]]?.de,
			types[pokemon.typing[0]]?.en,
			types[pokemon.typing?.[1]]?.de,
			types[pokemon.typing?.[1]]?.en,
			pokemon.team?.name,
			pokemon.team?.player
		].some((it: string) => it?.toLowerCase().includes(term.toLowerCase()));

	$: sortedList = tierlist.map((it) => ({
		...it,
		pokemon: it.pokemon.sort((a, b) =>
			(a.name[$language] as string).localeCompare(b.name[$language])
		)
	}));

	$: filteredList = sortedList.map((it) => ({
		...it,
		pokemon: it.pokemon.filter((pokemon) => contains(pokemon, $filter))
	}));
</script>

<div class="top-bar">
	<input type="search" bind:value={$filter} placeholder="Nach Pokémon, Typen oder Teams filtern" />
	<div class="spacer" />
	<DarkModeButton />
	<LanguageButton />
</div>

<h1>Tierlist für TFL Season 3</h1>
{#each filteredList as tier}
	<TierComponent {tier} />
{/each}

<style lang="scss">
	:global(.top-bar) {
		width: 100%;
		display: flex;
		justify-content: space-between;
		height: 5rem;
		padding: 1rem;
		gap: 0.5rem;

		input {
			width: 33ch;
			background-color: var(--bg-color-highlighted);
			color: var(--font-color);
			border: none;
			border-radius: 5px;
			padding: 0.5rem;

			&::placeholder {
				text-align: center;
			}
		}

		.spacer {
			flex-grow: 1;
		}
	}

	h1 {
		text-align: center;
	}
</style>
