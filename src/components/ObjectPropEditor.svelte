<script>
  import { onMount } from "svelte";
  import { selectedObjects } from "../data/store";
  import LightForm from "./LightForm.svelte";
  import CameraForm from "./CameraForm.svelte";
  import MeshForm from "./MeshForm.svelte";
  import GLTFForm from "./GLTFForm.svelte";
  import CanvasForm from "./CanvasForm.svelte";
  import OrbitControlsForm from "./OrbitControlsForm.svelte";
  import IconButton from "./IconButton.svelte";
  import Close from "../icons/Close.svelte";
  import { helperSettings } from "../data/store";

  export let sceneObj;

  onMount(() => {
    console.log("Open Editor:", sceneObj);
  });
</script>

<div class="close-btn">
  <IconButton on:click={() => selectedObjects.set([])}>
    <Close height="1rem" />
  </IconButton>
</div>
{#if $helperSettings.showControls}
  {#if sceneObj.type === "LIGHT"}
    <LightForm light={sceneObj} />
  {:else if sceneObj.type === "CAMERA"}
    <CameraForm />
  {:else if sceneObj.type === "ORBIT_CONTROLS"}
    <OrbitControlsForm />
  {:else if sceneObj.type === "MESH"}
    <MeshForm mesh={sceneObj} />
  {:else if sceneObj.type === "CANVAS"}
    <CanvasForm />
  {:else if sceneObj.type === "GLTF"}
    <GLTFForm gltf={sceneObj} />
  {/if}
{/if}

<style>
  .close-btn {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
  }
</style>
