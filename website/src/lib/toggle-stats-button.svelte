<script lang="ts">
	import Icon from '@iconify/svelte';
	import stats from '@iconify-icons/gridicons/stats.js';

	export let toggled = false;
</script>

<button on:click={() => (toggled = !toggled)}>
	<Icon icon={stats} />
</button>

<style lang="scss">
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2rem;
	}
</style>
