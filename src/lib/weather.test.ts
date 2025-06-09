import { expect, describe, it } from 'vitest';
import { isItShortsWeatherToday } from './weather';
import type { Forecast } from './types';

describe('isItShortsWeatherToday', () => {
	it('should return true when the weather is clear and warm enough', () => {
		const forecast = makeForecast(20, 21, 'Clear');
		expect(isItShortsWeatherToday(forecast, 18)).toBe(true);
	});

	it('should return false when the weather is clear and not warm enough', () => {
		const forecast = makeForecast(20, 21, 'Clear');
		expect(isItShortsWeatherToday(forecast, 22)).toBe(false);
	});

	it('should return true when the weather is clouds and warm enough', () => {
		const forecast = makeForecast(20, 21, 'Clouds');
		expect(isItShortsWeatherToday(forecast, 18)).toBe(true);
	});

	it('should return false if the weather is clouds and not warm enough', () => {
		const forecast = makeForecast(20, 21, 'Clouds');
		expect(isItShortsWeatherToday(forecast, 23)).toBe(false);
	});

	it('should return true if the weather is haze and warm enough', () => {
		const forecast = makeForecast(21, 23, 'Haze');
		expect(isItShortsWeatherToday(forecast, 18)).toBe(true);
	});

	it('should return false if the weather is haze and not warm enough', () => {
		const forecast = makeForecast(20, 21, 'Haze');
		expect(isItShortsWeatherToday(forecast, 25)).toBe(false);
	});

	it('should return true if the weather is overcast and warm enough', () => {
		const forecast = makeForecast(21, 23, 'Overcast');
		expect(isItShortsWeatherToday(forecast, 18)).toBe(true);
	});

	it('should return false if the weather is overcast and not warm enough', () => {
		const forecast = makeForecast(20, 21, 'Overcast');
		expect(isItShortsWeatherToday(forecast, 25)).toBe(false);
	});
});

type Condition = 'Clouds' | 'Clear' | 'Haze' | 'Rain' | 'Overcast';

const makeForecast = (temp: number, temp_max: number, condition: Condition): Forecast => {
	const conditions = {
		Clear: [800],
		Clouds: [801, 802, 803],
		Overcast: [804],
		Haze: [711, 721, 731, 751, 761, 762],
		Rain: [500, 501, 502, 503, 504, 511, 520, 521, 522, 531]
	};

	const conditionIds = conditions[condition];
	const conditionId: number = conditionIds[Math.floor(Math.random() * conditionIds.length)];

	const forecast: Forecast = {
		coord: {
			lon: -0.1257,
			lat: 51.5085
		},
		weather: [
			{
				id: conditionId,
				main: condition,
				description: 'few clouds',
				icon: '02d'
			}
		],
		base: 'stations',
		main: {
			temp: temp,
			feels_like: 13.15,
			temp_min: 12.25,
			temp_max: temp_max,
			pressure: 1004,
			humidity: 90,
			sea_level: 1004,
			grnd_level: 1000
		},
		visibility: 10000,
		wind: {
			speed: 2.06,
			deg: 200
		},
		clouds: {
			all: 20
		},
		dt: 1749319612,
		sys: {
			type: 2,
			id: 2075535,
			country: 'GB',
			sunrise: 1749267912,
			sunset: 1749327230
		},
		timezone: 3600,
		id: 2643743,
		name: 'London',
		cod: 200
	};

	return forecast;
};
