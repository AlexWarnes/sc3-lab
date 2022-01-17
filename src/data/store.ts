import type {
	GeometryType,
	HelperSettings,
	LabCamera,
	LabCanvas,
	LabOrbitControls,
	MaterialType,
	SceneObject
} from '../models/models';
import { derived, get, writable } from 'svelte/store';
import { generateNewCamera } from './camera';
import { generateNewCanvas } from './canvas';
import { generateNewLight } from './light';
import { generateNewMesh, mapToGeometry, mapToMaterial, txfrMaterialProperties } from './mesh';
import { generateNewOrbitCtl } from './orbit';
import { get_store_value } from 'svelte/internal';

const initialHelperSettings: HelperSettings = {
	showAxes: true,
	showGrid: true,
	showControls: true,
	showCode: false
};

export const canvas = writable<LabCanvas>(generateNewCanvas());
export const camera = writable<LabCamera>(generateNewCamera('PERSPECTIVE'));
export const orbitControls = writable<LabOrbitControls>(generateNewOrbitCtl());
export const GLTFStatusTracker = writable<any>({});
const initialSceneObjects: SceneObject[] = [
	generateNewLight('DIRECTIONAL'),
	generateNewLight('AMBIENT'),
	generateNewMesh('BOX'),
	generateNewMesh('CYLINDER'),
	generateNewMesh('SPHERE')
];
export const GLTFModelLibrary = writable({})
export const helperSettings = writable<HelperSettings>(initialHelperSettings);
export const sceneObjects = writable<any[]>(initialSceneObjects);
export const addNewSceneObject = (newObj, setSelected: boolean = true): void => {
	sceneObjects.update((current) => [...current, newObj]);

	// TODO: Auto select the new object?
	if (setSelected) {
		selectedObjects.set([newObj.id]);
	}
};

export const targetID = writable<null | string>(null)
export const targetPosition = derived([sceneObjects, targetID], ([$objs, $targetID]) => {
	const target = $objs.find(obj => obj.id === $targetID);
	return target && target.position ? target.position : [0, 0, 0]
})

export const selectedObjects = writable<string[]>([]);

// TODO: use this store to show/populate/hide editor
export const selectedObjData = derived([selectedObjects, sceneObjects], ([$selectID, $objects]) => {
	return $objects.find((obj) => obj.id === $selectID[0]);
});
// TODO: nice to have the camera move when new objects are selected
// export const cameraTarget = writable<Position>([0, 0, 0]);

export const setHovered = (objID: string, status: boolean) => {
	// Don't do anything if canvas is hovered?

	sceneObjects.update((current) => {
		return current.map((obj) => {
			if (objID === obj.id) {
				obj.isHovered = status;
			} else {
				obj.isHovered = false;
			}
			return obj;
		});
	});
};

export const objIsSelected = (id: string) => {
	const currentSelection = get(selectedObjects);
	return currentSelection.length === 1 && currentSelection.includes(id);
};

export const deleteObjectByID = (targetID) => {
	sceneObjects.update((objs) => objs.filter((obj) => obj.id !== targetID));

	// TODO: handle cleanup side effects:
	// 1. Remove unused GLTF models stored in the library
};

export const trackGLTFStatus = (id) => {
	return derived([GLTFStatusTracker], ([$GLTFStatusTracker]) => $GLTFStatusTracker[id] || 'EMPTY');
};
export const showBackgroundLoading = derived([GLTFStatusTracker], ([$GLTFStatusTracker]) =>
	Object.values($GLTFStatusTracker).includes('LOADING')
);

// TODO: Saving this if I can ever figure out how to clone them
export const addGLTFModelToLibrary = (sourceKey, data) => {
	GLTFModelLibrary.update(current => {
		console.log("updating model lib:", {current, sourceKey, data})
		if (!current.hasOwnProperty(sourceKey)) {
			current[sourceKey] = data;
			return current;
		}
	})
}


export const updateGeometryByID = (meshID: string, geoType: GeometryType): void => {
	sceneObjects.update((current) => {
		return current.map((obj) => {
			if (obj.id === meshID) {
				obj.geometry = mapToGeometry(geoType);
			}
			return obj;
		});
	});
};

export const updateMaterialByID = (meshID: string, matType: MaterialType): void => {
	sceneObjects.update((current) => {
		return current.map((obj) => {
			if (obj.id === meshID) {
				const previousMaterial = obj.material;
				const nextMaterial = mapToMaterial(matType);
				txfrMaterialProperties(previousMaterial, nextMaterial);
				obj.material = nextMaterial;
			}
			return obj;
		});
	});
};
