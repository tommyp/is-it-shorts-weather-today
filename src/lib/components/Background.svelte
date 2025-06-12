<script lang="ts">
	import { onMount } from 'svelte';
	import { Tween } from 'svelte/motion';

	const duration = 5000;

	const tweenX = new Tween(Math.random() * 100, { duration });
	const tweenY = new Tween(Math.random() * 100, { duration });

	onMount(() => {
		tweenX.target = Math.random() * 100;
		tweenY.target = Math.random() * 100;

		setInterval(() => {
			const targets = {
				x: Math.random() * 100,
				y: Math.random() * 100
			};
			// console.log(targets);
			tweenX.target = targets.x;
			tweenY.target = targets.y;
		}, duration);
	});
</script>

<div
	class="background"
	style={`--position-x: ${tweenX.current}%; --position-y: ${tweenY.current}%`}
></div>

<style>
	:root {
		--color-1: #ff4d4d; /* Bright red */
		--color-2: #ffa64d; /* Orange */
		--color-3: #ffd700; /* Gold */
		--color-4: #ff8c00; /* Dark orange */
		--color-5: #e4a328; /* Yellow */
		--color-6: #ffb300; /* Green */
	}

	.background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		overflow: hidden;

		background-image:
			radial-gradient(at 52% 0%, var(--color-1) 0px, transparent 50%),
			radial-gradient(at 81% 32%, var(--color-2) 0px, transparent 50%),
			radial-gradient(
				at calc(100% - var(--position-y)) calc(100% - var(--position-x)),
				var(--color-1) 0px,
				transparent 50%
			),
			radial-gradient(at 25% 4%, var(--color-3) 0px, transparent 50%),
			radial-gradient(at var(--position-x) var(--position-y), var(--color-2) 0px, transparent 50%),
			radial-gradient(at 51% 90%, var(--color-4) 0px, transparent 50%),
			radial-gradient(
				at calc(100% - var(--position-x)) calc(100% - var(--position-y)),
				var(--color-3) 0px,
				transparent 50%
			),
			radial-gradient(
				at calc(100% - var(--position-x)) calc(100% - var(--position-y)),
				var(--color-6) 0px,
				transparent 50%
			);
	}
</style>
