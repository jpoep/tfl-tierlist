<script lang="ts">
	import { fly } from 'svelte/transition';
	import { tooltip } from './actions/tooltip';
	import Icon from '@iconify/svelte';
	import topArrow from '@iconify-icons/ic/baseline-arrow-upward.js';

	let y: number;

	export let threshold = 500;

	const scrollToTop = () => {
		window.scroll({
			top: 0,
			behavior: 'smooth'
		});
	};
</script>

<svelte:window bind:scrollY={y} />

{#if y > threshold}
	<button
		class="scroll-to-top-button"
		transition:fly={{ y: 100, duration: 300 }}
		on:click={scrollToTop}
		use:tooltip={{ title: 'Zurück nach oben' }}
	>
		<Icon icon={topArrow} />
	</button>
{/if}

<style lang="scss">
	.scroll-to-top-button {
		position: fixed;
		bottom: 3rem;
		right: 3rem;
		font-size: 2.5rem;
		color: var(--font-color);
		background-color: var(--bg-color-highlighted);
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0.5rem;
	}
</style>
