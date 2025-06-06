<script lang="ts">
	import SettingsForm from './SettingsForm.svelte';

	type Props = {
		closeModal: () => void;
	};

	const { closeModal }: Props = $props();
</script>

<div
	class="modal-backdrop"
	role="dialog"
	aria-modal="true"
	tabindex="-1"
	onkeydown={(e) => e.key === 'Escape' && closeModal()}
>
	<div class="modal">
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
		<div class="modal-header">
			<h2>Settings</h2>
		</div>

		<div class="modal-content">
			<SettingsForm onSubmit={closeModal} />
		</div>
	</div>
</div>

<style>
	.modal-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 1000;
	}

	.modal {
		background-color: var(--red);
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
		justify-content: center;
		align-items: center;
		margin-bottom: 1rem;
		position: relative;
	}

	h2 {
		margin: 0;
		color: var(--white);
		font-family: var(--font-primary);
		text-transform: uppercase;
		text-align: center;
		font-size: 4rem;
	}

	.close-button {
		background: none;
		border: none;
		cursor: pointer;
		color: var(--white);
		outline: green;
		height: 3.5rem;
		width: 3.5rem;
		padding: 0.5rem;
		position: absolute;
		top: 1rem;
		right: 0;
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
