<script lang="ts">
	export let onclick: () => void;
	export let type: 'button' | 'submit' | 'reset' = 'button';
</script>

<button {onclick} {type}>
	<slot />
</button>

<style>
	button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		border-radius: 0.375rem;
		border: 1px solid #e5e7eb;
		background-color: white;
		color: #374151;
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 500;
		transition: all 0.2s;
	}

	button:hover {
		background-color: #f9fafb;
	}

	button:active {
		background-color: #f3f4f6;
	}

	/* Style for SVG icons */
	button :global(svg) {
		width: 1.25rem;
		height: 1.25rem;
		flex-shrink: 0;
	}

	/* Adjust spacing when SVG is first child */
	button :global(svg:first-child) {
		margin-right: 0.25rem;
	}

	/* Adjust spacing when SVG is last child */
	button :global(svg:last-child) {
		margin-left: 0.25rem;
	}
</style>
