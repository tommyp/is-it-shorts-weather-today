<script lang="ts">
	export let onclick: () => void;
</script>

<button {onclick}>
	<slot />
</button>

<style>
	button {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-left: 0.5rem;
	}
</style>
