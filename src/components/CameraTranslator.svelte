<script lang="ts">
	import * as SC from 'svelte-cubed';
	import { scale, fly } from 'svelte/transition';
	import ObjectPropEditor from './ObjectPropEditor.svelte';
	import { camera, selectedObjects, targetPosition } from '../data/store';
	import type { Position } from 'svelte-cubed';
	import { sameVector3 } from '../data/utils';
	$: selected = $selectedObjects.length === 1 && $selectedObjects.includes($camera.id);
	let target: Position = [0, 0, 0];
	$: if (!sameVector3($targetPosition, target)) {
		target = $targetPosition;
	}
</script>

{#if $camera}
	{#if $camera.variant === 'PERSPECTIVE'}
		<SC.PerspectiveCamera
			position={$camera.position}
			near={$camera.near}
			far={$camera.far}
			fov={$camera.fov}
		/>
	{:else if $camera.variant === 'ORTHOGRAPHIC'}
		<SC.OrthographicCamera
			near={$camera.near}
			far={$camera.far}
			top={$camera.top}
			right={$camera.right}
			bottom={$camera.bottom}
			left={$camera.left}
		/>
	{/if}

	<!-- TODO: Anything helpful for hover/selected? -->

	{#if selected}
		<div class="editor-wrapper" in:fly={{ x: -200 }} out:scale>
			<ObjectPropEditor sceneObj={$camera} />
		</div>
	{/if}
{/if}
