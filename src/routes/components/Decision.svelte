<script lang="ts">
	const { forecast, error, settings } = $props();
	let decision: undefined | 'yes' | 'no' = $state();
	let currentTemp;
	let condition = $derived(forecast.weather[0].description);
	let code = $derived(forecast.weather[0].id);

	const conditions = {
		clear: 800,
		clouds: [801, 802, 803]
	};

	const warmTemp = (trigger: number) => {
		const { temp_max: tempMax, temp } = forecast.main;
		currentTemp = temp;

		if (tempMax >= trigger) {
			currentTemp = tempMax;
			return true;
		}
		if (temp >= trigger) {
			currentTemp = temp;
			return true;
		}

		return false;
	};

	$effect(() => {
		// codes come from https://openweathermap.org/weather-conditions
		if ((code == conditions.clear || conditions.clouds.includes(code)) && warmTemp(18)) {
			// nice weather
			decision = 'yes';
		} else if ([711, 721, 731, 751, 761, 762].includes(code) && warmTemp(20)) {
			// haze and other weather
			decision = 'yes';
		} else if (code === 804 && warmTemp(21)) {
			// very nice weather
			decision = 'yes';
		} else if (warmTemp(25)) {
			// very hot weather
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
