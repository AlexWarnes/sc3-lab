import type { Position } from 'svelte-cubed/types/common';
import type { LabGLTF, LabLight, LabMesh } from '../models/models';
import { setGLTFStatus } from './GLTF';
import { addNewSceneObject } from './store';
import { deepCopy, uuid, zTimestamp } from './utils';

export const copyObject = (obj) => {
	const [pX, pY, pZ] = obj.position;
	const offsetPosition: Position = [pX + 2, pY, pZ];
	if (obj.type === 'MESH') {
		addNewSceneObject(copyMesh(obj, offsetPosition), true);
	} else if (obj.type === 'LIGHT') {
		// return copyLight
		addNewSceneObject(copyLight(obj, offsetPosition), true)
	} else if (obj.type === 'GLTF') {
		// return copyGLTF
		const newGLTF = copyGLTF(obj, offsetPosition)
		addNewSceneObject(newGLTF, true)
		setGLTFStatus(newGLTF.id, "EMPTY");
	}
};

const copyMesh = (mesh: LabMesh, offsetPosition): LabMesh => {
	let rotation = deepCopy(mesh.rotation);
	let scale = deepCopy(mesh.scale);
	return {
		...mesh,
		id: uuid(),
		position: [...offsetPosition] as Position,
		scale,
		rotation,
		name: `${mesh.name} COPY ${zTimestamp()}`,
		geometry: mesh.geometry.clone(),
		material: mesh.material.clone()
	};
};
const copyLight = (light: LabLight, offsetPosition): LabLight => {
	return {
		...light,
		id: uuid(),
		name: `${light.name} COPY ${zTimestamp()}`,
		position: [...offsetPosition] as Position,
	};
};

const copyGLTF = (gltf: LabGLTF, offsetPosition): LabGLTF => {
	let rotation = deepCopy(gltf.rotation);
	let scale = deepCopy(gltf.scale);

	return {
		...gltf,
		id: uuid(),
		position: [...offsetPosition] as Position,
		scale,
		rotation,
		name: `${gltf.name} COPY ${zTimestamp()}`,
		model: null,
	}
}
