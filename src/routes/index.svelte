<script lang="ts" context="module">
	import type { Pokemon, Tier } from './index.json';

	export enum Language {
		DE = 'de',
		EN = 'en'
	}

	interface PokemonWithState extends Pokemon {
		noteActive: boolean;
	}

	interface TierWithState extends Tier {
		pokemon: PokemonWithState[];
		activeSubtitle: number;
	}
</script>

<script lang="ts">
	import PokemonType from '$lib/pokemon-type.svelte';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	export let tierlist: TierWithState[];

	let language = Language.EN;

	onMount(() => {
		tierlist = tierlist.map((it) => ({
			...it,
			activeSubtitle: Math.floor(Math.random() * it.subtitles.length)
		}));
	});

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
	const note = (pokemon: Pokemon) => pokemon.notes?.[language] || '';

	const subtitle = (tier: TierWithState) => tier.subtitles[tier.activeSubtitle] || '';
</script>

<div class="top-bar">
	<button on:click={toggleLanguage}>{language.toUpperCase()}</button>
</div>

<h1>Tierlist für TFL Season 3</h1>
{#each sortedList as tier}
	<div class="tier">
		<h2 id={tier.name}>{tier.name}</h2>
		<p class="tier-subtitle">{subtitle(tier)}</p>
		<div>
			{#each tier.pokemon as pokemon}
				<a class="pokemon" href={pokemon.pokemonDbUrl} target="_blank">
					<img src={pokemon.imageUrl} alt={name(pokemon)} />
					{#if pokemon.notes && !pokemon.noteActive}
						<div
							class="pokemon-note"
							transition:fly={{ y: -10, duration: 300 }}
							on:click={(event) => {
								pokemon.noteActive = !pokemon.noteActive;
								event.preventDefault();
							}}
						/>
					{/if}
					{#if pokemon.noteActive}
						<div
							class="modal"
							on:click={(event) => {
								pokemon.noteActive = !pokemon.noteActive;
								event.preventDefault();
							}}
							transition:fly={{ y: 50, duration: 300 }}
						>
							{note(pokemon)}
						</div>
					{/if}
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
			color: #555;
			overflow: hidden;
		}
	}
	.pokemon {
		position: relative;

		img {
			justify-self: center;
			image-rendering: pixelated;
		}

		text-align: center;
		font-size: large;
		padding: 1rem;
		box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

		display: flex;
		flex-direction: column;

		.pokemon-note {
			position: absolute;
			right: 1rem;
			top: 1rem;
			font-size: x-large;
			font-weight: 700;
			background-color: #bf616a;
			border: 1px solid white;
			border-radius: 50%;
			color: white;
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

			&:hover {
				background-color: rgb(212, 106, 116);
			}
		}

		.modal {
			position: absolute;
			left: 1rem;
			right: 1rem;
			top: 5rem;
			background: #bf616a;
			border: 1px solid white;
			color: white;
			padding: 2rem;
			border-radius: 5px;
			text-align: center;
			display: flex;
			justify-content: center;
			align-items: center;
		}

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
