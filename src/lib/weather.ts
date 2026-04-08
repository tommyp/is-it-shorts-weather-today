const isWarmEnough = (trigger: number, tempMax: number, temp: number) => {
	if (tempMax >= trigger) return true;
	if (temp >= trigger) return true;
	return false;
};

const conditions = {
	clear: 800,
	clouds: [801, 802, 803],
	haze: [711, 721, 731, 751, 761, 762]
};

const isItShortsWeather = (temp: number, tempMax: number, code: number, trigger: number): boolean => {
	if (code === conditions.clear || conditions.clouds.includes(code)) {
		return isWarmEnough(trigger, tempMax, temp);
	}

	if (code === 804) {
		const t = trigger > 21 ? trigger : 21;
		return isWarmEnough(t, tempMax, temp);
	}

	if (conditions.haze.includes(code)) {
		const t = trigger > 20 ? trigger : 20;
		return isWarmEnough(t, tempMax, temp);
	}

	const t = trigger > 23 ? trigger : 23;
	return isWarmEnough(t, tempMax, temp);
};

export { isItShortsWeather };
