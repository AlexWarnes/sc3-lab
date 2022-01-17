<script lang="ts">
  import type { LabMesh } from "../models/models";
  import {
    sceneObjects,
    updateGeometryByID,
    updateMaterialByID,
  } from "../data/store";
  import Accordion from "./Accordion.svelte";
  import AxisInputs from "./AxisInputs.svelte";
  import ObjectOptions from "./ObjectOptions.svelte";
  export let mesh: LabMesh;

  let positionOpen;
  let rotationOpen;
  let scaleOpen;
  let materialOpen;
  let geometryValue; // Used for controlling select element
  $: if (mesh && mesh.geometry) {
    let formalType = mesh.geometry.type;
    if (formalType.toLowerCase().includes("box")) {
      geometryValue = "BOX";
    } else if (formalType.toLowerCase().includes("sphere")) {
      geometryValue = "SPHERE";
    } else if (formalType.toLowerCase().includes("cylinder")) {
      geometryValue = "CYLINDER";
    } else if (formalType.toLowerCase().includes("plane")) {
      geometryValue = "PLANE";
    }
  }

  let materialValue = "STANDARD"; // Used for controlling select element
  $: if (mesh && mesh.material) {
    let formalType = mesh.material.type;
    if (formalType === "MeshBasicMaterial") {
      materialValue = "BASIC";
    } else if (formalType === "MeshStandardMaterial") {
      materialValue = "STANDARD";
    } else if (formalType === "MeshPhongMaterial") {
      materialValue = "PHONG";
    }
  }

  const handleGeoChange = (event) => {
    updateGeometryByID(mesh.id, event.target.value);
  };
  const handleMatChange = (event) => {
    updateMaterialByID(mesh.id, event.target.value);
    // TODO: maintain other material variables (color, metalness, etc)
  };

  const handleColorChange = (event) => {
    mesh.material.color.set(event.target.value);
    // Rerender after mutation
    $sceneObjects = $sceneObjects;
  };
</script>

<form class="form-wrapper">
  <h3 class="form-title">MESH PROPERTIES</h3>
  <ObjectOptions obj={mesh} />
  <div class="prop-section-list">
    <div class="input-wrapper block">
      <!-- oninput handler to rerender on when text inputs change -->
      <label
        >Name
        <input
          type="text"
          bind:value={mesh.name}
          on:input={() => ($sceneObjects = $sceneObjects)}
        />
      </label>
    </div>

    <!-- oninput handler to rerender on when number inputs change via text input OR arrow/scroll change -->
    <div class="acc-wrapper" on:input={() => ($sceneObjects = $sceneObjects)}>
      <Accordion
        open={positionOpen}
        on:click={() => (positionOpen = !positionOpen)}
        title="POSITION"
      >
        <AxisInputs bind:axisValues={mesh.position} type="number" />
      </Accordion>
    </div>
    <!-- oninput handler to rerender on when number inputs change via text input OR arrow/scroll change -->
    <div class="acc-wrapper" on:input={() => ($sceneObjects = $sceneObjects)}>
      <Accordion
        open={scaleOpen}
        on:click={() => (scaleOpen = !scaleOpen)}
        title="SCALE"
      >
        <AxisInputs bind:axisValues={mesh.scale} type="number" />
      </Accordion>
    </div>
    <!-- oninput handler to rerender on when number inputs change via text input OR arrow/scroll change -->
    <div class="acc-wrapper" on:input={() => ($sceneObjects = $sceneObjects)}>
      <Accordion
        open={rotationOpen}
        on:click={() => (rotationOpen = !rotationOpen)}
        title="ROTATION"
      >
        <AxisInputs bind:axisValues={mesh.rotation} type="range" />
      </Accordion>
    </div>

    <div class="input-wrapper">
      <!-- onchange handler to rerender with binding to nested value -->
      <label
        >Cast Shadow
        <input
          type="checkbox"
          bind:checked={mesh.castShadow}
          on:change={() => ($sceneObjects = $sceneObjects)}
        />
      </label>
    </div>
    <div class="input-wrapper">
      <!-- onchange handler to rerender with binding to nested value -->
      <label
        >Recieve Shadow
        <input
          type="checkbox"
          bind:checked={mesh.receiveShadow}
          on:change={() => ($sceneObjects = $sceneObjects)}
        />
      </label>
    </div>

    <div class="input-wrapper">
      <label
        >Geometry
        <select value={geometryValue} on:change={handleGeoChange}>
          <option value="BOX">BOX</option>
          <option value="SPHERE">SPHERE</option>
          <option value="CYLINDER">CYLINDER</option>
          <option value="PLANE">PLANE</option>
        </select>
      </label>
    </div>

    <div class="acc-wrapper">
      <Accordion
        open={materialOpen}
        on:click={() => (materialOpen = !materialOpen)}
        title="MATERIAL"
      >
        <div class="input-wrapper">
          <label
            >Material Type
            <select value={materialValue} on:change={handleMatChange}>
              <option value="BASIC">BASIC</option>
              <option value="STANDARD">STANDARD</option>
              <!-- <option value="PHONG">PHONG</option> -->
            </select>
          </label>
        </div>
        <div class="input-wrapper">
          <label
            >Color
            <input
              type="color"
              value={`#${mesh.material.color.getHexString()}`}
              on:change={handleColorChange}
            />
          </label>
        </div>

        <div class="input-wrapper">
          <!-- onchange handler to rerender with binding to nested value -->
          <label
            >Wireframe
            <input
              type="checkbox"
              bind:checked={mesh.material.wireframe}
              on:change={() => ($sceneObjects = $sceneObjects)}
            />
          </label>
        </div>

        <div class="input-wrapper">
          <!-- oninput handler to rerender on when number inputs change via text input OR arrow/scroll change -->
          <label
            >Metalness
            <input
              type="number"
              min="0"
              max="1"
              step="0.05"
              bind:value={mesh.material.metalness}
              disabled={materialValue !== "STANDARD"}
              on:input={() => ($sceneObjects = $sceneObjects)}
            />
          </label>
        </div>
        <div class="input-wrapper">
          <!-- oninput handler to rerender on when number inputs change via text input OR arrow/scroll change -->
          <label
            >Roughness
            <input
              type="number"
              min="0"
              max="1"
              step="0.05"
              bind:value={mesh.material.roughness}
              disabled={materialValue !== "STANDARD"}
              on:input={() => ($sceneObjects = $sceneObjects)}
            />
          </label>
        </div>
        <div class="input-wrapper">
          <!-- oninput handler to rerender on when number inputs change via text input OR arrow/scroll change -->
          <label
            >Reflectivity
            <input
              type="number"
              min="0"
              max="1"
              step="0.05"
              bind:value={mesh.material.reflectivity}
              disabled={materialValue !== "BASIC"}
              on:input={() => ($sceneObjects = $sceneObjects)}
            />
          </label>
        </div>
      </Accordion>
    </div>
  </div>
</form>
