<script>
  import * as THREE from "three";
  import * as SC from "svelte-cubed";
  import { onMount } from "svelte";
  import { tweened } from "svelte/motion";
  import { reducedMotion } from "../data/reducedMotion";
  import { elasticIn, elasticOut, cubicOut, linear } from "svelte/easing";
  const scaleX = tweened(0, {
    duration: 1000,
    easing: elasticOut,
    delay: 1000,
  });
  const scaleY = tweened(0, { duration: 1000, easing: elasticOut });
  const scaleZ = tweened(0, { duration: 1000, easing: elasticOut });
  const rotationY = tweened(0, { duration: 2000, easing: cubicOut });
  const positionX = tweened(-1, { duration: 1000, easing: elasticOut });
  let matType = "WIREFRAME";
  function renderSolidMaterial() {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#ff3e02"),
    });
  }
  function renderWireframeMaterial() {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color("#ff3e02"),
      wireframe: true,
    });
  }
  function runAnimationSequence() {
    if ($reducedMotion) {
      scaleX.set(1, { duration: 0, delay: 0 });
      scaleY.set(1, { duration: 0, delay: 0 });
      scaleZ.set(1, { duration: 0, delay: 0 });
      positionX.set(1.75, { duration: 0, delay: 0 });
      rotationY.set(3 * Math.PI, { duration: 0, delay: 0 });
      matType = "SOLID";
    } else {
      scaleX
        .set(4)
        .then(() => scaleY.set(4))
        .then(() => scaleZ.set(4))
        .then(() => {
          scaleX.set(1, { delay: 0 });
          scaleY.set(1);
          return scaleZ.set(1);
        })
        .then(() => positionX.set(1.75))
        .then(() => {
          setTimeout(() => (matType = "SOLID"), 500);
          rotationY.set(3 * Math.PI);
        });
    }
  }
  onMount(() => {
    runAnimationSequence();
  });

  $: material =
    matType === "WIREFRAME" ? renderWireframeMaterial() : renderSolidMaterial();
</script>

<SC.Mesh
  geometry={new THREE.BoxBufferGeometry()}
  {material}
  scale={[$scaleX, $scaleY, $scaleZ]}
  position={[$positionX, 0, -1]}
  rotation={[Math.PI / 8, $rotationY, Math.PI / 8]}
/>
