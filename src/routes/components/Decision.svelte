<script lang="ts">
	import { celsiusToFahrenheit } from '$lib/utils';
	import { isItShortsWeatherToday } from '$lib/weather';
	const { forecast, settings, error } = $props();
	let decision: undefined | 'yes' | 'no' = $state();
	let condition = $derived(forecast.weather[0].main);
	let temp = $derived(() => {
		if (settings.unit === 'celsius') {
			return Math.round(forecast.main.temp);
		} else {
			return celsiusToFahrenheit(forecast.main.temp);
		}
	});

	$effect(() => {
		if (forecast) {
			const { isShortsWeatherToday, temp, condition, locationName } = isItShortsWeatherToday(
				forecast,
				settings.trigger
			);
			decision = isShortsWeatherToday ? 'yes' : 'no';
			temp = temp;
			condition = condition;
			locationName = locationName;
		}
	});
</script>

{#if error}
	<div class="error">
		<h1>{error}</h1>
	</div>
{:else}
	<div>
		<h1>{decision}</h1>

		<p>{temp()}°{settings.unit === 'celsius' ? 'C' : 'F'}</p>
		<p>{condition}</p>
	</div>
{/if}

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
		text-align: center;
	}

	p {
		font-size: 2rem;
		text-transform: uppercase;
		margin-bottom: 0.5rem;
	}
</style>
