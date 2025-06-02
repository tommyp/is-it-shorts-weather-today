<script lang="ts" module>
	import { Tween } from 'svelte/motion';
</script>

<div class="background"></div>

<style>
	:root {
		--color-1: #ff4d4d; /* Bright red */
		--color-2: #ffa64d; /* Orange */
		--color-3: #ffd700; /* Gold */
		--color-4: #ff8c00; /* Dark orange */
	}

	.background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		overflow: hidden;
		animation: moveGradient 20s ease-in-out infinite;

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
			);
	}

	@keyframes moveGradient {
		0% {
			--position-x: 25%;
			--position-y: -25%;
		}
		25% {
			--position-x: 75%;
			--position-y: 25%;
		}
		50% {
			--position-x: 25%;
			--position-y: 75%;
		}
		75% {
			--position-x: 75%;
			--position-y: 25%;
		}
		100% {
			--position-x: 25%;
			--position-y: -25%;
		}
	}
</style>
