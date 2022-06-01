<script>
  import * as SC from "svelte-cubed";
  import * as THREE from "three";
  import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
  import { onMount } from "svelte";
  let geometry = null;
  const logoURL = "/assets/svelte3DLogo.svg";
  function loadSVG() {
    const loader = new SVGLoader();
    loader.load(logoURL, (data) => {
      let shape = data.paths[0].toShapes(false);
      geometry = new THREE.ExtrudeGeometry(shape, {
        curveSegments: 24,
        depth: 10,
        bevelEnabled: true,
        bevelOffset: 0,
        bevelSegments: 4,
        bevelSize: 1,
        bevelThickness: 5,
      });
      geometry.center();
    });
  }
  onMount(() => {
    loadSVG();
  });
</script>

{#if geometry}
  <SC.Mesh
    {geometry}
    material={new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#ff3e02"),
    })}
    position={[-1, 0, -1]}
    rotation={[0, Math.PI, 0]}
    scale={0.015}
  />
{/if}
