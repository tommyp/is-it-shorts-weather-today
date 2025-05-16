<script lang="ts">
	import Button from './components/Button.svelte';
	import Decision from './components/Decision.svelte';
	let params: undefined | { lat?: number; lon?: number; location?: string } = $state();
	let weather: any = $state();
	let isLoading = $state(false);
	let decision = $state();
	let error = $state();

	const makeRequest = async (params: { lat?: number; lon?: number; location?: string }) => {
		isLoading = true;
		return await fetch('/api', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(params)
		});
	};

	$effect(() => {
		if (params) {
			makeRequest(params)
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					weather = data;
				})
				.catch((error) => {
					console.error('Error fetching weather:', error);
				});
		}
	});

	const findMe = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				const lat = position.coords.latitude;
				const lon = position.coords.longitude;
				params = { lat, lon };
			});
		} else {
			console.error('Geolocation is not supported by this browser.');
		}
	};

	const handleSubmit = (e: Event) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const location = formData.get('location') as string;
		params = { location };
	};

	const hydrateFromParams = () => {
		const url = new URL(window.location.href);
		const params = new URLSearchParams(url.search);
		const location = params.get('location');
		const lat = params.get('lat');
		const lon = params.get('lon');
		if (location) {
			// TODO set title
			// TODO run locationQuery
			// locationQuery(location);
			// input.value = location;
			// setTitle(location);
		} else if (lat && lon) {
			// TODO run locationQuery
		}
	};
</script>

<!-- {#if location}
	<p>Location: {location.lat}, {location.lon}</p>
{/if}

{#if weather}
	<p>Temperature: {weather.main?.temp}°C</p>
{/if} -->

<main>
	<div>
		<h1>Is It Shorts Weather Today</h1>
		{#if weather}
			<Decision forecast={weather} />
		{/if}
	</div>
	<form onsubmit={handleSubmit}>
		<input type="text" name="query" />
		<button type="submit">Search</button>
		<Button onclick={findMe}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="size-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
				/>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
				/>
			</svg>

			<span>Find Me</span>
		</Button>
	</form>
</main>

<style>
	h1 {
		font-family: 'Orbitron';
	}
	form {
		display: flex;
		gap: 0.25rem;
	}
</style>
