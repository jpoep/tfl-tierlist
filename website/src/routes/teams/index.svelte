<script lang="ts">
	import type { InflatedTeam } from '$lib/types/pokemon';
	import TeamComponent from '$lib/components/team.svelte';

	export let teams: InflatedTeam[];

	$: teams = teams.sort((a, b) => a.name.localeCompare(b.name));
</script>

<h1>Teams</h1>
<div class="container">
	{#each teams as team, index}
		<div class="team">
			<TeamComponent {team} reverseLogoPosition={index % 2 === 1} />
		</div>
	{/each}
</div>

<style lang="scss">
	@use '../../media';
	h1 {
		text-align: center;
		font-size: 3rem;
	}
	.container {
		display: grid;
		grid-template-columns: repeat(2, 1fr);

		@include media.mobile {
			grid-template-columns: 1fr;
		}
	}
</style>
