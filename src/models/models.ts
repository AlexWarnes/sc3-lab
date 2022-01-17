import type { Position, Rotation, Scale } from 'svelte-cubed/types/common';
import type * as THREE from 'three';

export interface HelperSettings {
	showAxes: boolean;
	showGrid: boolean;
	showControls: boolean;
	showCode: boolean;
}

export interface StaticTextures {
	uvColor: THREE.Texture;
	uvBW: THREE.Texture;
}

export type SceneObjectType = 'LIGHT' | 'CAMERA' | 'MESH' | 'CANVAS' | 'ORBIT_CONTROLS' | 'GLTF';
export type GeometryType = 'BOX' | 'SPHERE' | 'CYLINDER' | 'PLANE';
export type MaterialType = 'BASIC' | 'STANDARD'; // | 'PHONG';
export type LightType = 'AMBIENT' | 'DIRECTIONAL' | 'HEMISPHERE';
export type CameraType = 'PERSPECTIVE' | 'ORTHOGRAPHIC';
export type SceneObject = LabCanvas | LabCamera | LabLight | LabMesh;
export type LabMaterial = THREE.MeshBasicMaterial | THREE.MeshStandardMaterial;
export type GLTFStatus = "EMPTY" | "LOADING" | "SUCCESS" | "ERROR";
// | THREE.MeshPhongMaterial;
export interface SceneObjectMetadata {
	id: string;
	name: string;
	type: SceneObjectType;
}

export interface LabMesh extends SceneObjectMetadata {
	geometry: THREE.BufferGeometry;
	// material: LabMaterial;
	// TODO: Running into TS errors in the material forms bc of conflicting properties
	material: any;
	position: Position; // [x, y, z]
	scale: Scale; // [x, y, z]
	rotation: Rotation; // [x, y, z]
	castShadow: boolean;
	receiveShadow: boolean;
	bottomRadius?: number;
}
export interface LabLight extends SceneObjectMetadata {
	variant: LightType;
	color: THREE.Color;
	position: Position; // [x, y, z]
	intensity: number;
	groundColor?: THREE.Color;
	shadow: boolean;
	// TODO: shadow map size
}
export interface LabCamera extends SceneObjectMetadata {
	variant: CameraType;
	near: number;
	far: number;
	fov: number;
	top?: number;
	right?: number;
	bottom?: number;
	left?: number;
	position: Position; // [x, y, z]
}
export interface LabCanvas {
	id: string;
	type: SceneObjectType;
	background: THREE.Color;
	fog: THREE.FogExp2;
	fogColor: THREE.Color;
	fogDensity: number;
	antialias: boolean;
	physicallyCorrectLights: boolean;
	shadows: boolean;
}

export interface LabGLTF extends SceneObjectMetadata {
	//TODO: Loading status on the object or separate?
	model: any;
	animations: string[];
	source: string;
	position: Position; // [x, y, z]
	scale: Scale; // [x, y, z]
	rotation: Rotation; // [x, y, z]
}

export interface ActiveHotKeys {
	shift: boolean;
	space: boolean;
	up: boolean;
	down: boolean;
	right: boolean;
	left: boolean;
	x: boolean;
	y: boolean;
	z: boolean;
}

export interface LabMaterialProps {
	metalness?: number; // float 0.0 - 1.0
	roughness?: number; // float 0.0 - 1.0
	reflectivity?: number; // float 0.0 - 1.0
	wireframe?: boolean;
	color?: THREE.Color;
}

export interface LabOrbitControls extends SceneObjectMetadata {
	enabled: boolean;
	autoRotate: boolean;
	enableDamping: boolean;
	dampingFactor: number;
	enableZoom: boolean;
	autoRotateSpeed: number;
}
