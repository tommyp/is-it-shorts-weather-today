<script lang="ts">
	import { fahrenheitToCelsius } from '$lib/utils';

	const { onSubmit } = $props();

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
		onSubmit();
	}
</script>

<form class="settings-form" onsubmit={handleSubmit}>
	<div class="form-group temperature-unit">
		<h3>Temperature Unit</h3>
		<div class="form-control">
			<div class="radio-group">
				<label>
					<input type="radio" name="unit" value="celsius" bind:group={unit} />
					C
				</label>
				<label>
					<input type="radio" name="unit" value="fahrenheit" bind:group={unit} />
					F
				</label>
			</div>
		</div>
	</div>

	<div class="form-group trigger-temp">
		<h3>Bare leg minimum</h3>
		<div class="form-control">
			<input
				type="number"
				bind:value={trigger}
				min={unit === 'celsius' ? -10 : 14}
				max={unit === 'celsius' ? 40 : 104}
				name="trigger"
				required
			/>
			<span class="unit-label">°{unit === 'celsius' ? 'Celsius' : 'Fahrenheit'}</span>
		</div>
	</div>

	<button type="submit">Save Settings</button>
</form>

<style>
	.settings-form {
		color: var(--white);
		font-family: var(--font-primary);
		border: 0.25rem solid var(--white);
		border-radius: 0.5rem;
		display: flex;
		flex-direction: column;
	}

	h3 {
		font-size: 1.5rem;
		padding: 0.5rem 0;
		text-transform: uppercase;
		background: var(--white);
		color: var(--red);
		text-align: center;
	}

	.temperature-unit,
	.trigger-temp {
		border-bottom: 0.25rem solid var(--white);
	}

	.radio-group {
		display: grid;
		grid-template-columns: 1fr 1fr;
		width: 100%;
	}

	.radio-group label {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem 0;
		width: 100%;
	}

	.radio-group label:first-of-type {
		border-right: 0.25rem solid var(--white);
	}

	label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		text-transform: uppercase;
	}

	.temperature-unit {
		font-size: 2.5rem;
	}

	.trigger-temp .form-control {
		display: grid;
		grid-template-columns: 4rem auto;
		text-transform: uppercase;
	}

	input[type='radio'] {
		display: none;
	}

	label:has(input[type='radio']:checked) {
		background: var(--orange);
		color: var(--white);
	}

	input[type='number'] {
		background: none;
		padding: 0.5rem;
		border-radius: 0.5rem;
		color: var(--white);
		font-family: var(--font-primary);
		font-size: 2.5rem;
		outline: none;
		border: none;
		padding: 0.75rem 0 0.5rem 0.5rem;
		width: 3.5rem;
	}

	input[type='number']:focus {
		outline: none;
		border-color: var(--orange);
	}

	.unit-label {
		background: var(--white);
		color: var(--red);
		display: flex;
		align-items: center;
		padding: 0.75rem 0 0.5rem 0.5rem;
		font-size: 2rem;
	}

	button {
		background: transparent;
		border: none;
		text-transform: uppercase;
		color: var(--white);
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
