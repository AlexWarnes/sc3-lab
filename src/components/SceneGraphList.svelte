<script lang="ts">
	// import { activeHotKeys } from '../data/hotkeys';
	import {
		camera,
		canvas,
		deleteObjectByID,
		objIsSelected,
		orbitControls,
		sceneObjects,
		selectedObjects
	} from '../data/store';
	import NewObjectBtns from './NewObjectBtns.svelte';
	import Trash from '../icons/Trash.svelte';

	const handleObjClick = (objID: string) => {
		if (objIsSelected(objID)) {
			selectedObjects.set([]);
		} else {
			selectedObjects.set([objID]);
		}
	};
</script>

<div class="left-side-controls">
	<div class="scene-graph-box">
		<h3>SCENE OBJECTS</h3>
		<!-- TODO: Add filters -->
		<!-- TODO: Add grouping -->
		<div class="obj-list">
			<ul>
				<li
					on:click={() => handleObjClick($canvas.id)}
					class:isSelected={$selectedObjects.includes($canvas.id)}
				>
					Canvas
				</li>
				<li
					on:click={() => handleObjClick($camera.id)}
					class:isSelected={$selectedObjects.includes($camera.id)}
				>
					Camera
				</li>
				<li
					on:click={() => handleObjClick($orbitControls.id)}
					class:isSelected={$selectedObjects.includes($orbitControls.id)}
				>
					Orbit Controls
				</li>
				{#each $sceneObjects as obj (obj.id)}
					<li
						on:click={() => handleObjClick(obj.id)}
						class:isSelected={$selectedObjects.includes(obj.id)}
					>
						<span class="name">{obj.name}</span>
						<button class="delete-obj-btn" on:click|stopPropagation={() => deleteObjectByID(obj.id)}
							><Trash /></button
						>
					</li>
				{/each}
			</ul>
		</div>
	</div>
	<NewObjectBtns />
</div>

<!-- on:mouseenter={() => setHovered(obj.id, true)}
	on:mouseleave={() => setHovered(obj.id, false)} -->
<style>
	.left-side-controls {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		z-index: 1;
	}
	.scene-graph-box {
		background-color: var(--canvas-overlay);
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		border-radius: 2px;
		width: 16rem;
		max-height: 18rem;
		overflow: hidden;
		color: #fafbfc;
		pointer-events: all;
	}

	.obj-list {
		width: 100%;
		overflow: auto;
	}

	.delete-obj-btn {
		width: 2rem;
		min-width: 2rem;
		height: 2rem;
		background: transparent;
		border: none;
		color: #fafbfc;
		cursor: pointer;
		transition: color 0.2s ease;
		z-index: 5;
	}
	.delete-obj-btn:hover {
		color: red;
	}

	h3,
	ul {
		padding: 0;
		margin: 0;
	}

	h3 {
		margin: 0.75rem auto 0.75rem 0.5rem;
		font-size: 1rem;
		font-weight: 400;
	}

	ul {
		list-style: none;
	}

	li {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: nowrap;
		margin: 0.5rem;
		padding: 0.5rem 0 0.5rem 0.75rem;
		font-size: 0.75rem;
		background: #00000018;
		border-left: 3px solid transparent;
		border-right: 3px solid transparent;
		transition: all 0.2s ease;
	}

	li:hover {
		background-color: var(--canvas-overlay-hover);
		cursor: pointer;
	}

	li.isSelected {
		border-left: 3px solid var(--svelte-orange);
		background-color: var(--canvas-overlay-hover);
	}
</style>
