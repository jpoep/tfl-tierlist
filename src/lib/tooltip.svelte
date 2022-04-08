<script lang="ts" context="module">
</script>

<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { TooltipProps } from './actions/tooltip';

	export let tooltipProps: TooltipProps;
</script>

{#key tooltipProps}
	<div class="tooltip" transition:fly={{ y: 15, duration: 100 }}>
		{tooltipProps.title}
		{#if tooltipProps.subTitle}
			<span class="small-text">
				{tooltipProps.subTitle}
			</span>
		{/if}
	</div>
{/key}

<style lang="scss">
	.tooltip {
		width: 8rem;
		background-color: var(--bg-color-highlighted);
		color: var(--font-color);
		text-align: center;
		padding: 0.5rem;
		border-radius: 6px;
		font-size: medium;

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

		.small-text {
			font-size: smaller;
			color: var(--font-color-lightened);
			font-weight: normal;
			display: block;
		}
	}
</style>
