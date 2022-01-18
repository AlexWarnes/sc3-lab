<script lang="ts">
  import type { LabCamera, LabLight, LabOrbitControls } from "../models/models";

  import {
    camera,
    canvas,
    helperSettings,
    orbitControls,
    sceneObjects,
  } from "../data/store";
  import CodeOn from "../icons/CodeOn.svelte";
  import CodeOff from "../icons/CodeOff.svelte";
  import { scale, fly } from "svelte/transition";
  import SvelteLogo from "../icons/SvelteLogo.svelte";
  import { onMount } from "svelte";
  import Copy from "../icons/Copy.svelte";

  $: gltfObjects = $sceneObjects.filter((obj) => obj.type === "GLTF");

  const stringifyGLTFScript = () => {
    if (!gltfObjects.length) {
      return "";
    } else {
      return `
// *******************************
// WARNING: GLTF Code Generation is not yet supported
// For examples, reference Birds.svelte in REPL: https://svelte.dev/repl/384e1c579f8a4fa5b04f3df0a2017ad1?version=3.46.1
// *******************************
			`;
    }
  };

  const stringifyCamera = (camera: LabCamera) => {
    if (camera.variant === "PERSPECTIVE") {
      return `<SC.PerspectiveCamera 
    position={[${camera.position}]}
    near={${camera.near}}
    far={${camera.far}}
    fov={${camera.fov}}
  />`;
    } else {
      // TODO: Handle ortho cam
      return ``;
    }
  };
  const stringifyOrbitControls = (oc: LabOrbitControls) => {
    return `<SC.OrbitControls 
    enabled={${oc.enabled}}
    enableZoom={${oc.enableZoom}}
    autoRotate={${oc.autoRotate}}
    autoRotateSpeed={${oc.autoRotateSpeed}}
    enableDamping={${oc.enableDamping}}
    dampingFactor={${oc.dampingFactor}}
  />`;
  };

  const stringifyMaterialProps = (material) => {
    if (material.type === "MeshBasicMaterial") {
      // basic
      return `color: new THREE.Color(0x${material.color.getHexString()}),
      wireframe: ${material.wireframe},
      reflectivity: ${material.reflectivity},`;
    } else if (material.type === "MeshStandardMaterial") {
      // stan
      return `color: new THREE.Color(0x${material.color.getHexString()}),
      wireframe: ${material.wireframe},
      metalness: ${material.metalness},
      roughness: ${material.roughness},`;
    }
  };

  const stringifyBufferName = (geometry) => {
    let formalType = geometry.type;
    if (formalType.toLowerCase().includes("box")) {
      return "BoxBufferGeometry";
    } else if (formalType.toLowerCase().includes("sphere")) {
      return "SphereBufferGeometry";
    } else if (formalType.toLowerCase().includes("cylinder")) {
      return "CylinderBufferGeometry";
    } else if (formalType.toLowerCase().includes("plane")) {
      return "PlaneBufferGeometry";
    }
  };

  const stringifyLight = (light: LabLight) => {
    if (light.variant === "DIRECTIONAL") {
      return `  <SC.DirectionalLight
    color={new THREE.Color(0x${light.color.getHexString()})}
    position={[${light.position}]}
    intensity={${light.intensity}}
    shadow={${light.shadow}}
  />`;
    } else if (light.variant === "AMBIENT") {
      return `  <SC.AmbientLight
    color={new THREE.Color(0x${light.color.getHexString()})}
    intensity={${light.intensity}}
  />`;
    } else if (light.variant === "HEMISPHERE") {
      return `  <SC.HemisphereLight
    color={new THREE.Color(0x${light.color.getHexString()})}
    groundColor={new THREE.Color(0x${light.groundColor.getHexString()})}
    intensity={${light.intensity}}
  />`;
    }
  };
  const scriptString = "script";
  let clickToCopy = () => null;
  let copyStatus = "IDLE";
  onMount(() => {
    if (window.navigator) {
      clickToCopy = () => {
        window.navigator.clipboard
          .writeText(document.getElementById("code-wrapper").innerText)
          .then(() => {
            console.log("Copied!");
            copyStatus = "SUCCESS";
            setTimeout(() => (copyStatus = "IDLE"), 4000);
          })
          .catch((err) => console.log("Error copying code", err));
      };
    }
  });
