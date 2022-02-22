<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import type { Tier } from './tierlist.json';

	export const load: Load = async ({ fetch }) => {
		return {
			props: {
				tierlist: await (await fetch(`/tierlist.json`)).json()
			}
		};
	};
</script>

<script lang="ts">
	export let tierlist: Tier[];
</script>

<h1>Pokemon-Tierlist für TFL Season 3</h1>

{#each tierlist as tier}
	<h2>{tier.name}</h2>
	{#each tier.pokemon as pokemon}
		<img src={pokemon.imageUrl} alt="pokemon.name.en">
		<p>
			{pokemon.name.en}
		</p>
	{/each}
{/each}
