<script lang="ts">
	const { forecast, error } = $props();
	let decision: undefined | 'yes' | 'no' = $state();
	let currentTemp;
	let condition;

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

	condition = forecast.weather[0].description;
	const code = forecast.weather[0].id;

	// codes come from https://openweathermap.org/weather-conditions
	if (code >= 800 && code < 804 && warmTemp(18)) {
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
</script>

<div>
	<h1>Decision</h1>
	<p>{forecast.name}</p>
	<p>{forecast.main.temp}°C</p>
	<p>{condition}</p>
	<p>{decision}</p>
</div>
