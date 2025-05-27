<script lang="ts">
	const { location } = $props();
</script>

<header>
	{#if location}
		<h1>Is It Shorts Weather Today In {location}?</h1>
	{:else}
		<h1>Is It Shorts Weather Today?</h1>
	{/if}
</header>

<style>
	header {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 1rem;
		color: var(--orange);
	}

	h1 {
		font-size: 4rem;
		font-weight: 700;
		text-transform: uppercase;
		text-align: center;
		margin: 1rem auto;
	}

	@media (min-width: 576px) {
		h1 {
			font-size: 7rem;
		}
	}
</style>
