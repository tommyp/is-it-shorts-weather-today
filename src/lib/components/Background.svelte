<script lang="ts">
	import { onMount } from 'svelte';
	import { Tween } from 'svelte/motion';
	const { status = 'warm' } = $props();

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

	const warmColors = {
		color1: { h: 0, s: 100, l: 65 },
		color2: { h: 30, s: 100, l: 65 },
		color3: { h: 51, s: 100, l: 50 },
		color4: { h: 33, s: 100, l: 50 },
		color5: { h: 41, s: 77, l: 52 },
		color6: { h: 45, s: 100, l: 50 }
	};

	const coldColors = {
		color1: { h: 200, s: 100, l: 65 },
		color2: { h: 230, s: 100, l: 65 },
		color3: { h: 251, s: 100, l: 50 },
		color4: { h: 233, s: 100, l: 50 },
		color5: { h: 241, s: 77, l: 52 },
		color6: { h: 245, s: 100, l: 50 }
	};

	const tweenColor = new Tween(status === 'warm' ? warmColors : coldColors, { duration: 500 });

	$effect(() => {
		tweenColor.target = status === 'warm' ? warmColors : coldColors;
	});
</script>

<div
	class="background"
	style={`
		--position-x: ${tweenX.current}%;
		--position-y: ${tweenY.current}%;
		--color-1: hsl(${tweenColor.current.color1.h}, ${tweenColor.current.color1.s}%, ${tweenColor.current.color1.l}%);
		--color-2: hsl(${tweenColor.current.color2.h}, ${tweenColor.current.color2.s}%, ${tweenColor.current.color2.l}%);
		--color-3: hsl(${tweenColor.current.color3.h}, ${tweenColor.current.color3.s}%, ${tweenColor.current.color3.l}%);
		--color-4: hsl(${tweenColor.current.color4.h}, ${tweenColor.current.color4.s}%, ${tweenColor.current.color4.l}%);
		--color-5: hsl(${tweenColor.current.color5.h}, ${tweenColor.current.color5.s}%, ${tweenColor.current.color5.l}%);
		--color-6: hsl(${tweenColor.current.color6.h}, ${tweenColor.current.color6.s}%, ${tweenColor.current.color6.l}%);
	`}
></div>

<style>
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
