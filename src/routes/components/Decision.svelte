<script lang="ts">
	import { isItShortsWeatherToday } from '$lib/weather';
	const { forecast, settings, error } = $props();
	let decision: undefined | 'yes' | 'no' = $state();
	let condition = $derived(forecast.weather[0].main);
	let temp = $derived(Math.round(forecast.main.temp));

	$effect(() => {
		if (forecast && isItShortsWeatherToday(forecast, settings.trigger)) {
			decision = 'yes';
		} else {
			decision = 'no';
		}
	});
</script>

{#if error}
	<div class="error">
		<p>{error}</p>
	</div>
{:else}
	<div>
		<h1>{decision}</h1>

		<p>{temp}°{settings.unit === 'celsius' ? 'C' : 'F'}</p>
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
	}

	p {
		font-size: 2rem;
		text-transform: uppercase;
		margin-bottom: 0.5rem;
	}
</style>
