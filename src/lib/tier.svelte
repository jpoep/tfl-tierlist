<script lang="ts">
	import type { Tier } from 'src/routes/index.json';
	import { onMount } from 'svelte';
	import PokemonCard from './pokemon-card.svelte';
	import { flip } from 'svelte/animate';
	import { expoOut } from 'svelte/easing';
	import { Pokemon } from './classes/Pokemon';

	export let tier: Tier;

	const activeSubtitle: number = Math.floor(Math.random() * tier.subtitles.length);

	const subtitle = (tier: Tier) => tier.subtitles[activeSubtitle] || '';
	
	$: tierEmpty = tier.pokemon.length === 0;
	$: tierEmptyText = !tierEmpty ? '' : tier.emptyText;

	// Hack to get a filtered list displayed correctly

	let viewportWidth: number;
	const minCardSize = 150; // Careful, it needs to be synced with "grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));" (the 150px). Too lazy to properly variable-ize it right now.

	onMount(() => {
		viewportWidth = window.innerWidth;
		window.addEventListener('resize', () => {
			viewportWidth = window.innerWidth;
		});
	});

	$: maxElementsToFit = Math.floor(viewportWidth / minCardSize);
	$: numberOfFakeDivs = Math.max(maxElementsToFit - tier.pokemon.length, 0);
</script>

<div class="tier">
	<h2 class:empty={tierEmpty} id={tier.name}>{tier.name} <span class="emptyText">{tierEmptyText}</span></h2>
	{#if tier.pokemon.length > 0}
		<p class="tier-subtitle secondary">{subtitle(tier)}</p>
		<div>
			<!-- Only animate the first tier for performance reasons -->
			<!-- It's not really pretty to define the each block twice but has to be done due to restrictions from Svelte's animate-->
			<!-- See https://github.com/sveltejs/svelte/issues/7209 -->
			{#if tier.rank === 1}
				{#each tier.pokemon as pokemon (pokemon.id)}
					<div class="pokemon-animation-wrapper" animate:flip={{ duration: 1000, easing: expoOut }}>
						<PokemonCard {pokemon} />
					</div>
				{/each}
				{#if numberOfFakeDivs > 0}
					{#each Array(numberOfFakeDivs) as _}
						<div class="pokemon-animation-wrapper" />
					{/each}
				{/if}
			{:else}
				<!-- Wrapper needed here too because I suck at CSS -->
				{#each tier.pokemon as pokemon (pokemon.id)}
					<div class="pokemon-animation-wrapper">
						<PokemonCard {pokemon} />
					</div>
				{/each}
				{#if numberOfFakeDivs > 0}
					{#each Array(numberOfFakeDivs) as _}
						<div class="pokemon-animation-wrapper" />
					{/each}
				{/if}
			{/if}
		</div>
	{/if}
</div>

<style lang="scss">
	.tier {
		.empty {
			line-height: 1.5rem;
		}
		.emptyText {
			font-weight: 400;
			font-size: 1.5rem;
			color: var(--font-color-lightened);
		}
		& > div {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
			gap: 0.5rem;
		}
		h2 {
			text-align: center;
			font-size: 3rem;
			margin-bottom: 0;
		}
		.tier-subtitle {
			margin-top: 0;
			max-width: 70rem;
			margin-left: auto;
			margin-right: auto;
			text-align: center;
			font-size: 1.7rem;
			overflow: hidden;
		}

		.pokemon-animation-wrapper {
			display: flex;
			flex-direction: column;
		}
	}
</style>
