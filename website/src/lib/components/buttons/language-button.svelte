<script lang="ts">
	import { language, toggleLanguage } from '$lib/stores/language';
	import { fly } from 'svelte/transition';
	import { expoOut } from 'svelte/easing';

	const animationDuration = 1000;
	const animationDistance = 25;
	const easing = expoOut;
</script>

<div class="language-button-wrapper">
	{#key $language}
		<div
			in:fly={{ duration: animationDuration, y: animationDistance, easing: easing }}
			out:fly={{ duration: animationDuration, y: -animationDistance, easing: easing }}
		>
			<button on:click={toggleLanguage}>{$language.toUpperCase()}</button>
		</div>
	{/key}
</div>

<style lang="scss">
	button {
		text-align: center;
		font-size: 2rem;
	}
	.language-button-wrapper {
		display: grid;
		align-items: center;
		> * {
			grid-area: 1/1/2/2;
		}
	}
</style>
