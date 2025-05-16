<script lang="ts">
	import 'normalize.css';
</script>

<slot></slot>

<style>
	:global(body) {
		--yellow: rgb(250, 182, 23);
		--red: rgb(227, 6, 19);
		--font-primary: 'Orbitron', system-ui, -apple-system, sans-serif;

		background: var(--red);
		color: var(--yellow);
		font-family: var(--font-primary);
		font-weight: 300;
	}

	:global(h1, h2, h3, h4, h5, h6) {
		font-weight: 700;
	}
</style>
