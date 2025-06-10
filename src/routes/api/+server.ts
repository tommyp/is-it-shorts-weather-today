import { OPENWEATHER_API_KEY } from '$env/static/private';
import type { RequestHandler } from '@sveltejs/kit';
import { error, isHttpError, json } from '@sveltejs/kit';

interface WeatherRequest {
	units?: 'metric' | 'imperial' | 'standard';
	location?: string;
	lat?: number;
	lon?: number;
}

export const POST: RequestHandler = async ({ request }) => {
	const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

	try {
		const body = (await request.json()) as WeatherRequest;

		// Validate required parameters
		if (!body.location && (!body.lat || !body.lon)) {
			throw error(400, 'Either location or both lat/lon coordinates are required');
		}

		// Validate units
		const validUnits = ['metric', 'imperial', 'standard'];
		const units = body.units && validUnits.includes(body.units) ? body.units : 'metric';

		const params = new URLSearchParams({
			units,
			appid: OPENWEATHER_API_KEY
		});

		// Set location parameters
		if (body.location) {
			params.set('q', body.location.trim().replace(/\s+/g, ' '));
		} else {
			params.set('lat', body.lat!.toString());
			params.set('lon', body.lon!.toString());
		}

		const response = await fetch(`${WEATHER_API_URL}?${params}`);

		// console.log(response);

		if (!response.ok) {
			const errorData = await response.json().catch(() => null);
			throw error(response.status, errorData?.message || 'Failed to fetch weather data');
		}

		const data = await response.json();
		return json(data);
	} catch (err) {
		// if (err instanceof Response) {
		// 	throw err;
		// }
		if (isHttpError(err) && err.status === 404) {
			return error(404, {
				message: 'Location not found'
			});
		} else {
			return error(500, 'Internal server error');
		}
	}
};
