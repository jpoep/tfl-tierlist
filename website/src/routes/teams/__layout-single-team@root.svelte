<script lang="ts">
	import Link from '$lib/components/navigation/link.svelte';
	import Navbar from '$lib/components/navigation/navbar.svelte';
	import backArrow from '@iconify-icons/ic/baseline-arrow-back.js';
	import Icon from '@iconify/svelte';
</script>

<Navbar>
	<Link href="/teams">
		<Icon inline icon={backArrow} />
		Alle Teams
	</Link>
</Navbar>

<main>
	<slot />
</main>