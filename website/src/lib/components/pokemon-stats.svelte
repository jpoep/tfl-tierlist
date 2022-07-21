<script lang="ts">
	import { language } from '../stores/language';
	import { tooltip } from '$lib/actions/tooltip';
	import type { Ability, StatKeys, Stats } from '../types/pokemon';

	type StatNames = {
		[P in StatKeys]: string;
	};

	type Entries<T> = {
		[K in keyof T]: [K, T[K]];
	}[keyof T][];

	type StatEntries = Entries<Stats>;

	export let stats: Stats;
	export let abilities: Ability[];

	$: statEntries = Object.entries(stats) as StatEntries;

	const STAT_NAMES: StatNames = {
		hp: 'HP',
		atk: 'Atk',
		def: 'Def',
		spatk: 'SpA',
		spdef: 'SpD',
		spd: 'Spe'
	};

	const NO_ABILITY_DESCRIPTION = 'PokeAPI gönnt nicht. Beschwert euch bei denen.';

	const FULLEST_BAR_VALUE = 200;
	const RED_COLOR = [245, 83, 83]; // "#bf616a"
	const GREEN_COLOR = [20, 195, 142]; // "#a3be8c"
	const YELLOW_COLOR = [254, 177, 57];
	const BLUE_COLOR = [48, 170, 221]; // "#88c0d0"

	$: THRESHOLDS = {
		0: RED_COLOR,
		20: RED_COLOR,
		30: YELLOW_COLOR,
		60: GREEN_COLOR,
		100: BLUE_COLOR
	};

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
	{#each statEntries as stat}
		<div class="stat">
			<div class="stat-bar" style={getBarStyles(stat[1])} />
			<div class="stat-label">{STAT_NAMES[stat[0]]}</div>
			<div class="stat-number">{stat[1]}</div>
		</div>
	{/each}
	<div class="abilities">
		{#each abilities as ability}
			<div
				class="ability"
				on:click|stopPropagation
				use:tooltip={{
					subTitle: ability[$language].description || NO_ABILITY_DESCRIPTION,
					width: '20rem'
				}}
			>
				{ability[$language].name}
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.abilities {
		min-height: 1.6rem;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-evenly;
		align-items: center;
		column-gap: 0.3rem;

		margin-top: 0.8rem;
		margin-bottom: 0.2rem;

		.ability {
			font-size: 0.8rem;
			color: var(--font-color-lightened);
			position: relative;
		}
	}
	.stat {
		position: relative;
		display: flex;
		justify-content: space-between;

		> div {
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
