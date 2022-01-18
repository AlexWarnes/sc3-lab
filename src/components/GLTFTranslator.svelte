<script lang="ts">
  import * as THREE from "three";
  import * as SC from "svelte-cubed";

  import type { LabGLTF } from "../models/models";
  import { selectedObjects } from "../data/store";
  import ObjectPropEditor from "./ObjectPropEditor.svelte";
  import { fly, scale } from "svelte/transition";
  import ModifiedAnimation from "./ModifiedAnimation.svelte";

  export let idx: number;
  export let gltf: LabGLTF;
  $: selected =
    $selectedObjects.length === 1 && $selectedObjects.includes(gltf.id);
  let time = 0;
  const clock = new THREE.Clock();
  SC.onFrame(() => {
    let delta = clock.getDelta();
    time += 1 * delta;
  });
</script>

{#if gltf.model}
  <SC.Primitive
    object={gltf.model.scene}
    position={gltf.position}
    rotation={gltf.rotation}
    scale={gltf.scale}
  >
    {#if gltf.model.animations}
      <ModifiedAnimation
        selectedClips={gltf.animations}
        allClips={gltf.model.animations}
        {time}
      />
    {/if}
  </SC.Primitive>
{/if}

{#if selected}
  <SC.Primitive
    object={new THREE.AxesHelper(gltf.scale[0] + 2)}
    position={gltf.position}
  />
{/if}

{#if selected}
  <div class="editor-wrapper" in:fly={{ x: -200 }} out:scale>
    <ObjectPropEditor sceneObj={gltf} />
  </div>
{/if}
