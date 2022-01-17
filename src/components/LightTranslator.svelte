<script lang="ts">
	import * as SC from 'svelte-cubed';
	import { scale, fly } from 'svelte/transition';
	import ObjectPropEditor from './ObjectPropEditor.svelte';
	import type { LabLight } from '../models/models';
	import { selectedObjects } from '../data/store';

	export let idx: number;
	export let light: LabLight;
	$: selected = $selectedObjects.length === 1 && $selectedObjects.includes(light.id);
</script>

{#if light}
	{#if light.variant === 'AMBIENT'}
		<SC.AmbientLight color={light.color} intensity={light.intensity} />
	{:else if light.variant === 'DIRECTIONAL'}
		<SC.DirectionalLight
			color={light.color}
			position={light.position}
			intensity={light.intensity}
			shadow={light.shadow}
		/>
	{:else if light.variant === 'HEMISPHERE'}
		<!-- TODO: HemisphereLight throwing ts error with: groundColor={light.groundColor} -->
		<SC.HemisphereLight
			color={light.color}
			intensity={light.intensity}
			groundColor={light.groundColor.getHex()}
		/>
	{/if}
	<!-- TODO: Anything helpful for hover/selected? -->

	{#if selected}
		<div class="editor-wrapper" in:fly={{x: -200}} out:scale>
			<ObjectPropEditor sceneObj={light} />
		</div>
	{/if}
{/if}
