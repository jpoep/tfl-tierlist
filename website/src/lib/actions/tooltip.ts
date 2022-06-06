import Tooltip, { ARROW_DIV, TOOLTIP_DIV } from '$lib/tooltip.svelte';
import { arrow, autoPlacement, offset, shift } from '@floating-ui/core';
import { computePosition } from '@floating-ui/dom';
export type TooltipProps = {
	title?: string | null;
	subTitle?: string | null;
	width?: string | null;
	backgroundColor?: string | null;
};
export function tooltip(element: Element, tooltipProps: TooltipProps) {
	let tooltipComponent: Tooltip;
	function mouseOver() {
		tooltipComponent = new Tooltip({
			props: {
				tooltipProps
			},
			target: element
		});
		const tooltip = tooltipComponent.$$.context.get(TOOLTIP_DIV);
		const arrowElement = tooltipComponent.$$.context.get(ARROW_DIV);
		computePosition(element, tooltip, {
			middleware: [
				offset(-5),
				autoPlacement({ allowedPlacements: ['bottom', 'top'] }),
				shift({ padding: 5 }),
				arrow({ element: arrowElement })
			]
		}).then(({ x, y, placement, middlewareData }) => {
			Object.assign(tooltip.style, {
				left: `${x}px`,
				top: `${y}px`
			});

			const { x: arrowX, y: arrowY } = middlewareData.arrow;
			const staticSide = {
				top: 'bottom',
				right: 'left',
				bottom: 'top',
				left: 'right'
			}[placement.split('-')[0]];

			Object.assign(arrowElement.style, {
				left: arrowX != null ? `${arrowX}px` : '',
				top: arrowY != null ? `${arrowY}px` : '',
				right: '',
				bottom: '',
				[staticSide]: '-4px'
			});

			tooltipComponent.$set({ placement });
		});
	}

	function mouseLeave() {
		tooltipComponent.$destroy();
	}

	element.addEventListener('mouseover', mouseOver);
	element.addEventListener('mouseout', mouseLeave);
	element.addEventListener('focus', mouseOver);
	element.addEventListener('blur', mouseLeave);

	return {
		destroy() {
			element.removeEventListener('mouseover', mouseOver);
			element.removeEventListener('mouseout', mouseLeave);
			element.removeEventListener('focus', mouseOver);
			element.removeEventListener('blur', mouseLeave);
		}
	};
}
