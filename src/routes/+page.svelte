<script lang="ts">
	import { onMount } from 'svelte';
	import Button from './components/Button.svelte';
	import Decision from './components/Decision.svelte';
	import Header from './components/Header.svelte';
	import Footer from './components/Footer.svelte';
	import SettingsModal from './components/SettingsModal.svelte';
	import Background from './components/Background.svelte';
	import { pushState } from '$app/navigation';

	let requestParams: undefined | { lat?: number; lon?: number; location?: string } = $state();
	let weather: any = $state();
	let isLoading = $state(false);
	let error = $state();
	let location = $state();
	let showSettingsModal = $state(false);

	let settings = $state({
		unit: 'celsius',
		trigger: 18
	});

	onMount(() => {
		const savedSettings = localStorage.getItem('weatherSettings');
		if (savedSettings) {
			settings = JSON.parse(savedSettings);
		}
	});

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
		if (requestParams) {
			makeRequest(requestParams)
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					location = data.name;
					weather = data;
				})
				.catch((error) => {
					console.error('Error fetching weather:', error);
					error = error;
				});
		}
	});

	const findMe = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				const lat = position.coords.latitude;
				const lon = position.coords.longitude;
				requestParams = { lat, lon };
				setWindowParams(requestParams);
			});
		} else {
			console.error('Geolocation is not supported by this browser.');
		}
	};

	const handleSubmit = (e: Event) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const location = formData.get('location') as string;
		requestParams = { location };
		setWindowParams(requestParams);
	};

	const setWindowParams = (params: { lat?: number; lon?: number; location?: string }) => {
		const qp: { lat?: string; lon?: string; location?: string } = {};
		if (params.lat && params.lon) {
			qp.lat = params.lat?.toString() || '';
			qp.lon = params.lon?.toString() || '';
		} else if (params.location) {
			qp.location = params.location || '';
		}

		history.pushState(null, '', `?${new URLSearchParams(qp).toString()}`);
	};

	const hydrateFromParams = () => {
		const url = new URL(window.location.href);
		const queryParams = new URLSearchParams(url.search);
		const location = queryParams.get('location');
		const lat = queryParams.get('lat');
		const lon = queryParams.get('lon');
		if (location) {
			requestParams = { location };
		} else if (lat && lon) {
			requestParams = { lat: Number(lat), lon: Number(lon) };
		}
	};

	onMount(() => {
		hydrateFromParams();
	});
</script>

{#if showSettingsModal}
	<SettingsModal closeModal={() => (showSettingsModal = false)} />
{/if}
<Background />
<main>
	<div>
		<Header location={weather?.name} />
	</div>
	{#if weather || error}
		<Decision forecast={weather} {error} {settings} />
	{/if}
	<div>
		<div class="controls">
			<Button onclick={() => (showSettingsModal = true)} ariaLabel="Setting">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="size-6"
				>
					<path
						fill-rule="evenodd"
						d="M11.828 2.25c-.916 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 0 1-.517.608 7.45 7.45 0 0 0-.478.198.798.798 0 0 1-.796-.064l-.453-.324a1.875 1.875 0 0 0-2.416.2l-.243.243a1.875 1.875 0 0 0-.2 2.416l.324.453a.798.798 0 0 1 .064.796 7.448 7.448 0 0 0-.198.478.798.798 0 0 1-.608.517l-.55.092a1.875 1.875 0 0 0-1.566 1.849v.344c0 .916.663 1.699 1.567 1.85l.549.091c.281.047.508.25.608.517.06.162.127.321.198.478a.798.798 0 0 1-.064.796l-.324.453a1.875 1.875 0 0 0 .2 2.416l.243.243c.648.648 1.67.733 2.416.2l.453-.324a.798.798 0 0 1 .796-.064c.157.071.316.137.478.198.267.1.47.327.517.608l.092.55c.15.903.932 1.566 1.849 1.566h.344c.916 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 0 1 .517-.608 7.52 7.52 0 0 0 .478-.198.798.798 0 0 1 .796.064l.453.324a1.875 1.875 0 0 0 2.416-.2l.243-.243c.648-.648.733-1.67.2-2.416l-.324-.453a.798.798 0 0 1-.064-.796c.071-.157.137-.316.198-.478.1-.267.327-.47.608-.517l.55-.091a1.875 1.875 0 0 0 1.566-1.85v-.344c0-.916-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 0 1-.608-.517 7.507 7.507 0 0 0-.198-.478.798.798 0 0 1 .064-.796l.324-.453a1.875 1.875 0 0 0-.2-2.416l-.243-.243a1.875 1.875 0 0 0-2.416-.2l-.453.324a.798.798 0 0 1-.796.064 7.462 7.462 0 0 0-.478-.198.798.798 0 0 1-.517-.608l-.091-.55a1.875 1.875 0 0 0-1.85-1.566h-.344ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
						clip-rule="evenodd"
					/>
				</svg>
			</Button>

			<form onsubmit={handleSubmit}>
				<input type="text" name="location" autocomplete="off" bind:value={location} />

				<Button onclick={findMe} ariaLabel="Find Me">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="size-6"
					>
						<path
							fill-rule="evenodd"
							d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
							clip-rule="evenodd"
						/>
					</svg>
				</Button>

				<Button type="submit">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="size-6"
					>
						<path
							fill-rule="evenodd"
							d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
							clip-rule="evenodd"
						/>
					</svg>
				</Button>
			</form>
		</div>
		<Footer />
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		height: 100vh;
		max-width: 1024px;
		margin: 0 auto;
	}

	.controls {
		display: flex;
		gap: 0.25rem;
		padding: 0 0.5rem;
		margin: 0 auto 1rem;
		width: 100%;
	}

	form {
		display: flex;
		gap: 0.25rem;
		border: 0.25rem solid var(--white);
		border-radius: 0.5rem;
		padding: 0.5rem;
	}

	input {
		flex: 1;
		border: none;
		font-size: 1.5rem;
		background: none;
		padding: 0.1rem;
		color: var(--white);
		font-family: var(--font-primary);
		width: 100%;
	}

	form:has(input:focus) {
		outline: none;
		border-color: var(--orange);
	}

	input:focus {
		outline: none;
	}

	@media (min-width: 576px) {
		.controls {
			padding: 0;
			margin: 0 auto 1rem;
		}

		input {
			font-size: 2rem;
			width: auto;
		}
	}
</style>
