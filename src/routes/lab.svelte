<script lang="ts">
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';
	import { sceneObjects, helperSettings, camera } from '../data/store';
	import { onMount } from 'svelte';
	import type { StaticTextures } from '../models/models';
	// import { handleKeydown, handleKeyup } from '../data/hotkeys';
	import HelperToggles from '../components/HelperToggles.svelte';
	import SceneGraphList from '../components/SceneGraphList.svelte';
	import MeshTranslator from '../components/MeshTranslator.svelte';
	import CanvasTranslator from '../components/CanvasTranslator.svelte';
	import LightTranslator from '../components/LightTranslator.svelte';
	import GLTFTranslator from '../components/GLTFTranslator.svelte';
	import CameraTranslator from '../components/CameraTranslator.svelte';
	import OrbitControlsTranslator from '../components/OrbitControlsTranslator.svelte';
	import CodeTranslator from '../components/CodeTranslator.svelte';

	// async function loadTextures(): Promise<THREE.Texture[]> {
	// 	// create a texture loader.
	// 	const textureLoader = new THREE.TextureLoader();

	// 	// load a texture
	// 	return Promise.all([
	// 		textureLoader.loadAsync('/assets/textures/uv-test-col.png'),
	// 		textureLoader.loadAsync('/assets/textures/uv-test-bw.jpg')
	// 	]);
	// }
	// let textures: StaticTextures | null = null;
	// onMount(() => {
	// 	loadTextures().then(([uvColor, uvBW]) => {
	// 		textures = { uvColor, uvBW };
	// 	});
	// });
</script>

<div class="lab-container">
	{#if $sceneObjects}
		<div class="canvas-wrapper">
			<CanvasTranslator>
				<CameraTranslator />
				<OrbitControlsTranslator />
				{#each $sceneObjects as obj, idx (obj.id)}
					{#if obj.type === 'MESH'}
						<MeshTranslator mesh={obj} {idx} />
					{:else if obj.type === 'LIGHT'}
						<LightTranslator light={obj} {idx} />
					{:else if obj.type === 'GLTF'}
						<GLTFTranslator gltf={obj} {idx} />
					{/if}
				{/each}

				<!-- TODO: 
						controls.update() must be called after any manual changes to the camera's transform
						per: https://threejs.org/docs/#examples/en/controls/OrbitControls 
						or short-term "Alert: When orbit controls are enabled, editing camera properties will reset the camera's position."
					-->
				{#if $helperSettings.showAxes}
					<SC.Primitive object={new THREE.AxesHelper($camera.far / 4)} position={[0, 0.005, 0]} />
				{/if}
				{#if $helperSettings.showGrid}
					<SC.Primitive
						object={new THREE.GridHelper($camera.far / 2, $camera.far / 2)}
						position={[0, 0.001, 0]}
					/>
				{/if}
			</CanvasTranslator>
		</div>
		{#if $helperSettings.showControls}
			<div class="scene-graph-wrapper">
				<SceneGraphList />
			</div>
			<div class="code-snippet-wrapper">
				<CodeTranslator />
			</div>
		{/if}
		<div class="helper-toggles-wrapper">
			<HelperToggles />
		</div>
	{:else}
		<div class="loading">
			<p>SETTING UP YOUR LAB...</p>
		</div>
	{/if}
</div>

<style>
	.lab-container {
		width: 100%;
		height: 100%;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.canvas-wrapper {
		position: relative;
		width: 100%;
		height: 100%;
	}
	.scene-graph-wrapper {
		position: absolute;
		top: 3.75rem;
		left: 0.5rem;
		pointer-events: none;
	}
	.code-snippet-wrapper {
		position: absolute;
		bottom: 0.5rem;
		right: 0.5rem;
	}

	.helper-toggles-wrapper {
		position: absolute;
		bottom: 0.5rem;
		left: 0.5rem;
	}
</style>
