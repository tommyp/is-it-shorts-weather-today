<script lang="ts">
	import { onMount } from 'svelte';

	import Decision from '$lib/components/Decision.svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import SettingsModal from '$lib/components/SettingsModal.svelte';
	import Background from '$lib/components/Background.svelte';
	import type { Forecast } from '$lib/types';
	import Controls from '$lib/components/Controls.svelte';

	let requestParams: undefined | { lat?: number; lon?: number; location?: string } = $state();
	let weather: Forecast | null = $state(null);
	let isLoading = $state(false);
	let error = $state();
	let location: undefined | string = $state();

	let showSettingsModal = $state(false);
	let title = $derived(
		weather ? `Is It Shorts Weather Today in ${weather['name']}?` : 'Is It Shorts Weather Today?'
	);

	let settings = $state({
		unit: 'celsius',
		trigger: 18
	});

	const loadSettings = () => {
		const savedSettings = localStorage.getItem('weatherSettings');
		if (savedSettings) {
			settings = JSON.parse(savedSettings);
		}
	};

	const hydrateFromParams = () => {
		const url = new URL(window.location.href);
		const queryParams = new URLSearchParams(url.search);
		const locationParam = queryParams.get('location');
		const latParam = queryParams.get('lat');
		const lonParam = queryParams.get('lon');
		if (locationParam) {
			location = locationParam;
			requestParams = { location: locationParam };
		} else if (latParam && lonParam) {
			requestParams = { lat: Number(latParam), lon: Number(lonParam) };
		}
	};

	onMount(() => {
		hydrateFromParams();
		loadSettings();
	});

	const makeRequest = async (params: { lat?: number; lon?: number; location?: string }) => {
		isLoading = true;
		error = null;
		const response = await fetch('/api/current', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(params)
		});

		isLoading = false;

		if (!response.ok) {
			console.log(response);
			if (response.status === 404) {
				error = "That's not a place";
			} else {
				error = 'Failed to fetch weather';
			}
			return;
		}

		return response.json();
	};

	$effect(() => {
		if (requestParams) {
			makeRequest(requestParams).then((data) => {
				location = data.name;
				weather = data;
			});
		}
	});
</script>

<svelte:head>
	<title>
		{title}
	</title>
</svelte:head>

{#if showSettingsModal}
	<SettingsModal
		closeModal={() => {
			showSettingsModal = false;
			loadSettings();
		}}
	/>
{/if}
<Background />
<main>
	<div>
		<Header location={weather?.name} />
	</div>
	{#if isLoading}
		<div class="loading">
			<p>Loading...</p>
		</div>
	{/if}
	{#if !isLoading && (weather || error)}
		<Decision forecast={weather} {error} {settings} />
	{/if}
	<div>
		<Controls bind:showSettingsModal bind:requestParams bind:location />
		<Footer />
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		height: 100dvh;
		max-width: 1024px;
		margin: 0 auto;
	}

	.loading {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	p {
		font-size: 4rem;
		text-transform: uppercase;
		margin-bottom: 0.5rem;
		opacity: 0.5;
		color: var(--white);
		font-weight: bold;
	}
</style>
