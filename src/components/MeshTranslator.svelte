<script lang="ts">
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';
	import { fly, scale } from 'svelte/transition';
	import ObjectPropEditor from './ObjectPropEditor.svelte';
	import type { LabMesh } from '../models/models';
	import { selectedObjects } from '../data/store';

	export let idx: number;
	export let mesh: LabMesh;
	$: selected = $selectedObjects.length === 1 && $selectedObjects.includes(mesh.id);
</script>

{#if mesh}
	<SC.Mesh
		geometry={mesh.geometry}
		material={mesh.material}
		position={mesh.position}
		rotation={mesh.rotation}
		scale={mesh.scale}
		castShadow={mesh.castShadow}
		receiveShadow={mesh.receiveShadow}
	/>
	{#if selected}
		<SC.Primitive object={new THREE.AxesHelper(mesh.scale[0] + 2)} position={mesh.position} />
		<!-- {:else if mesh.isHovered}
	<SC.Primitive
		object={new THREE.AxesHelper(mesh.scale[0] + 2).setColors(
			new THREE.Color(0x161616),
			new THREE.Color(0x161616),
			new THREE.Color(0x161616)
		)}
		position={[0, 0, 0]}
	/> -->
	{/if}

	<!-- MESH Control Panel only appears when mesh isSelected -->
	{#if selected}
		<div class="editor-wrapper" in:fly={{x: -200}} out:scale>
			<ObjectPropEditor sceneObj={mesh} />
		</div>
	{/if}
{/if}
