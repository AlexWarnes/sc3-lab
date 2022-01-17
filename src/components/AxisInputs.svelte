<script lang="ts">
import AxisIndicatorDot from "./AxisIndicatorDot.svelte";

	export let axisValues;
	export let type: 'number' | 'range';
	export let disabled = false;
</script>

{#if type === 'number'}
	<div class="input-section">
		<label class="row"
			>X
			<input class="x" type="number" bind:value={axisValues[0]} on:input {disabled} />			<AxisIndicatorDot axis="x"/>
		</label>
		<label class="row"
			>Y
			<input class="y" type="number" bind:value={axisValues[1]} on:input {disabled} />			<AxisIndicatorDot axis="y"/>
		</label>
		<label class="row"
			>Z
			<input class="z" type="number" bind:value={axisValues[2]} on:input {disabled} />			<AxisIndicatorDot axis="z"/>
		</label>
	</div>
{:else if type === 'range'}
	<!-- TODO: add corresponding number input boxes for rad input -->
	<div class="input-section">
		<label class="row range-label x"
			>X
			<input
				class="x"
				type="range"
				min="0"
				max={2 * Math.PI + 0.12}
				step={(2 * Math.PI) / 36}
				bind:value={axisValues[0]}
				on:input
				{disabled}
			/>
			<AxisIndicatorDot axis="x"/>
		</label>
		<label class="row range-label y"
			>Y
			<input
				class="y"
				type="range"
				min="0"
				max={2 * Math.PI + 0.12}
				step={(2 * Math.PI) / 36}
				bind:value={axisValues[1]}
				on:input
				{disabled}
			/>
			<AxisIndicatorDot axis="y"/>
		</label>
		<label class="row range-label z"
			>Z
			<input
				class="z"
				type="range"
				min="0"
				max={2 * Math.PI + 0.12}
				step={(2 * Math.PI) / 36}
				bind:value={axisValues[2]}
				on:input
				{disabled}
			/>
			<AxisIndicatorDot axis="z"/>
		</label>
	</div>
{/if}

<style>
	label.row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0.5rem 0;
	}

	input {
		border: none;
	}

	input[type='number'] {
		border-bottom: 2px solid transparent;
	}
	input[type='range'] {
		flex-grow: 1;
		margin: 0 .5rem;
	}

	/* input[type='number'].x {
		border-bottom: 2px solid red;
	} */
	input[type='number'].x:focus,
	input[type='number'].x:focus-visible {
		outline: 2px solid red;
	}
	/* input[type='number'].y {
		border-bottom: 2px solid limegreen;
	} */
	input[type='number'].y:focus,
	input[type='number'].y:focus-visible {
		outline: 2px solid limegreen;
	}
	/* input[type='number'].z {
		border-bottom: 2px solid blue;
	} */
	input[type='number'].z:focus,
	input[type='number'].z:focus-visible {
		outline: 2px solid blue;
	}
	.input-section {
		background: var(--canvas-overlay-hover);
		padding: 0.5rem 1rem;
		font-size: inherit;
	}


</style>
