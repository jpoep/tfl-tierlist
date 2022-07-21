import Tooltip from '$lib/components/tooltip.svelte';
export type TooltipProps = {
	title?: string | null;
	subTitle?: string | null;
	width?: string | null;
	backgroundColor?: string | null;
	fontColor?: string | null;
	smallFontColor?: string | null;
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
