export function celsiusToFahrenheit(celsius: number): number {
	return Math.round((celsius * 9) / 5 + 32);
}

export function fahrenheitToCelsius(fahrenheit: number): number {
	return Math.round(((fahrenheit - 32) * 5) / 9);
}

export const renderName = (result: { name: string; country: string; state?: string }) => {
	return result.name + (result.state ? `, ${result.state}` : '') + `, ${result.country}`;
};
