<script lang="ts">
	import '../app.scss';
	import '@fontsource/titillium-web';
	import '@fontsource/titillium-web/700.css';
	import ToggleStatsButton from '$lib/components/buttons/toggle-stats-button.svelte';
	import DarkModeButton from '$lib/components/buttons/dark-mode-button.svelte';
	import LanguageButton from '$lib/components/buttons/language-button.svelte';
	import { filter } from '$lib/stores/store';
	import cancelIcon from '@iconify-icons/iconoir/cancel.js';
	import Icon from '@iconify/svelte';
	import ToggleArtworkButton from '$lib/components/buttons/toggle-artwork-button.svelte';

	let y: number;
</script>

<svelte:window bind:scrollY={y} />

<nav class="top-bar" class:shadowed={y > 50}>
	<div class="input-wrapper">
		<input
			type="search"
			bind:value={$filter}
			placeholder="Nach Pokémon, Typen oder Teams filtern"
		/>
		{#if $filter?.length > 0}
			<button class="cancel-button" on:click={() => ($filter = '')}>
				<Icon icon={cancelIcon} inline />
			</button>
		{/if}
	</div>
	<div class="spacer" />
	<ToggleStatsButton />
	<ToggleArtworkButton />
	<DarkModeButton />
	<LanguageButton />
</nav>
<main>
	<slot />
</main>

<style lang="scss">
	:root {
		--navbar-height: 4rem;
	}
	:global(.top-bar) {
		position: sticky;
		top: 0;
		left: 0;
		right: 0;
		z-index: 3;
		background-color: var(--bg-color);
		width: 100%;
		display: flex;
		justify-content: space-between;
		height: var(--navbar-height);
		padding: 0.6rem 0.5rem;
		gap: 0.2rem;
		align-items: center;

		transition: background-color 1s ease;

		.input-wrapper {
			height: 100%;
			width: 100%;
			max-width: 40rem;
			position: relative;
			.cancel-button {
				position: absolute;
				right: 0.2rem;
				height: 100%;
				font-size: 1.8rem;
			}
		}
		input {
			background-color: var(--bg-color-highlighted);
			height: 100%;
			width: 100%;
			color: var(--font-color);
			border: none;
			border-radius: 5px;
			padding: 0.5rem;
			appearance: none;

			&::placeholder {
				text-align: center;
			}
		}

		.spacer {
			flex-grow: 1;
		}
	}

	nav {
		transition: box-shadow 0.5s ease;
	}

	main {
		margin: 0 0.5rem;
		margin-bottom: 0.5rem;
	}
</style>
