<script>
  import * as THREE from "three";
  import * as SC from "svelte-cubed";
  import { onMount } from "svelte";

  let reducedMotion = false;
  onMount(() => {
    let mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    mediaQuery.addEventListener("change", () => {
      console.log(mediaQuery.media, mediaQuery.matches);
      reducedMotion = mediaQuery.matches;
    });
  });
</script>

<div class="canvas-wrapper">
  <SC.Canvas shadows={false} antialias={true} alpha background={null}>
    <SC.PerspectiveCamera position={[-4, 3, 8]} near={0.1} far={40} fov={55} />

    <SC.OrbitControls
      enabled
      enableZoom={false}
      enableDamping={true}
      dampingFactor={0.1}
      autoRotate={!reducedMotion}
    />

    <SC.AmbientLight color={new THREE.Color(0xffffff)} intensity={1} />
    <SC.DirectionalLight
      color={new THREE.Color(0xffffff)}
      intensity={1}
      position={[5, 10, 10]}
    />

    <SC.Mesh
      geometry={new THREE.BoxBufferGeometry()}
      material={new THREE.MeshStandardMaterial({
        color: new THREE.Color(0xff3e02),
        wireframe: false,
        transparent: true,
        reflectivity: 1,
        opacity: 0.15,
      })}
      position={[-2, 2, 0]}
      rotation={[0, 0, 0]}
      scale={[1, 1, 1]}
    />

    <SC.Group position={[0, 0, 0]}>
      <SC.Mesh
        geometry={new THREE.SphereBufferGeometry()}
        material={new THREE.MeshStandardMaterial({
          color: new THREE.Color(0xff3e02),
          wireframe: true,
          transparent: true,
          metalness: 0,
          roughness: 1,
          opacity: 0.15,
        })}
        position={[0, 8, -20]}
        rotation={[0, 0, 0]}
        scale={[5, 5, 5]}
      />
      <SC.Mesh
        geometry={new THREE.SphereBufferGeometry()}
        material={new THREE.MeshStandardMaterial({
          color: new THREE.Color(0x444444),
          wireframe: true,
          transparent: true,
          metalness: 0,
          roughness: 1,
          opacity: 0.15,
        })}
        position={[20, -8, 0]}
        rotation={[0, 0, 0]}
        scale={[5, 5, 5]}
      />
      <SC.Mesh
        geometry={new THREE.SphereBufferGeometry()}
        material={new THREE.MeshStandardMaterial({
          color: new THREE.Color(0x444444),
          wireframe: false,
          transparent: true,
          metalness: 0,
          roughness: 1,
          opacity: 0.15,
        })}
        position={[-20, -8, 0]}
        rotation={[0, 0, 0]}
        scale={[5, 5, 5]}
      />
      <SC.Mesh
        geometry={new THREE.SphereBufferGeometry()}
        material={new THREE.MeshStandardMaterial({
          color: new THREE.Color(0xff3e02),
          wireframe: false,
          transparent: true,
          metalness: 0,
          roughness: 1,
          opacity: 0.15,
        })}
        position={[0, 8, 20]}
        rotation={[0, 0, 0]}
        scale={[5, 5, 5]}
      />
    </SC.Group>
  </SC.Canvas>
</div>

<style>
  .canvas-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #676779;
    background: radial-gradient(
        34.14% 72.25% at 47.58% 31.75%,
        rgba(232, 244, 255, 0.52) 0%,
        rgba(255, 255, 255, 0) 100%
      ),
      linear-gradient(
        92.4deg,
        #d1d4d7 14.67%,
        rgba(238, 247, 255, 0.48) 54.37%,
        rgba(206, 216, 224, 0.62) 92.49%
      ),
      linear-gradient(0deg, #dbe7ef, #dbe7ef);
    z-index: -1;
  }
</style>
