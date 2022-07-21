<svelte:options accessors={true} />

<script lang="ts" context="module">
	export const TOOLTIP_DIV = 'tooltipDiv';
	export const ARROW_DIV = 'arrowDiv';
</script>

<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import type { TooltipProps } from '../actions/tooltip';
	import { arrow, autoPlacement, offset, shift, type Placement } from '@floating-ui/core';
	import { computePosition } from '@floating-ui/dom';

	let animate = false;
	let tooltipElement: HTMLElement;
	let arrowElement: HTMLElement;

	onMount(() => {
		setTimeout(() => (animate = true), 0);
	});

	export let tooltipProps: TooltipProps;
	export let placement: Placement | null = null;

	const {
		subTitle,
		title,
		width = '8rem',
		backgroundColor = 'var(--bg-color-highlighted)',
		fontColor = 'var(--font-color)',
		smallFontColor = 'var(--font-color-lightened)'
	} = tooltipProps;
	const ANIMATION_DISTANCE = '15px';

	$: setContext(TOOLTIP_DIV, tooltipElement);
	$: setContext(ARROW_DIV, arrowElement);

	$: splitPlacement = placement?.split('-')[0];
	$: initialAnimation =
		splitPlacement &&
		{
			left: `translateX(-${ANIMATION_DISTANCE})`,
			right: `translateX(${ANIMATION_DISTANCE})`,
			top: `translateY(-${ANIMATION_DISTANCE})`,
			bottom: `translateY(${ANIMATION_DISTANCE})`
		}[splitPlacement];

	// const tooltip = tooltipComponent.$$.context.get(TOOLTIP_DIV);
	// const arrowElement = tooltipComponent.$$.context.get(ARROW_DIV);
	onMount(() => {
		const parentNode = tooltipElement.parentElement;
		if (!parentNode) {
			throw new Error("Can't mount this component without a parent");
		}
		computePosition(parentNode, tooltipElement, {
			middleware: [
				offset(-5),
				autoPlacement({ allowedPlacements: ['bottom', 'top'] }),
				shift({ padding: 5 }),
				arrow({ element: arrowElement })
			]
		}).then(({ x, y, placement: newPlacement, middlewareData }) => {
			Object.assign(tooltipElement.style, {
				left: `${x}px`,
				top: `${y}px`
			});

			if (middlewareData.arrow) {
				const { x: arrowX, y: arrowY } = middlewareData.arrow;
				const staticSide =
					{
						top: 'bottom',
						right: 'left',
						bottom: 'top',
						left: 'right'
					}[newPlacement.split('-')[0]] ?? 'bottom';

				Object.assign(arrowElement.style, {
					left: arrowX != null ? `${arrowX}px` : '',
					top: arrowY != null ? `${arrowY}px` : '',
					right: '',
					bottom: '',
					[staticSide]: '-4px'
				});
			}

			placement = newPlacement;
		});
	});
</script>

<div
	class="tooltip"
	class:animate
	bind:this={tooltipElement}
	style:width
	style:--background-color={backgroundColor}
	style:--font-color={fontColor}
	style:--font-color-lightened={smallFontColor}
	style:transform={initialAnimation}
>
	{#if title}
		{title}
	{/if}
	{#if subTitle}
		<span class="small-text">
			{subTitle}
		</span>
	{/if}
	<div bind:this={arrowElement} class="arrow" />
	<slot />
</div>

<style lang="scss">
	.tooltip.animate {
		opacity: 1;
	}
	.tooltip {
		background-color: var(--background-color);
		color: var(--font-color);
		text-align: center;
		padding: 0.5rem;
		border-radius: 6px;
		font-size: medium;

		// animation
		opacity: 0;
		transition: transform 200ms, opacity 100ms;

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
			background: var(--background-color);
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
