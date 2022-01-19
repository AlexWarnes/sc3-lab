<script lang="ts">
	import { generateNewMesh } from '../data/mesh';
	import { addNewSceneObject } from '../data/store';
	import { generateNewLight } from '../data/light';
	import type { GeometryType, LightType } from '../models/models';

	import Cube from '../icons/Cube.svelte';
	// import Palette from '../icons/Palette.svelte';
	import Sun from '../icons/Sun.svelte';
	import Model from '../icons/Model.svelte';
	import Menu from './Menu.svelte';
	import MenuItem from './MenuItem.svelte';
	import { generateNewGLTF } from '../data/GLTF';

	// const handleNewLightClick = () => addNewSceneObject("MESH");
	// const handleNewMaterialClick = () => addNewSceneObject("MESH");
	let geoMenuIsOpen = false;
	let lightMenuIsOpen = false;
	$: {
		if (geoMenuIsOpen) lightMenuIsOpen = false;
		if (lightMenuIsOpen) geoMenuIsOpen = false;
	}
	const toggleGeoMenu = (status = !geoMenuIsOpen) => (geoMenuIsOpen = status);
	const toggleLightMenu = (status = !lightMenuIsOpen) => (lightMenuIsOpen = status);
	const handleNewMeshClick = (geoType: GeometryType) => {
		toggleGeoMenu(false);
		const newMesh = generateNewMesh(geoType);
		addNewSceneObject(newMesh);
	};
	const handleNewLightClick = (lightType: LightType) => {
		toggleLightMenu(false);
		const newLight = generateNewLight(lightType);
		addNewSceneObject(newLight);
	};
	const handleNewGLTFClick = () => {
		toggleGeoMenu(false);
		const newGLTF = generateNewGLTF();
		addNewSceneObject(newGLTF);
	};
</script>

<div class="new-object-btn-box">
	<h3>ADD NEW</h3>
	<button class="icon-btn" on:click={() => toggleGeoMenu()}>
		<Cube />
		<span class="btn-label">Mesh</span>
		<Menu bind:open={geoMenuIsOpen}>
			<MenuItem
				on:click={() => {
					handleNewMeshClick('BOX');
				}}>BOX</MenuItem
			>
			<MenuItem
				on:click={() => {
					handleNewMeshClick('SPHERE');
				}}>SPHERE</MenuItem
			>
			<MenuItem
				on:click={() => {
					handleNewMeshClick('CYLINDER');
				}}>CYLINDER</MenuItem
			>
			<MenuItem
				on:click={() => {
					handleNewMeshClick('PLANE');
				}}>PLANE</MenuItem
			>
			<!-- <MenuItem on:click={handleNewGLTFClick}>GLTF</MenuItem> -->
		</Menu>
	</button>
	<!-- <button class="icon-btn">
		<Palette />
	</button> -->
	<button class="icon-btn" on:click={() => toggleLightMenu()}>
		<Sun />
		<span class="btn-label">Light</span>
		<Menu bind:open={lightMenuIsOpen}>
			<MenuItem
				on:click={() => {
					handleNewLightClick('DIRECTIONAL');
				}}>DIRECTIONAL</MenuItem
			>
			<MenuItem
				on:click={() => {
					handleNewLightClick('AMBIENT');
				}}>AMBIENT</MenuItem
			>
			<MenuItem
				on:click={() => {
					handleNewLightClick('HEMISPHERE');
				}}>HEMISPHERE</MenuItem
			>
		</Menu>
	</button>

	<button class="icon-btn" on:click={handleNewGLTFClick}>
		<Model />
		<span class="btn-label">glTF</span>
	</button>
</div>

<style>
	.new-object-btn-box {
		background-color: var(--canvas-overlay);
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		border-radius: 2px;
		margin: 1rem 0;
		pointer-events: all;
		color: #fafbfc;
		width: 6rem;
	}

	.icon-btn {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 0.5rem;
		border: none;
		outline: none;
		/* width: 3.75rem; */
		height: 3.75rem;
		border-radius: 2px;
		color: #fafbfc;
		background-color: transparent;
		border: 3px solid transparent;
		transition: all 0.2s ease;
		position: relative;
	}

	.btn-label {
		margin: 0 0 0 0.5rem;
	}

	.icon-btn:hover {
		border-left: 3px solid var(--svelte-orange);
		background-color: var(--canvas-overlay-hover);
		cursor: pointer;
	}

	/* The adjacent sibling combinator (+) separates two selectors 
  and matches the second element only if it immediately follows 
  the first element, and both are children of the same parent element. */
	.icon-btn + .icon-btn {
		margin: 1rem 0 0;
	}

	h3 {
		margin: 0.75rem auto 0.75rem 0.5rem;
		font-size: 1rem;
		font-weight: 400;
	}
</style>
