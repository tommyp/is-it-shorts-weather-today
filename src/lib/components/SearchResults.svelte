<script lang="ts">
	type Props = {
		handleSearchSelection: (location: string) => void;
		results: { name: string; country: string; state?: string }[];
		selectedSearchResultIndex?: number;
	};

	let { handleSearchSelection, results, selectedSearchResultIndex }: Props = $props();

	const renderName = (result: { name: string; country: string; state?: string }) => {
		return result.name + (result.state ? `, ${result.state}` : '') + `, ${result.country}`;
	};
</script>

<div class="search-container">
	{#if results.length > 0}
		<ul>
			{#each results as result, index}
				<li>
					<button
						class:selected={selectedSearchResultIndex === index}
						onclick={() => {
							handleSearchSelection(result.name);
							results = [];
						}}
					>
						{renderName(result)}
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.search-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: absolute;
		top: 0;
		left: 50%;
		transform: translate(-50%, calc(-100% + -0.5rem));
		width: 100%;
	}

	.search-container ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		flex-direction: column-reverse;
		border-radius: 5px;
		box-shadow:
			1px 1px 0 var(--red),
			2px 2px 0 var(--red),
			3px 3px 0 var(--red),
			4px 4px 0 var(--red),
			5px 5px 0 var(--red);
	}

	.search-container li {
		flex-grow: 1;
		display: flex;
	}

	button {
		flex-grow: 1;
		align-items: center;
		background-color: transparent;
		border: 0.25rem solid var(--white);
		border-bottom: 0;

		display: flex;
		font-size: 1.25rem;
		font-family: var(--font-primary);
		font-weight: 500;
		gap: 0.5rem;
		line-height: 1.25rem;
		padding: 0.5rem 1rem;
		transition: all 0.2s;
		text-align: left;
		background: var(--orange);
		color: var(--white);
	}

	button:hover,
	button.selected {
		background-color: var(--red);
		cursor: pointer;
		color: var(--white);
	}

	li:last-of-type button {
		border-radius: 0.375rem 0.375rem 0 0;
	}

	li:first-of-type button {
		border-radius: 0 0 0.375rem 0.375rem;
		border: 0.25rem solid var(--white);
	}
</style>
