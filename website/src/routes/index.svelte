<script lang="ts">
	import TierComponent from '$lib/tier.svelte';
	import { language } from '$lib/stores/language';
	import { types } from '$lib/pokemon-type.svelte';
	import { filter } from '$lib/stores/filter';
	import { onMount } from 'svelte';
	import ScrollTopButton from '$lib/components/buttons/scroll-top-button.svelte';
	import type { PokemonType, Team, Tier } from '$lib/types/pokemon';
	import { liveTeams } from '$lib/stores/teams';

	export let tierlist: Tier[];
	export let teams: Team[];
	export let initialFilter: string | undefined;

	let currentTeam: Team | undefined;

	$filter = initialFilter || '';
	$: currentTeam = mergedTeams?.map((team) => team.name).includes($filter)
		? mergedTeams.find((it) => it.name === $filter)
		: undefined;

	onMount(() => {
		window.addEventListener('popstate', () => {
			$filter = initialFilter || '';
		});
	});

	// TODO: the passed static teams is completely ignored. Find a way to combine them.
	$: mergedTeams = $liveTeams.length > 0 ? $liveTeams : teams;
	
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
		].some((it: string | undefined) => it?.toLowerCase().includes(term.toLowerCase()));

	// It's just a quick hack to get it ready for the draft in time. Refactoring needed.
	$: updatedTeamsList = tierlist?.map((it) => ({
		...it,
		pokemon: it.pokemon.map((pokemon) => ({
			...pokemon,
			team: mergedTeams.find((team) => team.pokemon.includes(pokemon.id))
		}))
	}));

	$: sortedList = updatedTeamsList?.map((it) => ({
		...it,
		pokemon: it.pokemon.sort((a, b) =>
			(a.name[$language] as string).localeCompare(b.name[$language])
		)
	}));

	$: filteredList = sortedList?.map((it) => ({
		...it,
		pokemon: it.pokemon.filter((pokemon) => contains(pokemon, $filter))
	}));

</script>

<h1>Tierlist für Season 4 der TFL</h1>
{#if currentTeam}
	<TierComponent
		tier={{
			name: currentTeam.name,
			emptyText: '',
			rank: 1,
			subtitles: [currentTeam.player],
			pokemon: updatedTeamsList
				.flatMap((it) => it.pokemon)
				.filter((pokemon) => currentTeam?.pokemon.includes(pokemon.id))
		}}
	/>
{:else}
	{#each filteredList as tier}
		<TierComponent {tier} />
	{/each}
{/if}

<ScrollTopButton />

<style lang="scss">
	h1 {
		text-align: center;
	}
</style>
