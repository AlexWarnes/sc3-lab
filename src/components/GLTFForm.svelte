<script lang="ts">
  import type { LabGLTF } from "../models/models";
  import {
    addGLTFModelToLibrary,
    sceneObjects,
    trackGLTFStatus,
  } from "../data/store";
  import Accordion from "./Accordion.svelte";
  import AxisInputs from "./AxisInputs.svelte";
  import {
    addModelToGLTFSceneObject,
    loadGLTF,
    setGLTFSource,
    setGLTFStatus,
  } from "../data/GLTF";
  import ObjectOptions from "./ObjectOptions.svelte";

  export let gltf: LabGLTF;

  let positionOpen;
  let rotationOpen;
  let scaleOpen;
  let animationOpen;
  $: tempSource = gltf.source;
  let status = trackGLTFStatus(gltf.id);
  const statusMap = {
    EMPTY: "No model loaded",
    LOADING: "Loading model...",
    SUCCESS: "Model successfully loaded",
    ERROR: "Error loading model",
  };
  const rawGitBaseURL: string =
    "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/";
  interface GLTFOption {
    name: string;
    path: string;
  }
  let animationList = [];
  $: if (gltf && gltf.model) {
    animationList = gltf.model.animations || [];
  }

  const GLTFOptions: GLTFOption[] = [
    { name: "Flamingo", path: "Flamingo.glb" },
    { name: "Parrot", path: "Parrot.glb" },
    { name: "Stork", path: "Stork.glb" },
    { name: "PrimaryIonDrive", path: "PrimaryIonDrive.glb" },
    { name: "Xbot", path: "Xbot.glb" },
    { name: "RobotExpressive", path: "RobotExpressive/RobotExpressive.glb" },
    { name: "CollisionWorld", path: "collision-world.glb" },
    { name: "BoomBox", path: "BoomBox.glb" },
    { name: "Horse", path: "Horse.glb" },
    { name: "Flower", path: "Flower/Flower.glb" },
    { name: "Nefertiti", path: "Nefertiti/Nefertiti.glb" },
    { name: "ShadowmappableMesh", path: "ShadowmappableMesh.glb" },
    { name: "SheenChair", path: "SheenChair.glb" },
    { name: "LeePerrySmith", path: "LeePerrySmith/LeePerrySmith.glb" },
    { name: "DamagedHelmet", path: "DamagedHelmet/glTF/DamagedHelmet.gltf" },
    {
      name: "MaterialsVariantsShoe",
      path: "MaterialsVariantsShoe/glTF/MaterialsVariantsShoe.gltf",
    },
    { name: "Soldier", path: "Soldier.glb" },
  ];
  let selectedExampleModel = "";
  $: if (gltf.source) {
    let option = GLTFOptions.find((opt) => gltf.source.includes(opt.path));
    selectedExampleModel = option ? option.path : "";
  }
  // https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BrainStem/glTF-Binary/BrainStem.glb  // TODO: Credit Examples Link

  $: if (gltf.source && !gltf.model && $status === "EMPTY") {
    loadModel();
  }

  const handleSourceInput = (event) => {
    tempSource = event.target.value.trim();
  };

  const handleModelSelect = (event) => {
    tempSource = `${rawGitBaseURL}${event.target.value.trim()}`;
    handleLoadModel();
  };

  const handleLoadModel = () => {
    /**
     *  Handle three scenarios:
     * 1. The source input is an empty string - remove the model
     * 2. We already fetched a model from this source, so clone it
     * 3. Go fetch the model and add to the library
     * */
    if (!tempSource) {
      setGLTFSource(gltf.id, tempSource);
      addModelToGLTFSceneObject(gltf.id, null);
      return;
    }

    if (tempSource !== gltf.source) {
      setGLTFSource(gltf.id, tempSource);

      // TODO: Figure out how to clone model data
      // let modelData = $GLTFModelLibrary[tempSource];
      // if (modelData) {
      // 	let newInstance = reinstantiateGLTF(modelData)
      //   addModelToGLTFSceneObject(gltf.id, newInstance);
      //   setGLTFStatus(gltf.id, "SUCCESS");
      // }
      loadModel();
    }
  };

  function loadModel() {
    setGLTFStatus(gltf.id, "LOADING");

    loadGLTF(gltf)
      .then((data) => {
        setGLTFStatus(gltf.id, "SUCCESS");
        addGLTFModelToLibrary(tempSource, data);
        addModelToGLTFSceneObject(gltf.id, data);
      })
      .catch((err) => {
        setGLTFStatus(gltf.id, "ERROR");
        addModelToGLTFSceneObject(gltf.id, null);
      });
  }
