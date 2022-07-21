<script lang="ts">
	import { filter } from '$lib/stores/filter';
	import cancelIcon from '@iconify-icons/iconoir/cancel.js';
	import Icon from '@iconify/svelte';
</script>

<div class="input-wrapper">
	<input type="search" bind:value={$filter} placeholder="Nach Pokémon, Typen oder Teams filtern" />
	{#if $filter?.length > 0}
		<button class="cancel-button" on:click={() => ($filter = '')}>
			<Icon icon={cancelIcon} inline />
		</button>
	{/if}
</div>

<style lang="scss">
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
</style>
