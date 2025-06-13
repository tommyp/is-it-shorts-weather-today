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
		color: var(--white);
	}

	h1 {
		font-size: 2.5rem;
		font-weight: 700;
		text-transform: uppercase;
		text-align: center;
		margin: 1rem auto;
		text-shadow:
			1px 1px 0 var(--red),
			2px 2px 0 var(--red),
			3px 3px 0 var(--red),
			4px 4px 0 var(--red),
			5px 5px 0 var(--red);
	}

	@media (min-width: 768px) {
		h1 {
			font-size: 5rem;
		}
	}

	@media (min-width: 992px) {
		h1 {
			font-size: 7rem;
		}
	}
</style>
