<script lang="ts">
	import { isItShortsWeatherToday, isWarmEnough } from '$lib/weather';
	const { forecast, error, settings } = $props();
	let decision: undefined | 'yes' | 'no' = $state();
	let condition = $derived(forecast.weather[0].main);
	let code = $derived(forecast.weather[0].id);

	const conditions = {
		clear: 800,
		clouds: [801, 802, 803]
	};

	$effect(() => {
		const { temp_max: tempMax, temp } = forecast.main;

		if (isItShortsWeatherToday(forecast, 18)) {
			decision = 'yes';
		} else {
			decision = 'no';
		}
	});
</script>

<div>
	<h1>{decision}</h1>

	<p>{forecast.main.temp}°{settings.unit === 'celsius' ? 'C' : 'F'}</p>
	<p>{condition}</p>
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		color: var(--white);
	}
	h1 {
		font-size: 8rem;
		text-transform: uppercase;
	}

	p {
		font-size: 2rem;
		text-transform: uppercase;
		margin-bottom: 0.5rem;
	}
</style>
