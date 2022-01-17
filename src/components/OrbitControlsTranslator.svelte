<script lang="ts">
	import * as SC from 'svelte-cubed';
	import { scale, fly } from 'svelte/transition';
	import ObjectPropEditor from './ObjectPropEditor.svelte';
	import { orbitControls, selectedObjects, targetPosition } from '../data/store';
	import type { Position } from 'svelte-cubed';
	import { sameVector3 } from '../data/utils';
	$: selected = $selectedObjects.length === 1 && $selectedObjects.includes($orbitControls.id);
	let target: Position = [0, 0, 0];
	$: if (!sameVector3($targetPosition, target)) {
		target = $targetPosition;
	}
</script>

{#if $orbitControls}
	<SC.OrbitControls
		enabled={$orbitControls.enabled}
		enableDamping={$orbitControls.enableDamping}
		dampingFactor={$orbitControls.dampingFactor}
		enableZoom={$orbitControls.enableZoom}
		autoRotate={$orbitControls.autoRotate}
		autoRotateSpeed={$orbitControls.autoRotateSpeed}
		{target}
	/>

	{#if selected}
		<div class="editor-wrapper" in:fly={{ x: -200 }} out:scale>
			<ObjectPropEditor sceneObj={$orbitControls} />
		</div>
	{/if}
{/if}
