<script lang="ts">
  import * as SC from "svelte-cubed";
  import { scale, fly } from "svelte/transition";
  import ObjectPropEditor from "./ObjectPropEditor.svelte";
  import { canvas, selectedObjects } from "../data/store";
  import { TroisProvider } from "svelte-trois";

  function onClick(evt) {
    console.log(evt);
  }

  $: selected =
    $selectedObjects.length === 1 && $selectedObjects.includes($canvas.id);
</script>

{#if $canvas}
  <SC.Canvas
    antialias={$canvas.antialias}
    physicallyCorrectLights={$canvas.physicallyCorrectLights}
    background={$canvas.background}
    shadows={$canvas.shadows}
  >
    <TroisProvider>
      <slot />
    </TroisProvider>
  </SC.Canvas>

  {#if selected}
    <div class="editor-wrapper" in:fly={{ x: -200 }} out:scale>
      <ObjectPropEditor sceneObj={$canvas} />
    </div>
  {/if}
{/if}
