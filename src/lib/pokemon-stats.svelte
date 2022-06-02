<script lang="ts">
	import type { Stats } from 'src/routes/index.json';

	export let stats: Stats;
	export let abilities: string[];

	const FULLEST_BAR_VALUE = 255;
	const RED_COLOR = [191, 97, 106] // "#bf616a"
	const GREEN_COLOR = [163, 190, 140] // "#a3be8c"
	const BLUE_COLOR = [136, 192, 208] // "#88c0d0"
	const THRESHOLDS = [0, 50, 100];

	function getBarStyles(stat: number): string {
		const percentage = calculatePadding(stat);
		return `right: ${percentage}%;
				background-color: ${calculateColor(percentage)};
				`	
	}

	function calculatePadding(stat: number): number{
		return 100 - (stat / FULLEST_BAR_VALUE) * 100};
	}
	
	function calculateColor(percentage: number): string {
		const red = 
	}
</script>

<div class="details">
	{#each Object.entries(stats) as stat}
		<div class="stat-text">
			<div class="stat-bar" style={calculatePadding(stat[1])} />
			<div class="stat-label">{stat[0]}</div>
			<div class="stat-number">{stat[1]}</div>
		</div>
	{/each}
</div>

<style lang="scss">
	.stat-text {
		position: relative;
		display: flex;
		justify-content: space-between;
		margin: 0.2rem 0;
		padding: 0 0.2rem;

		> div {
			z-index: 2;
			font-size: smaller;
		}
	}
	.stat-bar {
		position: absolute;
		border-radius: 5px;
		background-color: red;
		left: 0;
		top: 0.1rem;
		bottom: 0.1rem;
	}
</style>
