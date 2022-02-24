<script lang="ts">
	import { fly } from 'svelte/transition';
	import { Pokemon } from './classes/Pokemon';
	import PokemonTypeComponent from '$lib/pokemon-type.svelte';
	import type { PokemonType } from 'src/routes/index.json';

	interface PokemonWithState extends Pokemon {
		noteActive: boolean;
	}

	export let pokemon: PokemonType;

	$: _pokemon = new Pokemon(pokemon) as PokemonWithState;

	const toggleNote = (event: MouseEvent) => {
		_pokemon.noteActive = !_pokemon.noteActive;
		event.preventDefault();
	};
</script>

<a class="pokemon" href={pokemon.pokemonDbUrl} target="_blank">
	<img src={pokemon.imageUrl} alt={_pokemon.localName} />
	{#if pokemon.notes && !_pokemon.noteActive}
		<div class="pokemon-note" transition:fly={{ y: -10, duration: 300 }} on:click={toggleNote} />
	{/if}
	{#if _pokemon.noteActive}
		<div class="modal" on:click={toggleNote} transition:fly={{ y: 50, duration: 300 }}>
			{_pokemon.localNotes || ''}
		</div>
	{/if}
	<div class="pokemon-name">
		{_pokemon.localName}
	</div>
	<div class="pokemon-form secondary">
		{_pokemon.localForm || ''}
	</div>
	<div class="pokemon-typing">
		<PokemonTypeComponent type1={pokemon.typing[0]} type2={pokemon.typing[1]} />
	</div>
</a>

<style lang="scss">
	a {
		color: inherit;
		text-decoration: none;
		display: block;

		&:hover {
			background-color: var(--bg-color-highlighted);
		}
	}

	.pokemon {
		position: relative;
		height: 100%;

		img {
			justify-self: center;
			image-rendering: pixelated;
		}

		// box-shadow: rgba(99, 99, 99, .3) 0px 2px 8px 0px;
		background-color: var(--bg-color-raised);
		text-align: center;
		font-size: large;
		padding: 1rem;
		border-radius: 2px;

		display: flex;
		flex-direction: column;
		justify-content: space-around;

		.pokemon-note {
			position: absolute;
			right: 1rem;
			top: 1rem;
			font-size: x-large;
			font-weight: 700;
			background-color: var(--warning);
			border: 1px solid var(--dark-fg);
			border-radius: 50%;
			color: var(--dark-fg);
			width: 2.5rem;
			height: 2.5rem;
			text-align: center;
			vertical-align: middle;
			display: flex;
			align-items: center;
			justify-content: center;
			box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px,
				rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px,
				rgba(0, 0, 0, 0.09) 0px -3px 5px;

			&:after {
				content: '!';
			}
		}

		.modal {
			position: absolute;
			left: 1rem;
			right: 1rem;
			top: 5rem;
			background: var(--warning);
			border: 1px solid var(--dark-fg);
			color: var(--dark-fg);
			padding: 2rem;
			border-radius: 5px;
			text-align: center;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.pokemon-form {
			font-size: smaller;
			margin-bottom: 0.5rem;
		}
		.pokemon-typing {
			margin-top: auto;
			justify-self: flex-end;
		}
	}
</style>
