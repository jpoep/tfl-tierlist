<script lang="ts">
	import stats from '@iconify-icons/gridicons/stats.js';
	import ToggleButton from '../toggle-button.svelte';
	import { allStatsToggled } from '$lib/stores/statToggle';
</script>

<ToggleButton enabledIcon={stats} invertIcon bind:toggled={$allStatsToggled} />
