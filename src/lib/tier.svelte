<script lang="ts">
	import type { Tier } from 'src/routes/index.json';
	import { onMount } from 'svelte';
	import PokemonCard from './pokemon-card.svelte';
	import { flip } from 'svelte/animate';

	interface TierWithState extends Tier {
		activeSubtitle: number;
	}

	export let tier: Tier;

	$: _tier = tier as TierWithState;
	const subtitle = (tier: TierWithState) => tier.subtitles[tier.activeSubtitle] || '';

	onMount(() => {
		_tier = {
			..._tier,
			activeSubtitle: Math.floor(Math.random() * _tier.subtitles.length)
		};
	});
</script>

<div class="tier">
	<h2 id={tier.name}>{tier.name}</h2>
	<p class="tier-subtitle secondary">{subtitle(_tier)}</p>
	<div>
		<!-- Only animate the first tier for performance reasons -->
		<!-- It's not really pretty to define the each block twice but has to be done due to restrictions from Svelte's animate-->
		<!-- See https://github.com/sveltejs/svelte/issues/7209 -->
		{#if tier.rank === 1}
			{#each tier.pokemon as pokemon (pokemon.id)}
				<div class="pokemon-animation-wrapper" animate:flip={{ duration: 1000 }}>
					<PokemonCard {pokemon} />
				</div>
			{/each}
		{:else}
			<!-- wrapper needed here too because I suck at CSS -->
			{#each tier.pokemon as pokemon (pokemon.id)}
				<div class="pokemon-animation-wrapper">
					<PokemonCard {pokemon} />
				</div>
			{/each}
		{/if}
	</div>
</div>

<style lang="scss">
	.tier {
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
