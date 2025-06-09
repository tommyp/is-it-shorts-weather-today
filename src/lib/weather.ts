import type { Forecast } from './types';

const isWarmEnough = (trigger: number, tempMax: number, temp: number) => {
	if (tempMax >= trigger) {
		return true;
	}
	if (temp >= trigger) {
		return true;
	}

	return false;
};

// codes come from https://openweathermap.org/weather-conditions
const conditions = {
	clear: 800,
	clouds: [801, 802, 803],
	haze: [711, 721, 731, 751, 761, 762]
};

const isItShortsWeatherToday = (forecast: Forecast, trigger: number) => {
	const { temp_max: tempMax, temp } = forecast.main;
	const code = forecast.weather[0].id;

	// clear or clouds
	if (code == conditions.clear || conditions.clouds.includes(code)) {
		return isWarmEnough(trigger, tempMax, temp);
	}

	// overcast
	if (code === 804) {
		const t = trigger > 21 ? trigger : 21;
		return isWarmEnough(t, tempMax, temp);
	}

	// haze
	if (conditions.haze.includes(code)) {
		const t = trigger > 20 ? trigger : 20;

		console.log({
			t: t,
			tempMax: tempMax,
			temp: temp
		});
		return isWarmEnough(t, tempMax, temp);
	}

	// warm weather
	const t = trigger > 23 ? trigger : 23;

	if (isWarmEnough(t, tempMax, temp)) {
		return true;
	}

	return false;
};

export { isWarmEnough, isItShortsWeatherToday };
