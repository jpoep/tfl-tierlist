<script lang="ts">
	export let href: string;
</script>

<a {href} sveltekit:prefetch><slot /></a>

<style lang="scss">
    a {
        font-size: larger;
        font-weight: bold;
    }
</style>