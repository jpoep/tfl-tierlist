<script lang="ts">
	import Navbar from '$lib/components/navigation/navbar.svelte';
	import SearchBar from '$lib/components/navigation/search-bar.svelte';
</script>

<Navbar>
	<SearchBar />
</Navbar>

<main>
	<slot />
</main>
