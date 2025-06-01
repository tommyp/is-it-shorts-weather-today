<script lang="ts">
	import { fahrenheitToCelsius } from '$lib/utils';

	let unit = $state('celsius');
	let trigger = $state(20);
	const setTrigger = (value: number) => {
		if (unit === 'celsius') {
			trigger = value;
		} else {
			trigger = fahrenheitToCelsius(value);
		}
	};

	// Load saved settings on component mount
	$effect(() => {
		const savedSettings = localStorage.getItem('weatherSettings');
		if (savedSettings) {
			const { unit: savedUnit, trigger: savedTrigger } = JSON.parse(savedSettings);
			unit = savedUnit;
			trigger = savedTrigger;
		}
	});

	function handleSubmit(e: Event) {
		e.preventDefault();
		const settings = {
			unit,
			trigger
		};
		localStorage.setItem('weatherSettings', JSON.stringify(settings));
	}
</script>

<form class="settings-form" onsubmit={handleSubmit}>
	<div class="temperature-unit">
		<h3>Temperature Unit</h3>
		<div class="radio-group">
			<label>
				<input type="radio" name="unit" value="celsius" bind:group={unit} />
				Celsius
			</label>
			<label>
				<input type="radio" name="unit" value="fahrenheit" bind:group={unit} />
				🇺🇸
			</label>
		</div>
	</div>

	<div class="trigger-temp">
		<h3>Shorts Weather Trigger Temperature</h3>
		<input
			type="number"
			bind:value={trigger}
			min={unit === 'celsius' ? -10 : 14}
			max={unit === 'celsius' ? 40 : 104}
		/>
		<span>°{unit === 'celsius' ? 'C' : 'F'}</span>
	</div>

	<button type="submit">Save Settings</button>
</form>

<style>
	.settings-form {
		color: var(--white);
		font-family: var(--font-primary);
	}

	h3 {
		font-size: 1.2rem;
		margin-bottom: 0.5rem;
	}

	.temperature-unit,
	.trigger-temp {
		margin-bottom: 1.5rem;
	}

	.radio-group {
		display: flex;
		gap: 1rem;
	}

	label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	input[type='number'] {
		background: none;
		border: 0.25rem solid var(--white);
		border-radius: 0.5rem;
		color: var(--white);
		font-family: var(--font-primary);
		font-size: 1.2rem;
		padding: 0.5rem;
		width: 5rem;
	}

	input[type='number']:focus {
		outline: none;
		border-color: var(--orange);
	}

	button {
		background: var(--white);
		border: none;
		border-radius: 0.5rem;
		color: var(--red);
		cursor: pointer;
		font-family: var(--font-primary);
		font-size: 1.2rem;
		padding: 0.75rem 1.5rem;
		transition: background-color 0.2s ease;
	}

	button:hover {
		background: var(--orange);
		color: var(--white);
	}
</style>
