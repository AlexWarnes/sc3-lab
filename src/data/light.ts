import * as THREE from 'three';
import type { LightType, LabLight } from '../models/models';
import { uuid, zTimestamp } from './utils';

export const generateNewLight = (variant: LightType): LabLight => {
	return {
		id: uuid(),
		type: 'LIGHT',
		name: `LIGHT_${variant} (${zTimestamp()})`,
		variant,
		color: new THREE.Color(0xffffff),
		position: [0, 10, 10],
		intensity: .75,
		groundColor: new THREE.Color(0xffffff),
		shadow: false
	};
};
