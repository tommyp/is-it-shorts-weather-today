import { describe, it, expect } from 'vitest';
import { findShortsTime } from './forecast';
import type { OnecallHourly } from './types';

const makeHourly = (dt: number, temp: number, code: number): OnecallHourly => ({
	dt,
	temp,
	feels_like: temp - 2,
	pressure: 1013,
	humidity: 50,
	weather: [{ id: code, main: 'Clear', description: 'clear sky', icon: '01d' }],
	clouds: 0,
	pop: 0
});

// nowUtc = 2024-01-01 12:00 UTC, timezoneOffset = 3600 (UTC+1)
// local time = 13:00, end of local day = 2024-01-01 23:00 UTC
const nowUtc = 1704110400;
const timezoneOffset = 3600;

describe('findShortsTime', () => {
	it('returns null when no entries are warm enough today', () => {
		const hourly = [
			makeHourly(nowUtc + 3600, 10, 800),
			makeHourly(nowUtc + 7200, 12, 800)
		];
		expect(findShortsTime(hourly, 18, nowUtc, timezoneOffset)).toBeNull();
	});

	it('returns the first qualifying hour', () => {
		const hour1 = nowUtc + 3600;
		const hour2 = nowUtc + 7200;
		const hourly = [makeHourly(hour1, 10, 800), makeHourly(hour2, 20, 800)];
		expect(findShortsTime(hourly, 18, nowUtc, timezoneOffset)).toBe(hour2);
	});

	it('skips entries in the past', () => {
		const past = nowUtc - 3600;
		const future = nowUtc + 3600;
		const hourly = [makeHourly(past, 25, 800), makeHourly(future, 20, 800)];
		expect(findShortsTime(hourly, 18, nowUtc, timezoneOffset)).toBe(future);
	});

	it('stops at end of local day', () => {
		// end of local day = nowUtc + 11h = 23:00 UTC = local midnight
		const endOfToday = nowUtc + 11 * 3600;
		const hourly = [makeHourly(endOfToday, 25, 800)];
		expect(findShortsTime(hourly, 18, nowUtc, timezoneOffset)).toBeNull();
	});

	it('includes entry just before end of local day', () => {
		const lastHour = nowUtc + 10 * 3600; // 22:00 UTC = 23:00 local
		const hourly = [makeHourly(lastHour, 25, 800)];
		expect(findShortsTime(hourly, 18, nowUtc, timezoneOffset)).toBe(lastHour);
	});

	it('returns null for empty hourly', () => {
		expect(findShortsTime([], 18, nowUtc, timezoneOffset)).toBeNull();
	});
});
