import { expect, test } from 'vitest';
import { celsiusToFahrenheit, fahrenheitToCelsius } from './utils';

test('celsiusToFahrenheit', () => {
	expect(celsiusToFahrenheit(0)).toBe(32);
	expect(celsiusToFahrenheit(100)).toBe(212);

	expect(celsiusToFahrenheit(18)).toBe(64);
	expect(celsiusToFahrenheit(20)).toBe(68);
	expect(celsiusToFahrenheit(25)).toBe(77);
	expect(celsiusToFahrenheit(28)).toBe(82);
	expect(celsiusToFahrenheit(30)).toBe(86);
	expect(celsiusToFahrenheit(32)).toBe(90);
	expect(celsiusToFahrenheit(35)).toBe(95);
});

test('fahrenheitToCelsius', () => {
	expect(fahrenheitToCelsius(32)).toBe(0);
	expect(fahrenheitToCelsius(212)).toBe(100);

	expect(fahrenheitToCelsius(64.4)).toBe(18);
	expect(fahrenheitToCelsius(68)).toBe(20);
	expect(fahrenheitToCelsius(77)).toBe(25);
	expect(fahrenheitToCelsius(82.4)).toBe(28);
	expect(fahrenheitToCelsius(86)).toBe(30);
	expect(fahrenheitToCelsius(89.6)).toBe(32);
	expect(fahrenheitToCelsius(95)).toBe(35);
});
