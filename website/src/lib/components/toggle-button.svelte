<script lang="ts">
	import Icon, { type IconifyIcon } from '@iconify/svelte';

	export let enabledIcon: IconifyIcon;
	export let disabledIcon: IconifyIcon | null = null;
	export let toggled = true;
	export let fontSize = '2rem';
	export let invertIcon = !disabledIcon;
</script>

<button
	on:click={() => (toggled = !toggled)}
	style:font-size={fontSize}
	class:invert={!toggled && invertIcon}
>
	{#if toggled}
		<Icon icon={enabledIcon} />
	{:else}
		<Icon icon={disabledIcon ?? enabledIcon} />
	{/if}
</button>

<style lang="scss">
	button {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.invert {
		filter: opacity(.2);
	}
</style>
