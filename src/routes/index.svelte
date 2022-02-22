<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import type { Tier } from './tierlist.json';

	export enum Language {
		DE = 'DE',
		EN = 'EN'
	}

	export const load: Load = async ({ fetch }) => {
		return {
			props: {
				tierlist: await (await fetch(`/tierlist.json`)).json()
			}
		};
	};
	
	
</script>

<script lang="ts">
	import PokemonType from '$lib/pokemon-type.svelte';

	export let tierlist: Tier[];
	
	let language = Language.DE;

	$: sortedList = tierlist.map(it => ({
		...it,
		pokemon: it.pokemon.sort((a, b) => (a.name[language.toLowerCase()] as string).localeCompare(b.name[language.toLowerCase()]) ) // I know, it's pretty hideous
	}));


	const toggleLanguage = () => {
		language = language == Language.DE ? Language.EN : Language.DE;
	};
</script>

<div class="top-bar">
	<button on:click={toggleLanguage}>{language}</button>
</div>

<h1>Tierlist für TFL Season 3</h1>
{#each sortedList as tier}
	<div class="tier">
		<h2 id={tier.name}>{tier.name}</h2>
		<div>
			{#each tier.pokemon as pokemon}
				<div class="pokemon">
					<img src={pokemon.imageUrl} alt="pokemon.name.en" />
					<div class="pokemon-info">
						{#if language == Language.DE}
							<p>
								{pokemon.name.de}
							</p>
						{:else}
							<p>
								{pokemon.name.en}
							</p>
						{/if}
					</div>
					<PokemonType type1={pokemon.typing[0]} type2={pokemon.typing[1]} {language} />
				</div>
			{/each}
		</div>
	</div>
{/each}

<style lang="scss">
	button {
		border: none;
		display: inline-block;
		text-align: center;
		padding: 15px 32px;
		font-size: 2rem;
		background-color: white;
		color: #444;
		// box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
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
	.tier {
		div {
			display: flex;
			flex: 1 1 0px;
			align-items: center;
			flex-wrap: wrap;
			// flex-grow: 1;
			margin: 0.2rem;
		}
		h2 {
			text-align: center;
			font-size: 3rem;
		}
	}
	.pokemon {
		img {
			align-self: center;
		}

		padding: 1rem;

		box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
		display: flex;
		flex-direction: column;
		max-width: 10rem;
	}
</style>
