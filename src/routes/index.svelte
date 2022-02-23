<script lang="ts" context="module">
	import type { Pokemon, Tier } from './index.json';

	export enum Language {
		DE = 'de',
		EN = 'en'
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

	const name = (pokemon: Pokemon) => pokemon.name[language];
	const form = (pokemon: Pokemon) => pokemon.form?.[language] || '';
</script>

<div class="top-bar">
	<button on:click={toggleLanguage}>{language.toUpperCase()}</button>
</div>

<h1>Tierlist für TFL Season 3</h1>
{#each sortedList as tier}
	<div class="tier">
		<h2 id={tier.name}>{tier.name}</h2>
		<div>
			{#each tier.pokemon as pokemon}
				<a class="pokemon" href={pokemon.pokemonDbUrl} target="_blank">
					<img src={pokemon.imageUrl} alt="pokemon.name.en" />
					<div class="pokemon-name">
						{name(pokemon)}
					</div>
					<div class="pokemon-form">
						{form(pokemon)}
					</div>
					<div class="pokemon-typing">
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
		& > div {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
			// grid-template-rows: repeat(auto-fit, minmax(0px, 1fr));
			// grid-auto-rows: max-content;
			gap: 0.5rem;
		}
		h2 {
			text-align: center;
			font-size: 3rem;
		}
	}
	.pokemon {
		img {
			justify-self: center;
		}

		text-align: center;
		font-size: large;
		padding: 1rem;
		box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

		display: flex;
		flex-direction: column;
		// justify-content: space-around;

		.pokemon-form {
			font-size: smaller;
			color: #666;
			margin-bottom: 0.5rem;
		}
		.pokemon-typing {
			margin-top: auto;
			justify-self: flex-end;
		}
	}
</style>
