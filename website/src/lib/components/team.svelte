<script lang="ts">
	import { base } from '$app/paths';
	import filterIcon from '@iconify-icons/mdi/filter.js';
	import Icon from '@iconify/svelte';
	import { officialArtworkEnabled } from '../stores/sprites.js';

	import type { InflatedTeam, PokemonType } from '../types/pokemon.js';

	export let team: InflatedTeam;
	export let reverseLogoPosition = false;
	export let filterButtonEnabled = false;

	const getImageUrl = (path: string) => {
		return base + '/logos/' + path;
	};

	$: imageSrc = (pokemon: PokemonType) =>
		$officialArtworkEnabled ? pokemon.officialArtworkUrl : pokemon.imageUrl;
</script>

<h2>
	<a href={'/teams/' + team?.player.toLocaleLowerCase()} sveltekit:prefetch>{team?.name}</a>
	{#if filterButtonEnabled}
		<a href={`/?q=${encodeURIComponent(team.name)}`}><Icon inline icon={filterIcon} /></a>
	{/if}
</h2>
<h3><a href={'/teams/' + team?.player.toLocaleLowerCase()}>{team?.player}</a></h3>
<div class="container" class:reversed={reverseLogoPosition}>
	<div class="mons">
		{#each Object.keys(team.pokemon) as tier}
			{#each team.pokemon[tier] as mon, index}
				<div class={tier.toLowerCase() + (index + 1)}>
					<div class="circle">
						<img
							src={imageSrc(mon)}
							alt={mon.name?.en}
							class:pixelated={!$officialArtworkEnabled}
						/>
					</div>
					<!-- <PokemonTypeComponent type1={mon.typing[0]} type2={mon.typing[1]} /> -->
				</div>
			{/each}
		{/each}
	</div>
	<div class="logo">
		<picture>
			<source srcSet={getImageUrl(team.logo.avif)} type="image/avif" />
			<source srcSet={getImageUrl(team.logo.webp)} type="image/webp" />
			<img src={getImageUrl(team.logo.webp)} alt={'Logo von ' + team.player} />
		</picture>
	</div>
</div>

<style lang="scss">
	@use '../../../src/media';
	.circle {
		overflow: hidden;
		border-radius: 50%;
	}
	.pixelated {
		image-rendering: pixelated;
	}
	h2 {
		text-align: center;
		font-size: 2rem;
		line-height: 1.5rem;
	}
	h3 {
		text-align: center;
		line-height: 1.5rem;
		a {
			color: var(--font-color-lightened);
		}
	}
	img {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}
	.container {
		margin: 0 2rem;
		--logo-space: 0.5fr;
		--team-space: 1.5fr;
		display: grid;
		grid-template-columns: var(--team-space) var(--logo-space);
		gap: 2rem;
		grid-auto-flow: row;
		grid-template-areas: '. logo';

		.logo {
			justify-self: stretch;
			> picture {
				object-fit: cover;
			}
			@include media.mobile {
				display: none;
			}
		}

		&.reversed {
			@include media.not-mobile {
				grid-template-areas: 'logo .';
				grid-template-columns: var(--logo-space) var(--team-space);
			}
		}

		@include media.mobile {
			grid-template-columns: 1fr;
			grid-template-rows: 1fr;
			grid-template-areas:
				'logo'
				'.';
		}
	}

	.mons {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: repeat(6, 1fr);
		gap: 0.5rem;
		grid-auto-flow: row;
		align-items: center;
		grid-template-areas:
			'. . b1 . .'
			's1 a1 b1 c1 d1'
			's1 a1 b2 c1 d1'
			's2 a2 b2 c2 d2'
			's2 a2 b3 c2 d2'
			'. . b3 . .';

		& > div {
			text-align: center;
			img {
				object-fit: fill;
				width: 100%;
				height: 100%;
				border-radius: 50%;
				background-color: var(--bg-color-highlighted);
				border: 3px solid var(--bg-color-raised);
				vertical-align: middle;
				transform: scale(1.3);
			}
		}
	}

	.s1 {
		grid-area: s1;
	}

	.s2 {
		grid-area: s2;
	}

	.a1 {
		grid-area: a1;
	}

	.a2 {
		grid-area: a2;
	}

	.b1 {
		grid-area: b1;
	}

	.b2 {
		grid-area: b2;
	}

	.b3 {
		grid-area: b3;
	}

	.c1 {
		grid-area: c1;
	}

	.c2 {
		grid-area: c2;
	}

	.d1 {
		grid-area: d1;
	}

	.d2 {
		grid-area: d2;
	}

	.logo {
		grid-area: logo;
		align-self: center;
		justify-self: center;
	}
</style>
