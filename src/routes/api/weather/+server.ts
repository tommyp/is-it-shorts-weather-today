import { OPENWEATHER_API_KEY } from '$env/static/private';
import type { RequestHandler } from '@sveltejs/kit';
import { error, isHttpError, json } from '@sveltejs/kit';

interface WeatherRequest {
	location?: string;
	lat?: number;
	lon?: number;
}

const GEO_API_URL = 'https://api.openweathermap.org/geo/1.0';
const ONECALL_API_URL = 'https://api.openweathermap.org/data/3.0/onecall';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = (await request.json()) as WeatherRequest;

		if (!body.location && (body.lat === undefined || body.lon === undefined)) {
			throw error(400, 'Either location or both lat/lon are required');
		}

		let lat: number;
		let lon: number;
		let name: string;

		if (body.location) {
			const params = new URLSearchParams({
				q: body.location.trim().replace(/\s+/g, ' '),
				limit: '1',
				appid: OPENWEATHER_API_KEY
			});

			const geoRes = await fetch(`${GEO_API_URL}/direct?${params}`);
			if (!geoRes.ok) throw error(geoRes.status, 'Geocoding failed');

			const geoData = await geoRes.json();
			if (!geoData.length) throw error(404, 'Location not found');

			lat = geoData[0].lat;
			lon = geoData[0].lon;
			name = geoData[0].name;
		} else {
			lat = body.lat!;
			lon = body.lon!;

			const params = new URLSearchParams({
				lat: lat.toString(),
				lon: lon.toString(),
				limit: '1',
				appid: OPENWEATHER_API_KEY
			});

			const revRes = await fetch(`${GEO_API_URL}/reverse?${params}`);

			if (revRes.ok) {
				const revData = await revRes.json();

				name = revData.length ? revData[0].name : `${lat}, ${lon}`;
			} else {
				name = `${lat}, ${lon}`;
			}
		}

		const onecallParams = new URLSearchParams({
			lat: lat.toString(),
			lon: lon.toString(),
			exclude: 'minutely,alerts',
			units: 'metric',
			appid: OPENWEATHER_API_KEY
		});

		const weatherRes = await fetch(`${ONECALL_API_URL}?${onecallParams}`);

		if (!weatherRes.ok) {
			const errorData = await weatherRes.json().catch(() => null);
			throw error(weatherRes.status, errorData?.message || 'Failed to fetch weather data');
		}

		const data = await weatherRes.json();

		return json({
			current: data.current,
			hourly: data.hourly,
			name,
			tempMax: data.daily[0].temp.max,
			timezoneOffset: data.timezone_offset
		});
	} catch (err) {
		if (isHttpError(err)) {
			if (err.status === 404) {
				return error(404, { message: 'Location not found' });
			}
			throw err;
		}
		return error(500, 'Internal server error');
	}
};
