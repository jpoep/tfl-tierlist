<script lang="ts">
	import DarkModeButton from '$lib/dark-mode-button.svelte';
	import TierComponent from '$lib/tier.svelte';
	import { language } from '$lib/stores/store';
	import type { Tier } from './index.json';
	import LanguageButton from '$lib/language-button.svelte';

	export let tierlist: Tier[];

	$: sortedList = tierlist.map((it) => ({
		...it,
		pokemon: it.pokemon.sort((a, b) =>
			(a.name[$language] as string).localeCompare(b.name[$language])
		)
	}));
</script>

<div class="top-bar">
	<DarkModeButton />
	<LanguageButton />
</div>

<h1>Tierlist für TFL Season 3</h1>
{#each sortedList as tier}
	<TierComponent {tier} />
{/each}

<style lang="scss">
	:global(.top-bar) {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		height: 5rem;
		padding: 1rem;
		gap: 0.5rem;
	}

	h1 {
		text-align: center;
	}
</style>
