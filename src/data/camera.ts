import * as THREE from 'three';
import type { CameraType, LabCamera } from '../models/models';
import { uuid } from './utils';

export const generateNewCamera = (variant: CameraType): LabCamera => {
	return {
		id: uuid(),
		type: 'CAMERA',
		name: `Camera: ${variant}`,
		variant,
		near: 0.1,
		far: 400,
		fov: 55,
		top: 1,
		right: 1,
		bottom: 1,
		left: 1,
		position: [1, 3, 8]
	};
};
