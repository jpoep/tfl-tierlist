<script lang="ts">
	import DarkModeButton from '$lib/dark-mode-button.svelte';
	import { language, toggleLanguage } from '$lib/stores/store';
	import TierComponent from '$lib/tier.svelte';
	import type { Tier } from './index.json';

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
	<button on:click={toggleLanguage}>{$language.toUpperCase()}</button>
</div>

<h1>Tierlist für TFL Season 3</h1>
{#each sortedList as tier}
	<TierComponent {tier} />
{/each}

<style lang="scss">
	button {
		text-align: center;
		font-size: 2rem;
	}
	.top-bar {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		height: 5rem;

		> * {
			margin: 0 1rem;
		}
	}

	h1 {
		text-align: center;
	}
</style>
