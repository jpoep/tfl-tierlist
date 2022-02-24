<script lang="ts">
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
	<button on:click={toggleLanguage}>{$language.toUpperCase()}</button>
</div>

<h1>Tierlist für TFL Season 3</h1>
{#each sortedList as tier}
	<TierComponent {tier} />
{/each}

<style lang="scss">
	button {
		border: none;
		text-align: center;
		padding: 15px 32px;
		font-size: 2rem;
		background-color: white;
		color: #444;
		cursor: pointer;
	}
	.top-bar {
		width: 100%;
		display: flex;
		justify-content: flex-end;
	}

	h1 {
		text-align: center;
	}
</style>
