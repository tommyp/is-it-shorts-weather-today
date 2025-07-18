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
		if (forecast && isItShortsWeatherToday(forecast, settings.trigger)) {
			decision = 'yes';
		} else {
			decision = 'no';
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
		line-height: 0.9;
		margin-bottom: -0.5rem;
		font-size: 8rem;
		text-transform: uppercase;
		text-align: center;
		text-wrap: balance;
		text-shadow:
			1px 1px 0 var(--red),
			2px 2px 0 var(--red),
			3px 3px 0 var(--red),
			4px 4px 0 var(--red),
			5px 5px 0 var(--red);
	}

	p {
		font-size: 2rem;
		text-transform: uppercase;
		margin-bottom: 0.5rem;
	}

	.error h1 {
		font-size: 6rem;
	}

	@media (min-width: 768px) {
		h1 {
			font-size: 16rem;
			margin-bottom: -2rem;
		}
		.error h1 {
			font-size: 8rem;
		}
	}
</style>
