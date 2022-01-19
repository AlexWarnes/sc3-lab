<script>
	import { helperSettings, orbitControls } from '../data/store';
	import BackgroundLoading from './BackgroundLoading.svelte';
</script>

<!-- HELPERS -->
<div class="helpers-box">
	<div class="input-box">
		{#if $helperSettings.showControls}
			<label
				>Axes
				<input type="checkbox" bind:checked={$helperSettings.showAxes} />
			</label>
			<label
				>Grid
				<input type="checkbox" bind:checked={$helperSettings.showGrid} />
			</label>
			<label
				>Orbit Controls
				<input type="checkbox" bind:checked={$orbitControls.enabled} />
			</label>
		{/if}

		<label
			>Show Interface
			<input type="checkbox" bind:checked={$helperSettings.showControls} />
		</label>
	</div>
	<BackgroundLoading />
</div>

<style>
	.helpers-box {
		padding: 1rem;
		background-color: var(--canvas-overlay);
		border-radius: 2px;
		color: #fafbfc;
	}

	p {
		margin: 0 0 1rem;
	}

	.input-box {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	label {
		font-size: 0.75rem;
		margin: 0 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	button.show {
		width: 3rem;
		height: 3rem;
		border: none;
		background: var(--canvas-overlay);
		color: #fafbfc;
		border-radius: 50%;
		padding: 0.75rem;
		cursor: pointer;
	}

	button.show:hover {
		background-color: var(--canvas-overlay-hover);
	}
</style>
