<script lang="ts">
	import { canvas, orbitControls } from '../data/store';
	import Accordion from './Accordion.svelte';
	// let backgroundOpen = false;
	const handleColorChange = (event) => {
		$canvas.background.set(event.target.value);
		$canvas = $canvas;
	};
</script>

<form class="form-wrapper">
	<h3 class="form-title">ORBIT CONTROLS</h3>
	<!-- <p class="warning">
		Changes to the canvas will jump the camera back to its original position if orbit controls are
		enabled.
	</p> -->
	<div class="prop-section-list">
		<div class="input-wrapper">
			<label
				>Enabled
				<input type="checkbox" bind:checked={$orbitControls.enabled} />
			</label>
		</div>
		<div class="input-wrapper">
			<label
				>Enable Zoom
				<input type="checkbox" bind:checked={$orbitControls.enableZoom} />
			</label>
		</div>
		<div class="input-wrapper">
			<label
				>Auto Rotate
				<input type="checkbox" bind:checked={$orbitControls.autoRotate} />
			</label>
		</div>
		<div class="input-wrapper">
			<label
				>Auto Rotate Speed
				<input
					type="number"
					disabled={!$orbitControls.autoRotate}
					min="-50"
					max="50"
					step="0.5"
					bind:value={$orbitControls.autoRotateSpeed}
				/>
			</label>
		</div>
		<div class="input-wrapper">
			<label
				>Enable Damping
				<input type="checkbox" bind:checked={$orbitControls.enableDamping} />
			</label>
		</div>
		<div class="input-wrapper">
			<label
				>Damping Factor
				<input
					type="number"
					disabled={!$orbitControls.enableDamping}
					min="0"
					max="1"
					step="0.05"
					bind:value={$orbitControls.dampingFactor}
				/>
			</label>
		</div>
	</div>
</form>