</script>

<form class="form-wrapper">
  <h3 class="form-title">glTF PROPERTIES (BETA)</h3>
  <ObjectOptions obj={gltf} />

  <p class="warning">
    Enter the URL to a .glb or .gltf in the source field, or choose from the
    list of examples. For models on GitHub, use the raw git URL.
  </p>

  <div class="prop-section-list">
    <div class="input-wrapper block">
      <label class="block"
        >Source URL
        <input
          class="source-field"
          value={gltf.source || ""}
          on:input={handleSourceInput}
          type="text"
        />
      </label>
      <button
        disabled={$status === "LOADING" ||
          (tempSource === gltf.source && $status === "SUCCESS")}
        class="load-btn"
        type="button"
        on:click|preventDefault|stopPropagation={handleLoadModel}
        >Load Model</button
      >
      <p class="model-status">{statusMap[$status]}</p>
    </div>

    <div class="input-wrapper block">
      <label class="block"
        >glTF Example Models
        <select value={selectedExampleModel} on:change={handleModelSelect}>
          <option value={""} />

          {#each GLTFOptions as option (option.name)}
            <option value={option.path}>{option.name}</option>
          {/each}
        </select>
      </label>
      <a
        href="https://github.com/mrdoob/three.js/tree/dev/examples/models/gltf"
        target="_blank"
        rel="noopener noreferrer"
        class="source-link block">ThreeJS Examples Repo</a
      >
    </div>
    <div class="input-wrapper block">
      <!-- oninput handler to rerender on when text inputs change -->
      <label
        >Name
        <input
          type="text"
          bind:value={gltf.name}
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
        <AxisInputs
          bind:axisValues={gltf.position}
          type="number"
          disabled={$status !== "SUCCESS"}
        />
      </Accordion>
    </div>
    <!-- oninput handler to rerender on when number inputs change via text input OR arrow/scroll change -->
    <div class="acc-wrapper" on:input={() => ($sceneObjects = $sceneObjects)}>
      <Accordion
        open={scaleOpen}
        on:click={() => (scaleOpen = !scaleOpen)}
        title="SCALE"
      >
        <AxisInputs
          bind:axisValues={gltf.scale}
          type="number"
          disabled={$status !== "SUCCESS"}
        />
      </Accordion>
    </div>
    <!-- oninput handler to rerender on when number inputs change via text input OR arrow/scroll change -->
    <div class="acc-wrapper" on:input={() => ($sceneObjects = $sceneObjects)}>
      <Accordion
        open={rotationOpen}
        on:click={() => (rotationOpen = !rotationOpen)}
        title="ROTATION"
      >
        <AxisInputs
          bind:axisValues={gltf.rotation}
          type="range"
          disabled={$status !== "SUCCESS"}
        />
      </Accordion>
    </div>

    <div class="acc-wrapper">
      <!-- <div> -->
      <Accordion
        open={animationOpen}
        on:click={() => (animationOpen = !animationOpen)}
        title={`ANIMATION (${animationList.length})`}
      >
        <div class="animation-inputs">
          {#each animationList as animation, idx (animation.uuid)}
            <label>
              {animation.name}
              <input
                type="checkbox"
                value={animation.uuid}
                bind:group={gltf.animations}
                on:change={() => ($sceneObjects = $sceneObjects)}
              />
            </label>
          {:else}
            <p>No animations available</p>
          {/each}
        </div>
      </Accordion>

      <!-- </div> -->
    </div>
  </div>
</form>

<style>

  input.source-field {
    width: 100%;
  }
  .load-btn {
    margin: 0.25rem 0 0;
    border: none;
    padding: 0.5rem;
    border-radius: 2px;
    background: #22603d;
    color: #fafbfc;
    font-size: 0.75rem;
    cursor: pointer;
  }
  .load-btn:disabled {
    opacity: 0.75;
    background: slategray;
    cursor: not-allowed;
  }

  p.model-status {
    margin: 0.5rem 0 0;
    /* margin: 0; */
  }

  a {
    color: #c5eeff;
  }
  a:visited {
    color: #fcdfff;
  }
  a.source-link {
    margin: 0.5rem 0 0 0;
  }

  .animation-inputs {
    /* padding: .5rem .75rem .5rem 0; */
  }
  .animation-inputs > label {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border-left: 2px solid transparent;
    transition: border-left 0.2s ease;
  }
  .animation-inputs > label:hover {
    border-left: 2px solid var(--svelte-orange);
    cursor: pointer;
  }
</style>
