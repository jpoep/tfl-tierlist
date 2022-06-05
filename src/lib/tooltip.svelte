<script lang="ts" context="module">
	export const TOOLTIP_DIV = 'tooltipDiv';
	export const ARROW_DIV = 'arrowDiv';
</script>

<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import type { TooltipProps } from './actions/tooltip';

	let animate = false;
	let tooltipElement: HTMLElement;
	let arrowElement: HTMLElement;
	onMount(() => {
		setTimeout(() => (animate = true), 0);
	});

	export let tooltipProps: TooltipProps;

	const { subTitle, title, width = '8rem' } = tooltipProps;

	$: setContext(TOOLTIP_DIV, tooltipElement);
	$: setContext(ARROW_DIV, arrowElement);
</script>

<div class="tooltip" class:animate bind:this={tooltipElement} style:width>
	{#if title}
		{title}
	{/if}
	{#if subTitle}
		<span class="small-text">
			{subTitle}
		</span>
	{/if}
	<div bind:this={arrowElement} class="arrow" />
</div>

<style lang="scss">
	.tooltip.animate {
		transform: translateY(0);
		opacity: 1;
	}
	.tooltip {
		background-color: var(--bg-color-highlighted);
		color: var(--font-color);
		text-align: center;
		padding: 0.5rem;
		border-radius: 6px;
		font-size: medium;

		// animation
		transform: translateY(15px);
		opacity: 0;
		transition: transform 100ms, opacity 100ms;

		/* Position the tooltip text - see examples below! */
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		display: block;

		font-weight: bold;

		// arrow
		.arrow {
			position: absolute;
			width: 8px;
			height: 8px;
			transform: rotate(45deg);
			background: var(--bg-color-highlighted);
		}

		.small-text {
			font-size: smaller;
			color: var(--font-color-lightened);
			font-weight: normal;
			line-height: 1rem;
			display: block;
		}
	}
</style>
