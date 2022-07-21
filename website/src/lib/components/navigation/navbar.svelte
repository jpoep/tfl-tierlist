<script lang="ts">
	import '../../../app.scss';
	import '@fontsource/titillium-web';
	import '@fontsource/titillium-web/700.css';
	import SettingsButton from './settings-button.svelte';
import Link from './link.svelte';

	let y: number;
</script>

<svelte:window bind:scrollY={y} />

<nav class="top-bar" class:shadowed={y > 50}>
	<slot />
	<span><Link href="/teams">Teams</Link></span>
	<SettingsButton />
</nav>

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
		justify-content: flex-end;
		height: var(--navbar-height);
		padding: 0.6rem 0.5rem;
		gap: 1rem;
		align-items: center;

		transition: background-color 1s ease;

		span {
			margin-left: auto;
		}
	}

	nav {
		transition: box-shadow 0.5s ease;
	}
</style>
