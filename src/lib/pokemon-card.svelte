<script lang="ts">
	import { fly } from 'svelte/transition';
	import { Pokemon } from './classes/Pokemon';
	import PokemonTypeComponent from '$lib/pokemon-type.svelte';
	import type { PokemonType, Team } from 'src/routes/index.json';
	import { filter } from '$lib/stores/store';
	import { base } from '$app/paths';
	import PokemonStats from './pokemon-stats.svelte';
	import { flip } from 'svelte/animate';

	export let pokemon: PokemonType;

	let noteActive: boolean = false;
	let tooltipActive: boolean = false;
	let detailsActive: boolean = false;

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

	const toggleDetails = () => (detailsActive = !detailsActive);

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

<div class="pokemon" on:click={toggleDetails}>
	{#if !detailsActive}
		<div class="notes-container">
			{#if pokemon.team}
				<div
					class="pokemon-team"
					on:mouseover={enableTooltip}
					on:focus={enableTooltip}
					on:mouseout={disableTooltip}
					on:blur={disableTooltip}
					on:click|stopPropagation={setFilterToTeam}
				>
					<picture>
						<source srcSet={getImageUrl(pokemon.team.logo.avif)} type="image/avif" />
						<source srcSet={getImageUrl(pokemon.team.logo.webp)} type="image/webp" />
						<img
							src={getImageUrl(pokemon.team.logo.png)}
							alt={'Logo von ' + pokemon.team.player}
							decoding="async"
							loading="lazy"
						/>
					</picture>
					{#if tooltipActive}
						<span class="tooltip" transition:fly|local={{ y: 15, duration: 100 }}>
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
					transition:fly|local={{ y: -10, duration: 300 }}
					on:click|stopPropagation={toggleNote}
				/>
			{/if}
		</div>
	{/if}
	{#if noteActive}
		<div
			class="modal"
			on:click|stopPropagation={toggleNote}
			transition:fly={{ y: 50, duration: 300 }}
		>
			{_pokemon.localNotes || ''}
		</div>
	{/if}

	<div class="pokemon-main" class:tiny={detailsActive}>
		<img
			src={pokemon.imageUrl}
			alt={_pokemon.localName}
			crossorigin="anonymous"
			loading="lazy"
			class:tiny={detailsActive}
		/>
		<div class="pokemon-name" class:tiny={detailsActive}>
			<div class="name">
				{_pokemon.localName}
			</div>
			<div class="form secondary">
				{_pokemon.localForm || ''}
			</div>
		</div>
	</div>
	{#if !detailsActive}
	<div class="pokemon-typing" class:tiny={detailsActive}>
		<PokemonTypeComponent type1={pokemon.typing[0]} type2={pokemon.typing[1]} />
	</div>
	{/if}
	{#if detailsActive}
		<div class="pokemon-stats">
			<PokemonStats stats={_pokemon.baseStats} abilities={_pokemon.abilities} />
		</div>
	{/if}
</div>

<style lang="scss">
	// img.tiny {
	// flex-grow: 0;
	// height: 20px;
	// width: 50px;
	// flex-shrink: 1;
	// }
	.pokemon-main {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin-bottom: 0.5rem;

		&.tiny {
			flex-direction: row;
			justify-content: center;
		}

		> img {
			image-rendering: pixelated;
		}

		> img.tiny {
			height: 2.5rem;
		}
	}
	.pokemon-name {
		display: flex;
		flex-direction: column;

		&.tiny {
			flex-direction: column;
			justify-content: center;
			font-weight: bold;

			.form {
				min-height: 0;
				font-weight: normal;
				font-size: 0.7rem;
			}
		}
		.form {
			font-size: smaller;
			min-height: 1rem;
			line-height: 0.9rem;
		}
	}
	.pokemon {
		position: relative;
		height: 100%;
		min-height: 10rem;
		background-color: var(--bg-color-raised);
		text-align: center;
		font-size: large;
		padding: 0.7rem;
		border-radius: 2px;
		cursor: pointer;

		display: flex;
		flex-direction: column;
		justify-content: center;

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

		.pokemon-stats {
			margin-top: 1rem;
		}
	}
</style>