</script>

{#if $helperSettings.showCode}
  <div class="code-box" in:fly={{ x: -200 }} out:scale>
    <div class="header">
      <div class="title-row">
        <SvelteLogo height="18" />
        <h3>Your Svelte Cubed Code</h3>
      </div>

      <p class="description">
        Code generated for your current scene that you can drop into any Svelte
        project with svelte-cubed and threejs.
      </p>

      <div class="repl-row">
        <p class="description">
          Try it in the <a
            href="https://svelte.dev/repl"
            target="_blank"
            rel="noopener noreferrer">Svelte REPL</a
          >
        </p>
        <button
          class="copy-btn"
          class:success={copyStatus === "SUCCESS"}
          on:click={clickToCopy}
        >
          <Copy height="16" />
          {copyStatus === "SUCCESS" ? "Copied!" : "Copy"}</button
        >
      </div>
    </div>
    <div id="code-wrapper">
      <pre>
{`
<${scriptString}>
import * as THREE from "three";
import * as SC from "svelte-cubed";
${
    gltfObjects.length
      ? 'import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"'
      : ""
  }
	${stringifyGLTFScript()}
</${scriptString}>

<!-- TEMPLATE -->

<SC.Canvas
  background={new THREE.Color(0x${$canvas.background.getHexString()})}
  shadows={${$canvas.shadows}}
  antialias={${$canvas.antialias}}
  physicallyCorrectLights={${$canvas.physicallyCorrectLights}}
>

  ${stringifyCamera($camera)}

  ${stringifyOrbitControls($orbitControls)}
`}
</pre>
      {#each $sceneObjects as obj}
        {#if obj.type === "MESH"}
          <pre>
{`
  <SC.Mesh
    geometry={new THREE.${stringifyBufferName(obj.geometry)}()}      
    material={new THREE.${obj.material.type}({
      ${stringifyMaterialProps(obj.material)}
    })}
    position={[${obj.position}]}
    rotation={[${obj.rotation}]}
    scale={[${obj.scale}]}
    castShadow={${obj.castShadow}}
    receiveShadow={${obj.receiveShadow}}
  />
`}</pre>
        {:else if obj.type === "LIGHT"}
          <pre>{stringifyLight(obj)}</pre>
        {/if}
      {/each}
      <pre>{`</SC.Canvas>`}</pre>
    </div>
    <button
      on:click={() => ($helperSettings.showCode = false)}
      class="code-toggle"
      in:scale={{ delay: 400 }}
    >
      <CodeOff />
    </button>
  </div>
{:else}
  <button
    on:click={() => ($helperSettings.showCode = true)}
    class="code-toggle svelte"
    in:scale={{ delay: 400 }}
  >
    <CodeOn />
  </button>
{/if}

<style>
  .code-box {
    overflow: auto;
    margin: 0 0;
    max-width: 35vw;
    max-height: 50vh;
    padding: 0.5rem 1rem 1rem;
    color: #ffffff;
    background: #333333;
    border-radius: 0.15rem;
    font-size: 14px;
    font-family: "Fira Mono", monospace;
    transform-origin: bottom right;
  }

  .header {
    background-color: #676778;
    padding: 1rem;
  }

  .title-row {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .header h3 {
    margin: 0 0 0 1rem;
  }

  .repl-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  a {
    color: #c5eeff;
  }
  a:visited {
    color: #fcdfff;
  }

  .copy-btn {
    border: 2px solid transparent;
    border: 2px solid transparent;
    padding: 0.5rem 0.75rem;
    width: 5.6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }

  .copy-btn.success {
    border: 2px solid lightseagreen;
  }
  .code-toggle {
    width: 3rem;
    height: 3rem;
    border: none;
    overflow: hidden;
    border-radius: 0.15rem;
    position: absolute;
    right: 0.5rem;
    bottom: 0.5rem;
    color: #fafbfc;
    background: var(--canvas-overlay);
    background: #161616;
    cursor: pointer;
  }
</style>
