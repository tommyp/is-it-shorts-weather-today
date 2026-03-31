interface Weather {
	id: number;
	main: string;
	description: string;
	icon: string;
}

export interface OnecallCurrent {
	dt: number;
	sunrise: number;
	sunset: number;
	temp: number;
	feels_like: number;
	pressure: number;
	humidity: number;
	visibility: number;
	wind_speed: number;
	wind_deg: number;
	weather: Weather[];
	clouds: number;
}

export interface OnecallHourly {
	dt: number;
	temp: number;
	feels_like: number;
	pressure: number;
	humidity: number;
	weather: Weather[];
	clouds: number;
	pop: number;
}

export interface WeatherResponse {
	current: OnecallCurrent;
	hourly: OnecallHourly[];
	name: string;
	tempMax: number;
	timezoneOffset: number;
}
