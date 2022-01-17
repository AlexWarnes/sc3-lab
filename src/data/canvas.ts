import type { LabCanvas } from '../models/models';
import * as THREE from 'three';

export const generateNewCanvas = (): LabCanvas => {
	return {
		id: 'CANVAS',
		type: 'CANVAS',
		background: new THREE.Color(0x676779),
		fog: null,
		fogColor: null,
		fogDensity: null,
		antialias: true,
		physicallyCorrectLights: false,
		shadows: true
	};
};
