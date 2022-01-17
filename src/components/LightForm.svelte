<script lang="ts">
  import type { LabLight } from "../models/models";
  import { sceneObjects } from "../data/store";
  import Accordion from "./Accordion.svelte";
  import AxisInputs from "./AxisInputs.svelte";
  import ObjectOptions from "./ObjectOptions.svelte";
  export let light: LabLight;

  let positionOpen;

  const handleColorChange = (event) => {
    light.color.set(event.target.value);
    // Rerender after mutation
    $sceneObjects = $sceneObjects;
  };
  const handleGroundColorChange = (event) => {
    light.groundColor.set(event.target.value);
    // Rerender after mutation
    $sceneObjects = $sceneObjects;
  };
</script>

<form class="form-wrapper">
  <h3 class="form-title">LIGHT PROPERTIES</h3>
  <ObjectOptions obj={light} />

  <div class="prop-section-list">
    <div class="input-wrapper block">
      <!-- oninput handler to rerender on when text inputs change -->
      <label
        >Name
        <input
          type="text"
          bind:value={light.name}
          on:input={() => ($sceneObjects = $sceneObjects)}
        />
      </label>
    </div>

    {#if light.variant === "DIRECTIONAL"}
      <!-- oninput handler to rerender on when number inputs change via text input OR arrow/scroll change -->
      <div class="acc-wrapper" on:input={() => ($sceneObjects = $sceneObjects)}>
        <Accordion
          open={positionOpen}
          on:click={() => (positionOpen = !positionOpen)}
          title="POSITION"
        >
          <AxisInputs axisValues={light.position} type="number" />
        </Accordion>
      </div>
      <div class="input-wrapper">
        <!-- onchange handler to rerender with binding to nested value -->
        <label
          >Shadows
          <input
            type="checkbox"
            bind:checked={light.shadow}
            on:change={() => ($sceneObjects = $sceneObjects)}
          />
        </label>
      </div>
    {/if}
    <div class="input-wrapper">
      <label
        >Color
        <!-- TODO: Use debounce and bind to lightColor bc on:change only runs when input is closed-->
        <input
          type="color"
          value={`#${light.color.getHexString()}`}
          on:change={handleColorChange}
        />
      </label>
    </div>

    {#if light.variant === "HEMISPHERE"}
      <div class="input-wrapper">
        <label
          >Ground Color
          <!-- TODO: Use debounce and bind to lightColor bc on:change only runs when input is closed-->
          <input
            type="color"
            value={`#${light.groundColor.getHexString()}`}
            on:change={handleGroundColorChange}
          />
        </label>
      </div>
    {/if}

    <div class="input-wrapper">
      <!-- oninput handler to rerender on when number inputs change via text input OR arrow/scroll change -->
      <label
        >Intensity
        <input
          type="number"
          step="0.25"
          bind:value={light.intensity}
          on:input={() => ($sceneObjects = $sceneObjects)}
        />
      </label>
    </div>
  </div>
</form>
