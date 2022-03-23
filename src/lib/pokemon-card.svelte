<script lang="ts">
	import { fly } from 'svelte/transition';
	import { Pokemon } from './classes/Pokemon';
	import PokemonTypeComponent from '$lib/pokemon-type.svelte';
	import type { PokemonType, Team } from 'src/routes/index.json';
	import { filter } from '$lib/stores/store';
	import { base } from '$app/paths';

	export let pokemon: PokemonType;

	let noteActive: boolean = false;
	let tooltipActive: boolean = false;

	$: _pokemon = new Pokemon(pokemon);

	const toggleNote = () => {
		noteActive = !noteActive;
	};

	const enableTooltip = () => {
		tooltipActive = true;
	};

	const disableTooltip = () => {
		tooltipActive = false;
	};

	const setFilterToTeam = () => {
		// Having the option of using the browser's back button is a lot nicer
		window.history.pushState(null, '', new URL(window.location.href));
		$filter = _pokemon.team.name;
	};

	const getImageUrl = (path: string) => {
		// return new URL(`./assets/logos/${path}/`, import.meta.url).href;
		return base + '/logos/' + path;
	};
</script>

<a class="pokemon" href={pokemon.pokemonDbUrl} target="_blank">
	<img src={pokemon.imageUrl} alt={_pokemon.localName} crossorigin="anonymous" loading="lazy" />
	<div class="notes-container">
		{#if pokemon.team}
			<div
				class="pokemon-team"
				on:mouseover={enableTooltip}
				on:focus={enableTooltip}
				on:mouseout={disableTooltip}
				on:blur={disableTooltip}
				on:click|preventDefault={setFilterToTeam}
			>
				<img src={getImageUrl(pokemon.team.logo)} alt={'Logo von ' + pokemon.team.player} />
				{#if tooltipActive}
					<span class="tooltip" transition:fly={{ y: 15, duration: 100 }}>
						{pokemon.team.name}
						<span class="player">
							{pokemon.team.player}
						</span>
					</span>
				{/if}
			</div>
		{/if}
		{#if pokemon.notes && !noteActive}
			<div
				class="pokemon-note"
				transition:fly={{ y: -10, duration: 300 }}
				on:click|preventDefault={toggleNote}
			/>
		{/if}
	</div>
	{#if noteActive}
		<div
			class="modal"
			on:click|preventDefault={toggleNote}
			transition:fly={{ y: 50, duration: 300 }}
		>
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
	}

	.pokemon {
		position: relative;
		height: 100%;
		background-color: var(--bg-color-raised);
		text-align: center;
		font-size: large;
		padding: 1rem;
		border-radius: 2px;

		display: flex;
		flex-direction: column;
		justify-content: space-around;

		.notes-container {
			position: absolute;
			right: 1rem;
			top: 1rem;
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		.pokemon-team {
			.tooltip {
				width: 8rem;
				background-color: var(--bg-color-highlighted);
				color: var(--font-color);
				text-align: center;
				padding: 0.5rem;
				border-radius: 6px;

				// positioning for it to appear at the top
				bottom: 120%;
				left: 50%;
				margin-left: -4rem;

				/* Position the tooltip text - see examples below! */
				position: absolute;
				z-index: 1;
				display: block;
				font-weight: bold;

				// arrow
				&::after {
					content: ' ';
					position: absolute;
					top: 100%; /* At the bottom of the tooltip */
					left: 50%;
					margin-left: -5px;
					border-width: 5px;
					border-style: solid;
					border-color: var(--bg-color-highlighted) transparent transparent transparent;
				}

				.player {
					font-size: smaller;
					color: var(--font-color-lightened);
					font-weight: normal;
					display: block;
				}
			}
			img {
				max-height: 3rem;
				max-width: 3rem;
				border-radius: 50%;
				background: var(--bg-color-highlighted);
				padding: 0.3rem;
			}
		}

		.pokemon-note {
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
			left: 0.5rem;
			right: 0.5rem;
			top: 0.5rem;
			background: var(--warning);
			border: 1px solid var(--dark-fg);
			color: var(--dark-fg);
			padding: 2rem;
			border-radius: 2px;
			text-align: center;
			display: flex;
			justify-content: center;
			align-items: center;
			line-height: 1.4rem;
		}

		.pokemon-form {
			font-size: smaller;
			margin-bottom: 0.5rem;
		}
		.pokemon-typing {
			margin-top: auto;
			justify-self: flex-end;
		}

		> img {
			justify-self: center;
			image-rendering: pixelated;
			min-height: 120px;
		}
	}
</style>
