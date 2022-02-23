<script lang="ts" context="module">
	import type { Tier } from './index.json';

	export enum Language {
		DE = 'DE',
		EN = 'EN'
	}
</script>

<script lang="ts">
	import PokemonType from '$lib/pokemon-type.svelte';

	export let tierlist: Tier[];

	let language = Language.DE;

	$: sortedList = tierlist.map((it) => ({
		...it,
		pokemon: it.pokemon.sort((a, b) =>
			(a.name[language.toLowerCase()] as string).localeCompare(b.name[language.toLowerCase()])
		) // I know, it's pretty hideous
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
				<a href={pokemon.pokemonDbUrl} target="_blank">
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
				</a>
			{/each}
		</div>
	</div>
{/each}

<style lang="scss">
	a {
		color: inherit;
		text-decoration: none;
		display: block;

		&:hover {
			background-color: #eee;
		}
	}
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
	.tier {
		div {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
			gap: 0.5rem;
		}
		h2 {
			text-align: center;
			font-size: 3rem;
		}
	}
	.pokemon {
		display: inline-block;

		img {
			justify-self: center;
		}

		text-align: center;
		font-size: large;

		padding: 1rem;

		box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
</style>
