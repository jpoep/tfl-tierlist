<script lang="ts">
	import TierComponent from '$lib/tier.svelte';
	import { language } from '$lib/stores/store';
	import type { PokemonType, Team, Tier } from './index.json';
	import { types } from '$lib/pokemon-type.svelte';
	import { filter } from '$lib/stores/store';
	import { onMount } from 'svelte';
	import ScrollTopButton from '$lib/scroll-top-button.svelte';

	export let tierlist: Tier[];
	export let initialFilter: string | undefined;

	$filter = initialFilter || '';

	onMount(() => {
		window.addEventListener('popstate', () => {
			$filter = initialFilter || '';
		});
	});

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


	<h1>Tierlist für TFL Season 3</h1>
	{#each filteredList as tier}
		<TierComponent {tier} />
	{/each}

<ScrollTopButton />

<style lang="scss">

	h1 {
		text-align: center;
	}
</style>
