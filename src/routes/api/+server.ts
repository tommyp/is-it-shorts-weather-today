import { OPENWEATHER_API_KEY } from '$env/static/private';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const url = 'https://api.openweathermap.org/data/2.5/weather';

	const { units, location, lat, lon } = await request.json();

	const params = new URLSearchParams({
		units: units || 'metric',
		appid: OPENWEATHER_API_KEY
	});

	if (location) {
		params.set('q', location.replace('%20', ' '));
	} else if (lat && lon) {
		params.set('lat', lat);
		params.set('lon', lon);
	}

	try {
		const resp = await fetch(`${url}?${params}`);

		if (!resp.ok) {
			throw new Error('Failed to fetch weather data');
		}

		const data = await resp.json();
		return new Response(JSON.stringify(data));
	} catch (error) {
		console.error('Error fetching weather data:', error);
		return new Response(JSON.stringify({ error: 'Failed to fetch weather data' }), { status: 500 });
	}
};
