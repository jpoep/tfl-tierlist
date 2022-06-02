<script lang="ts">
	import type { Stats } from 'src/routes/index.json';
	import { darkMode, theme } from './stores/store';

	export let stats: Stats;
	export let abilities: string[];

	const STAT_NAMES = {
		hp: 'HP',
		atk: 'Atk',
		def: 'Def',
		spatk: 'SpA',
		spdef: 'SpD',
		spd: 'Spe'
	};

	const FULLEST_BAR_VALUE = 200;
	const RED_COLOR = [245, 83, 83]; // "#bf616a"
	const GREEN_COLOR = [20, 195, 142]; // "#a3be8c"
	const YELLOW_COLOR = [254, 177, 57];
	const BLUE_COLOR = [48, 170, 221]; // "#88c0d0"

	$: THRESHOLDS = { 0: RED_COLOR, 20: RED_COLOR, 30: YELLOW_COLOR, 60: GREEN_COLOR, 100: BLUE_COLOR };

	function getBarStyles(stat: number): string {
		const percentage = getBarPercentage(stat);
		const padding = calculatePadding(stat);
		return `right: ${padding}%;
				background-color: ${calculateColor(percentage)};
				`;
	}

	function getBarPercentage(stat: number): number {
		return (stat / FULLEST_BAR_VALUE) * 100;
	}

	function calculatePadding(stat: number): number {
		return Math.max(0, 100 - getBarPercentage(stat));
	}

	function calculateColor(percentage: number): string {
		const thresholdKeys = Object.keys(THRESHOLDS);
		const thresholdIndex = Math.min(
			thresholdKeys.length - 2,
			thresholdKeys.reduce((prev, currKey) => prev + (percentage >= parseInt(currKey) ? 1 : 0), -1)
		);
		const thresholdMin = parseInt(thresholdKeys[thresholdIndex]);
		const thresholdMax = parseInt(thresholdKeys[thresholdIndex + 1]);
		const thresholdRange = thresholdMax - thresholdMin;
		const thresholdFactor = 100 / thresholdRange;
		const adjustedFactor = ((percentage - thresholdMin) * thresholdFactor) / 100;
		const minColor = Object.values(THRESHOLDS)[thresholdIndex];
		const maxColor = Object.values(THRESHOLDS)[thresholdIndex + 1];

		const red = minColor[0] * (1 - adjustedFactor) + maxColor[0] * adjustedFactor;
		const green = minColor[1] * (1 - adjustedFactor) + maxColor[1] * adjustedFactor;
		const blue = minColor[2] * (1 - adjustedFactor) + maxColor[2] * adjustedFactor;

		return `rgb(${red}, ${green}, ${blue})`;
	}
</script>

<div class="details">
	{#each Object.entries(stats) as stat}
		<div class="stat">
			<div class="stat-bar" style={getBarStyles(stat[1])} />
			<div class="stat-label">{STAT_NAMES[stat[0]]}</div>
			<div class="stat-number">{stat[1]}</div>
		</div>
	{/each}
</div>

<style lang="scss">
	.stat {
		position: relative;
		display: flex;
		justify-content: space-between;
		font-weight: bold;

		> div {
			z-index: 1;
			font-size: smaller;
		}
	}
	.stat-bar {
		position: absolute;
		border-radius: 5px;
		height: 3px;
		left: 0;
		bottom: 0;
	}

	.stat-label,
	.stat-number {
		color: var(--fg-color-highlighted);
	}

</style>
