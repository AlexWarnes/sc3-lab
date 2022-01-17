<script lang="ts">
	import type { LabCamera } from '../models/models';
	import { camera } from '../data/store';
	import Accordion from './Accordion.svelte';
	import AxisInputs from './AxisInputs.svelte';
	let positionOpen = false;
</script>

<form class="form-wrapper">
	<h3 class="form-title">CAMERA PROPERTIES</h3>
	<p class="warning">
		Changes to the camera will cause it to jump back to its original position if orbit controls are
		enabled.
	</p>
	<div class="prop-section-list">
		<div class="acc-wrapper">
			<Accordion
				open={positionOpen}
				on:click={() => (positionOpen = !positionOpen)}
				title="POSITION"
			>
				<AxisInputs bind:axisValues={$camera.position} type="number" />
			</Accordion>
		</div>

		<div class="input-wrapper">
			<label
				>Near
				<input type="number" bind:value={$camera.near} />
			</label>
		</div>
		<div class="input-wrapper">
			<label
				>Far
				<input type="number" bind:value={$camera.far} />
			</label>
		</div>
		{#if $camera.variant === 'PERSPECTIVE'}
			<div class="input-wrapper">
				<label
					>FOV
					<input type="number" bind:value={$camera.fov} />
				</label>
			</div>
		{:else if $camera.variant === 'ORTHOGRAPHIC'}
			<div class="input-wrapper">
				<label
					>Top
					<input type="number" bind:value={$camera.top} />
				</label>
			</div>
			<div class="input-wrapper">
				<label
					>Right
					<input type="number" bind:value={$camera.right} />
				</label>
			</div>
			<div class="input-wrapper">
				<label
					>Bottom
					<input type="number" bind:value={$camera.bottom} />
				</label>
			</div>
			<div class="input-wrapper">
				<label
					>Left
					<input type="number" bind:value={$camera.left} />
				</label>
			</div>
		{/if}
	</div>
</form>
