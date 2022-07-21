<script lang="ts">
	import Icon from '@iconify/svelte';
	import settings from '@iconify-icons/mdi/cog';
	import LanguageButton from '../buttons/language-button.svelte';
	import DarkModeButton from '../buttons/dark-mode-button.svelte';
	import ToggleArtworkButton from '../buttons/toggle-artwork-button.svelte';
	import ToggleStatsButton from '../buttons/toggle-stats-button.svelte';
	import Tooltip from '../tooltip.svelte';

	export let toggled = false;

	const toggleOff = () => (toggled = false);
	const toggle = () => (toggled = !toggled);
</script>

<div
	class="wrapper"
	on:click={toggle}
	on:focusout={toggleOff}
>
	<button>
		<Icon icon={settings} />
	</button>
	{#if toggled}
		<Tooltip tooltipProps={{ width: 'inherit' }}>
			<div class="settings" on:click|stopPropagation>
				<ToggleStatsButton />
				<ToggleArtworkButton />
				<DarkModeButton />
				<LanguageButton />
			</div>
		</Tooltip>
	{/if}
</div>

<style lang="scss">
	.settings {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2rem;
	}
</style>
