<script lang="ts">
	import { canvas } from '../data/store';
	import Accordion from './Accordion.svelte';
	// let backgroundOpen = false;
	const handleColorChange = (event) => {
		$canvas.background.set(event.target.value);
		$canvas = $canvas;
	};
</script>

<form class="form-wrapper">
	<h3 class="form-title">CANVAS PROPERTIES</h3>
	<p class="warning">
		Changes to the canvas will jump the camera back to its original position if orbit controls are
		enabled.
	</p>
	<div class="prop-section-list">
		<!-- <div class="acc-wrapper">
			<Accordion
			open={backgroundOpen}
			on:click={() => (backgroundOpen = !backgroundOpen)}
			title="BACKGROUND"
			>
			<div class="input-wrapper">
				
				TODO: backgroundType: COLOR/IMAGE
				imgSrc
				stars
				sky
				...etc
			</div>
	
			</Accordion>
		</div> -->
		<div class="input-wrapper">
			<label
				>Color
				<input
					type="color"
					value={`#${$canvas.background.getHexString()}`}
					on:change={handleColorChange}
				/>
			</label>
		</div>

		<div class="input-wrapper">
			<label
				>Shadows
				<input type="checkbox" bind:checked={$canvas.shadows} />
			</label>
		</div>
		<div class="input-wrapper">
			<label
				>Antialias
				<input type="checkbox" bind:checked={$canvas.antialias} />
			</label>
		</div>
		<div class="input-wrapper">
			<label
				>Physically Correct Lights
				<input type="checkbox" bind:checked={$canvas.physicallyCorrectLights} />
			</label>
		</div>
	</div>
</form>
