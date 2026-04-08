import { expect, describe, it } from 'vitest';
import { isItShortsWeather } from './weather';

describe('isItShortsWeather', () => {
	it('returns true when clear and warm enough', () => {
		expect(isItShortsWeather(20, 21, 800, 18)).toBe(true);
	});

	it('returns false when clear and not warm enough', () => {
		expect(isItShortsWeather(20, 21, 800, 22)).toBe(false);
	});

	it('returns true when cloudy and warm enough', () => {
		expect(isItShortsWeather(20, 21, 801, 18)).toBe(true);
	});

	it('returns false when cloudy and not warm enough', () => {
		expect(isItShortsWeather(20, 21, 802, 23)).toBe(false);
	});

	it('returns true when haze and warm enough', () => {
		expect(isItShortsWeather(21, 23, 721, 18)).toBe(true);
	});

	it('returns false when haze and not warm enough', () => {
		expect(isItShortsWeather(20, 21, 721, 25)).toBe(false);
	});

	it('returns true when overcast and warm enough', () => {
		expect(isItShortsWeather(21, 23, 804, 18)).toBe(true);
	});

	it('returns false when overcast and not warm enough', () => {
		expect(isItShortsWeather(20, 21, 804, 25)).toBe(false);
	});

	it('returns true when bad weather and warm enough', () => {
		expect(isItShortsWeather(24, 25, 500, 18)).toBe(true);
	});

	it('returns false when bad weather and not warm enough', () => {
		expect(isItShortsWeather(20, 21, 500, 18)).toBe(false);
	});

	it('uses tempMax when it is higher than temp', () => {
		expect(isItShortsWeather(15, 20, 800, 18)).toBe(true);
	});
});
