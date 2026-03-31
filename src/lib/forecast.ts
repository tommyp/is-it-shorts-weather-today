import type { OnecallHourly } from './types';
import { isItShortsWeather } from './weather';

const endOfTodayUtc = (nowUtc: number, timezoneOffset: number): number => {
	const localNow = nowUtc + timezoneOffset;
	const startOfLocalDay = Math.floor(localNow / 86400) * 86400;
	return startOfLocalDay + 86400 - timezoneOffset;
};

export const findShortsTime = (
	hourly: OnecallHourly[],
	trigger: number,
	nowUtc: number,
	timezoneOffset: number
): number | null => {
	const todayEnd = endOfTodayUtc(nowUtc, timezoneOffset);

	for (const entry of hourly) {
		if (entry.dt <= nowUtc) continue;
		if (entry.dt >= todayEnd) break;
		if (isItShortsWeather(entry.temp, entry.temp, entry.weather[0].id, trigger)) {
			return entry.dt;
		}
	}

	return null;
};
