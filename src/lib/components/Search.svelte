<script lang="ts">
	import Button from './Button.svelte';

	type Props = {
		query: undefined | string;
		handleSearchSelection: (location: string) => void;
	};

	let { query, handleSearchSelection }: Props = $props();

	let results: { name: string; country: string; state?: string }[] = $state([]);
	let isLoading = $state();
	let error = $state();

	const doSearch = async (query: string) => {
		if (!query || query.length === 0) {
			results = [];
			return;
		}

		isLoading = true;
		error = null;
		const response = await fetch('/api/search', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ query })
		});

		if (!response.ok) {
			console.log(response);
			if (response.status === 404) {
				error = "That's not a place";
			} else {
				error = 'Failed to fetch weather';
			}
			return;
		}

		return await response.json();
	};

	$effect(() => {
		if (!query || query.length === 0) {
			results = [];
			return;
		}
		doSearch(query).then((data) => {
			results = data;
		});
	});

	$inspect(results);

	const renderName = (result: { name: string; country: string; state?: string }) => {
		return result.name + (result.state ? `, ${result.state}` : '') + `, ${result.country}`;
	};
</script>

<div class="search-container">
	{#if results.length > 0}
		<ul>
			{#each results as result}
				<li>
					<button
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

	button:hover {
		background-color: var(--red);
		cursor: pointer;
		color: var(--white);
	}

	li:first-of-type button {
		border-radius: 0.375rem 0.375rem 0 0;
	}

	li:last-of-type button {
		border-radius: 0 0 0.375rem 0.375rem;
		border: 0.25rem solid var(--white);
	}
</style>
