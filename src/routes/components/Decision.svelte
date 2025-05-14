<script lang="ts">
	const { forecast } = $props();
</script>

<div>
	<h1>Decision</h1>
	<p>{forecast.name}</p>
	<p>{forecast.main.temp}°C</p>
</div>
