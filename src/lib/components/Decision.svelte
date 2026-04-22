<script lang="ts">
	import { celsiusToFahrenheit } from '$lib/utils';
	import { isItShortsWeather } from '$lib/weather';
	import { findShortsTime } from '$lib/forecast';
	import type { WeatherResponse } from '$lib/types';

	interface Props {
		data: WeatherResponse | null;
		settings: {
			unit: string;
			trigger: number;
		};
		error?: string;
	}

	const { data, settings, error }: Props = $props();

	let condition = $derived(data?.current.weather[0].main ?? '');
	let isCurrentShorts = $derived(
		data
			? isItShortsWeather(
					data.current.temp,
					data.current.temp,
					data.current.weather[0].id,
					settings.trigger
				)
			: false
	);

	let shortsAt = $derived(
		data && !isCurrentShorts
			? findShortsTime(
					data.hourly,
					settings.trigger,
					Math.floor(Date.now() / 1000),
					data.timezoneOffset
				)
			: null
	);

	let isShorts = $derived(isCurrentShorts || shortsAt !== null);

	let shortsAtEntry = $derived(
		shortsAt !== null ? data?.hourly.find((h) => h.dt === shortsAt) : undefined
	);

	let unit = $derived(settings.unit === 'celsius' ? 'C' : 'F');

	const formatTemp = (celsius: number) =>
		settings.unit === 'celsius' ? Math.round(celsius) : celsiusToFahrenheit(celsius);

	const formatTime = (dt: number): string => {
		if (!data) return '';
		const localMs = (dt + data.timezoneOffset) * 1000;
		const d = new Date(localMs);
		let hours = d.getUTCHours();
		const ampm = hours >= 12 ? 'pm' : 'am';
		hours = hours % 12 || 12;
		return `${hours}${ampm}`;
	};
</script>

{#if error}
	<div class="error">
		<h1>{error}</h1>
	</div>
{:else}
	<div>
		<h1>{isShorts ? 'yes' : 'no'}</h1>
		{#if shortsAt !== null && shortsAtEntry}
			<p>
				{formatTemp(data!.current.temp)}°{unit} / {condition} now
			</p>
			<p>
				{formatTemp(shortsAtEntry.temp)}°{unit} / {shortsAtEntry.weather[0].main} from {formatTime(
					shortsAt
				)}
			</p>
		{:else}
			<p>{formatTemp(data?.current.temp ?? 0)}°{unit} / {condition}</p>
		{/if}
	</div>
{/if}

<style>
	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		color: var(--white);
	}
	h1 {
		line-height: 0.9;
		margin-bottom: -0.5rem;
		font-size: 8rem;
		text-transform: uppercase;
		text-align: center;
		text-wrap: balance;
		text-shadow:
			1px 1px 0 var(--red),
			2px 2px 0 var(--red),
			3px 3px 0 var(--red),
			4px 4px 0 var(--red),
			5px 5px 0 var(--red);
	}

	p {
		font-size: 2rem;
		text-transform: uppercase;
		margin-bottom: 0.5rem;
	}

	.error h1 {
		font-size: 6rem;
	}

	@media (min-width: 768px) {
		h1 {
			font-size: 16rem;
			margin-bottom: -2rem;
		}
		.error h1 {
			font-size: 8rem;
		}
	}
</style>
