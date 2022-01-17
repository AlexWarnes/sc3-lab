
import * as THREE from 'three';
import type {
	GeometryType,
	LabMesh,
	MaterialType,
	LabMaterial,
	LabMaterialProps
} from '../models/models';
import { uuid, zTimestamp } from './utils';

export const mapToGeometry = (geoType: GeometryType): THREE.BufferGeometry => {
	switch (geoType) {
		case 'BOX':
			return new THREE.BoxBufferGeometry();
		case 'SPHERE':
			return new THREE.SphereBufferGeometry();
		case 'CYLINDER':
			return new THREE.CylinderBufferGeometry();
		case 'PLANE':
			return new THREE.PlaneBufferGeometry();
		default:
			console.log('Default Geometry indicates something is amiss...');
			return new THREE.BoxBufferGeometry();
	}
};

export const mapToMaterial = (matType: MaterialType): LabMaterial => {
	switch (matType) {
		case 'BASIC':
			return new THREE.MeshBasicMaterial({ color: new THREE.Color(0xff3e02) });
		case 'STANDARD':
			return new THREE.MeshStandardMaterial({ color: new THREE.Color(0xff3e02) });
		// case 'PHONG':
		// 	return new THREE.MeshPhongMaterial({color: new THREE.Color(0xff3e02)});
		default:
			console.log('Default Material indicates something is amiss...');
			return new THREE.MeshBasicMaterial({ color: new THREE.Color(0xff3e02) });
	}
};

const generateNewPlane = (): LabMesh => {
	return {
		id: uuid(),
		type: 'MESH',
		name: `MESH_PLANE (${zTimestamp()})`,
		geometry: mapToGeometry('PLANE'),
		material: mapToMaterial('STANDARD'),
		position: [0, 0, 0],
		scale: [5, 5, 1],
		rotation: [-Math.PI / 2, 0, 0],
		castShadow: false,
		receiveShadow: false,
	};
};

export const generateNewMesh = (type: GeometryType): LabMesh => {
	if (type === 'PLANE') {
		return generateNewPlane();
	}

	return {
		id: uuid(),
		type: 'MESH',
		name: `MESH_${type} (${zTimestamp()})`,
		geometry: mapToGeometry(type),
		material: mapToMaterial('STANDARD'),
		position: [
			-10 + Math.round(Math.random() * 20),
			-10 + Math.round(Math.random() * 20),
			-10 + Math.round(Math.random() * 20)
		],
		// position: [0, 0, 0],
		scale: [1, 1, 1],
		rotation: [0, 0, 0],
		castShadow: false,
		receiveShadow: false,
	};
};

export function txfrMaterialProperties(from: LabMaterial, to: LabMaterial): void {
	const matProps = extractMaterialProps(from);
	for (let key of Object.keys(matProps)) {
		if (to.hasOwnProperty(key)) {
			to[key] = from[key];
		}
	}
}

function extractMaterialProps(material: LabMaterial): LabMaterialProps {
	// metalness: MeshStandard
	// roughness: MeshStandard
	// reflectivity: Basic
	// wireframe: Basic, Standard
	// color: Basic, Standard
	if (material.type === 'MeshBasicMaterial') {
		return {
			// @ts-ignore
			reflectivity: material.reflectivity,
			wireframe: material.wireframe,
			color: material.color
		};
	} else if (material.type === 'MeshStandardMaterial')
		return {
			// @ts-ignore
			metalness: material.metalness || 0,
			// @ts-ignore
			roughness: material.roughness || 0,
			wireframe: material.wireframe,
			color: material.color
		};
}
