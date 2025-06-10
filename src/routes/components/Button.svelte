<script lang="ts">
	export let onclick: null | (() => void) = null;
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let ariaLabel: string | null = null;
	export let withShadow: boolean = false;
</script>

<button {onclick} {type} aria-label={ariaLabel} class:withShadow>
	<slot />
</button>

<style>
	button {
		align-items: center;
		background-color: transparent;
		border-radius: 0.375rem;
		border: 0.25rem solid var(--white);
		color: var(--white);
		display: inline-flex;
		font-size: 1.75rem;
		font-family: var(--font-primary);
		font-weight: 500;
		gap: 0.5rem;
		justify-content: center;
		line-height: 1.25rem;
		padding: 0.5rem 1rem;
		transition: all 0.2s;
		width: 0.5rem;
	}

	.withShadow {
		box-shadow:
			1px 1px 0 var(--red),
			2px 2px 0 var(--red),
			3px 3px 0 var(--red),
			4px 4px 0 var(--red),
			5px 5px 0 var(--red);
	}

	button:hover {
		background-color: #f9fafb;
		cursor: pointer;
		color: var(--red);
	}

	button:active {
		background-color: var(--orange);
		border-color: var(--orange);
	}

	/* Style for SVG icons */
	button :global(svg) {
		width: 1.25rem;
		height: 1.25rem;
		flex-shrink: 0;
		/* stroke-width: 2; */
	}

	/* Adjust spacing when SVG is only child */
	button :global(svg:only-child) {
		margin: 0;
	}

	/* Adjust spacing when SVG is first child and has siblings */
	button :global(svg:first-child:not(:only-child)) {
		margin-right: 0.25rem;
	}

	/* Adjust spacing when SVG is last child and has siblings */
	button :global(svg:last-child:not(:only-child)) {
		margin-left: 0.25rem;
	}

	@media (min-width: 576px) {
		button {
			font-size: 1rem;
		}

		button :global(svg) {
			width: 1.5rem;
			height: 1.5rem;
			flex-shrink: 0;
			stroke-width: 2;
		}
	}
</style>
