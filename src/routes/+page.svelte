<script lang="ts">
	let location: undefined | { lat: number; lon: number } = $state();
	let weather: any = $state();

	$effect(() => {
		if (location) {
			fetch('/api', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					lat: location.lat,
					lon: location.lon,
					units: 'metric'
				})
			})
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
				location = { lat, lon };
			});
		} else {
			console.error('Geolocation is not supported by this browser.');
		}
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

<h1>Is It Shorts Weather Today?</h1>

<button onclick={findMe}> Find Me </button>

{#if location}
	<p>Location: {location.lat}, {location.lon}</p>
{/if}

{#if weather}
	<p>Temperature: {weather.main?.temp}°C</p>
{/if}
