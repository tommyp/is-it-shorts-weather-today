<script lang="ts">
	let isOpen = $state(false);

	function closeModal() {
		isOpen = false;
	}

	export function openModal() {
		isOpen = true;
	}
</script>

<div class="modal-backdrop" class:visible={isOpen} onclick={closeModal} aria-hidden={!isOpen}>
	<div class="modal">
		<div class="modal-header">
			<h2>Settings</h2>
			<button class="close-button" onclick={closeModal} aria-label="Close">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="size-6"
				>
					<path
						fill-rule="evenodd"
						d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>
		</div>
		<div class="modal-content">
			<slot />
		</div>
	</div>
</div>

<style>
	.modal-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: none;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}

	.modal-backdrop.visible {
		display: flex;
	}

	.modal {
		background-color: var(--black);
		border: 0.25rem solid var(--white);
		border-radius: 0.5rem;
		padding: 1.5rem;
		width: 90%;
		max-width: 500px;
		max-height: 90vh;
		overflow-y: auto;
	}

	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	h2 {
		margin: 0;
		color: var(--white);
		font-family: var(--font-primary);
	}

	.close-button {
		background: none;
		border: none;
		cursor: pointer;
		color: var(--white);
		padding: 0.5rem;
	}

	.close-button:hover {
		color: var(--orange);
	}

	.modal-content {
		color: var(--white);
	}

	@media (min-width: 576px) {
		.modal {
			padding: 2rem;
		}
	}
</style>
