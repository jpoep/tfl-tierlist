<script lang="ts">
	import { Pokemon } from './classes/Pokemon';
	import PokemonTypeComponent from '$lib/pokemon-type.svelte';
	import { allStatsToggled, filter, officialArtworkEnabled } from '$lib/stores/store';
	import { base } from '$app/paths';
	import PokemonStats from './pokemon-stats.svelte';
	import { tooltip } from '$lib/actions/tooltip';
	import type { PokemonType } from './types/pokemon';
	import { changedPokemon } from './stores/teams.js';
	import { tick } from 'svelte';

	export let pokemon: PokemonType;
	let _pokemon: Pokemon;

	let detailsActive = false;

	let self: HTMLElement;
	let animateTeam = false;

	$: detailsActive = $allStatsToggled;
	$: imageSource = detailsActive
		? pokemon.miniSpriteUrl
		: $officialArtworkEnabled
		? pokemon.officialArtworkUrl
		: pokemon.imageUrl;
	$: _pokemon = new Pokemon(pokemon);

	const toggleDetails = () => (detailsActive = !detailsActive);

	const setFilterToTeam = () => {
		// Having the option of using the browser's back button is a lot nicer
		window.history.pushState(null, '', new URL(window.location.href));
		$filter = _pokemon?.team?.name || '';
	};

	const getImageUrl = (path: string) => {
		return base + '/logos/' + path;
	};

	changedPokemon.subscribe(async (pokemon) => {
		if (pokemon && pokemon === _pokemon?.id) {
			$filter = '';
			await tick();
			animateTeam = true;
			scrollIntoView(self);
			const specialSounds: { [key: string]: string } = {
				Alex: 'pokescout',
				Nils: 'ppv',
				Danny: 'dannex',
				Oli: 'oli',
				Till: 'till'
			};
			const player = _pokemon.team?.player;
			if (player) {
				const specialSound = specialSounds[player];
				if (specialSound) {
					new Audio(`/sounds/${specialSound}.mp3`).play();
				}
			}
			new Audio('/sounds/sword-thud.mp3').play();
		}
	});

	function scrollIntoView(el: HTMLElement | undefined) {
		el?.scrollIntoView({
			behavior: 'smooth',
			block: 'center',
			inline: 'center'
		});
	}
</script>

<div class="pokemon" on:click={toggleDetails} bind:this={self}>
	{#if !detailsActive}
		{#if pokemon.team}
			<div class="team-wrapper">
				<div
					class="team"
					use:tooltip={{ title: pokemon.team.name, subTitle: pokemon.team.player }}
					on:click|stopPropagation={setFilterToTeam}
				>
					<picture class:animateTeam>
						<source srcSet={getImageUrl(pokemon.team.logo.avif)} type="image/avif" />
						<source srcSet={getImageUrl(pokemon.team.logo.webp)} type="image/webp" />
						<img src={getImageUrl(pokemon.team.logo.png)} alt={'Logo von ' + pokemon.team.player} />
					</picture>
				</div>
			</div>
		{/if}
		{#if pokemon.notes}
			<div
				class="note"
				use:tooltip={{
					backgroundColor: 'var(--warning)',
					smallFontColor: 'var(--dark-fg)',
					subTitle: _pokemon.localNotes
				}}
				on:click|stopPropagation
			/>
		{/if}
	{/if}

	<div class="card-content" class:details-layout={detailsActive}>
		<img
			src={imageSource}
			alt={_pokemon.localName}
			crossorigin="anonymous"
			loading="lazy"
			class:details-layout={detailsActive}
			class:pixelated={detailsActive || !$officialArtworkEnabled}
		/>
		<div class="pokemon-name" class:details-layout={detailsActive}>
			<div class="name">
				{_pokemon.localName}
			</div>
			<div class="form secondary">
				{_pokemon.localForm || ''}
			</div>
		</div>
	</div>
	{#if !detailsActive}
		<div class="pokemon-typing" class:details-layout={detailsActive}>
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

		@keyframes new-pick {
			0% {
				filter: opacity(0);
			}

			25% {
				filter: opacity(1) grayscale(0) brightness(10) saturate(0);
			}

			100% {
				filter: opacity(0.5) grayscale(0.7);
			}
		}

		.animateTeam {
			animation-name: new-pick;
			animation-duration: 5s;
		}

		.team-wrapper {
			position: absolute;
			top: 0;
			right: 0;
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			overflow: hidden;

			.team {
				position: absolute;
				right: -3.2rem;
				top: -3.2rem;
				display: flex;
				align-items: center;
				justify-content: center;
				picture {
					border-radius: 50%;
					filter: opacity(0.5) grayscale(0.7);
					background: var(--bg-color-highlighted);
					padding: 0.1rem;
					max-width: 12rem;
					max-height: 12rem;
				}
				img {
					max-width: 100%;
					border-radius: 50%;
				}
			}
		}
		.card-content {
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			margin-bottom: 0.5rem;
			overflow: hidden;

			.pokemon-name {
				display: flex;
				flex-direction: column;

				.form {
					font-size: smaller;
					min-height: 1rem;
					line-height: 0.9rem;
				}
				&.details-layout {
					flex-direction: column;
					justify-content: center;
					align-items: flex-start;
					font-weight: bold;

					.form {
						min-height: 0;
						font-weight: normal;
						font-size: 0.7rem;
					}
				}
			}

			> img {
				z-index: 0;
				pointer-events: none;
				width: 100%;
				height: fit-content;
				aspect-ratio: 1/1;

				&.pixelated {
					image-rendering: pixelated;
				}
			}

			&.details-layout {
				flex-direction: row-reverse;
				justify-content: space-between;

				> img {
					height: 2.5rem;
					width: auto;
				}
			}
		}
		.note {
			position: absolute;
			left: 0.75rem;
			top: 0.75rem;
			font-size: x-large;
			font-weight: 700;
			background-color: var(--warning);
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
	}
</style>
