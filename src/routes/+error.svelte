<script>
	import Background from '$lib/components/Background.svelte';
</script>

<Background />
<main>
	<h1>It's banjaxed</h1>
	<p>
		Something's broken, so <a href="/">try again later.</a>
	</p>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100dvh;
		color: var(--white);
	}

	h1 {
		font-size: 8rem;
		text-transform: uppercase;
		text-align: center;
		text-shadow:
			1px 1px 0 var(--red),
			2px 2px 0 var(--red),
			3px 3px 0 var(--red),
			4px 4px 0 var(--red),
			5px 5px 0 var(--red);
	}

	p {
		font-size: 2rem;
		text-transform: uppercase;
		margin-top: 1rem;
		text-align: center;
	}

	a {
		color: var(--white);
	}
</style>
