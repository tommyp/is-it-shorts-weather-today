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

interface ShortsResponse {
	isShortsWeatherToday: boolean;
	temp: number;
	condition: string;
	locationName: string;
}

const isItShortsWeatherToday = (forecast: Forecast, trigger: number): ShortsResponse => {
	const { temp_max: tempMax, temp } = forecast.main;
	const code = forecast.weather[0].id;

	// clear or clouds
	if (code == conditions.clear || conditions.clouds.includes(code)) {
		return {
			isShortsWeatherToday: isWarmEnough(trigger, tempMax, temp),
			temp,
			condition: forecast.weather[0].main,
			locationName: forecast.name
		};
	}

	// overcast
	if (code === 804) {
		const t = trigger > 21 ? trigger : 21;
		return {
			isShortsWeatherToday: isWarmEnough(t, tempMax, temp),
			temp,
			condition: forecast.weather[0].main,
			locationName: forecast.name
		};
	}

	// haze
	if (conditions.haze.includes(code)) {
		const t = trigger > 20 ? trigger : 20;

		console.log({
			t: t,
			tempMax: tempMax,
			temp: temp
		});
		return {
			isShortsWeatherToday: isWarmEnough(t, tempMax, temp),
			temp,
			condition: forecast.weather[0].main,
			locationName: forecast.name
		};
	}

	// warm weather
	const t = trigger > 23 ? trigger : 23;

	if (isWarmEnough(t, tempMax, temp)) {
		return {
			isShortsWeatherToday: true,
			temp,
			condition: forecast.weather[0].main,
			locationName: forecast.name
		};
	}

	return {
		isShortsWeatherToday: false,
		temp,
		condition: forecast.weather[0].main,
		locationName: forecast.name
	};
};

export { isItShortsWeatherToday };
