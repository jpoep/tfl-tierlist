<script lang="ts">
	import type { InflatedTeam } from '$lib/types/pokemon.js';
	import TeamComponent from '$lib/components/team.svelte';

	export let team: InflatedTeam;
</script>

<div class="wrapper">
	<div>
		<TeamComponent {team} />
	</div>
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		height: 100%;
		width: 100%;
		align-items: center;
		height: calc(100vh - var(--navbar-height) - 1rem); // ye it's hacky but w/e. I can't figure out how to do this properly right now.

		& > div {
			width: 100%;
		}
	}
</style>
