<script lang="ts">
	import ToggleButton from '../toggle-button.svelte';
	import { officialArtworkEnabled } from '$lib/stores/sprites';
	import imageIcon from '@iconify-icons/akar-icons/image.js';
</script>

<ToggleButton
	enabledIcon={imageIcon}
	bind:toggled={$officialArtworkEnabled}
	fontSize={'1.7rem'}
	invertIcon
/>
