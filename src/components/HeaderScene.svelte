<script>
  import * as THREE from "three";
  import * as SC from "svelte-cubed";
  import HeaderLogo from "./HeaderLogo.svelte"
  import HeaderCube from "./HeaderCube.svelte"

</script>

<div class="canvas-wrapper">
  
<SC.Canvas
background={new THREE.Color(0x000000)}
antialias
>
<SC.PerspectiveCamera 
  position={[0,2,8]}
  near={0.1}
  far={400}
  fov={55}
/>

<SC.OrbitControls 
  enabled={true}
  enableZoom={true}
  enableDamping={true}
  dampingFactor={0.1}
/>

<SC.PointLight 
  color={new THREE.Color("#fafbfc")}
  decay={2}
/>

<HeaderLogo />
<HeaderCube />
<SC.Mesh
  geometry={new THREE.PlaneGeometry()}      
  material={new THREE.MeshPhysicalMaterial({color: new THREE.Color("#676779")})}
  position={[0, -3.25, 0]}
  scale={100}
  rotation={[-Math.PI / 2, 0, 0]}
/>
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
    background-color: #161616;
    z-index: -1;
  }
</style>
