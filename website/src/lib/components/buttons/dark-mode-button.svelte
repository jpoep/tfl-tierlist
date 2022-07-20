<script lang="ts">
	import Icon from '@iconify/svelte';
	import baselineDarkMode from '@iconify-icons/ic/baseline-dark-mode.js';
	import baselineLightMode from '@iconify-icons/ic/baseline-light-mode.js';
	import { darkMode } from '$lib/stores/theme';
</script>

<button on:click={() => ($darkMode = !$darkMode)}>
	{#if $darkMode}
		<Icon icon={baselineDarkMode} />
	{:else}
		<Icon icon={baselineLightMode} />
	{/if}
</button>

<style lang="scss">
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2rem;
	}
</style>
