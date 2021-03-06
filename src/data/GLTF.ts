import type { GLTFStatus, LabGLTF } from "../models/models";
import { GLTFStatusTracker, sceneObjects } from "./store";
import { uuid, zTimestamp } from "./utils";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export const generateNewGLTF = (): LabGLTF => {
  return {
    id: uuid(),
    type: "GLTF",
    name: `GLTF (${zTimestamp()})`,
    position: [0, 0, 0],
    scale: [1, 1, 1],
    rotation: [0, 0, 0],
    source: "",
    model: null,
    animations: [],
  };
};

export const setGLTFStatus = (id, status: GLTFStatus): void => {
  GLTFStatusTracker.update((current) => {
    // if its there, update it
    current[id] = status;
    return current;
    // TODO: remove IDs when GLTF objects are deleted
  });
};

export const stopTrackingGLTF = (targetID) => {
  GLTFStatusTracker.update((current) => {
    let activeGLTF = {};
    for (let [id, value] of Object.entries(current)) {
      if (id !== targetID) {
        activeGLTF[id] = value;
      }
    }
    return activeGLTF;
  });
};

// export const generateRawGitURL = (name: string) => {
// 	return `https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/${name}.glb`;
// };

export const setGLTFSource = (id, source: string): void => {
  sceneObjects.update((current) => {
    let gltf = current.find((obj) => obj.id === id);
    if (gltf) {
      gltf.source = source;
      return current;
    } else {
      console.log("GLTF not found.");
    }
  });
};

export function loadGLTF(gltf: LabGLTF, callback): void {
    const loader = new GLTFLoader();
    loader.load(gltf.source, callback)

}
// export function loadGLTF(gltf: LabGLTF): Promise<any> {
//   if (gltf.source) {
//     const loader = new GLTFLoader();

//     return loader.loadAsync(gltf.source);
//   } else {
//     return new Promise((_, rej) => rej({ status: "EMPTY", data: null }));
//   }
// }

export const addModelToGLTFSceneObject = (objID, data) => {
  sceneObjects.update((current) => {
    let gltf = current.find((obj) => obj.id === objID);
    if (gltf) {
      gltf.model = data;
      gltf.animations = [];
      return current;
    } else {
      console.log("GLTF not found.");
    }
    // return current.map(obj => {
    // if (obj.id === id){
    // obj.status = status;
    // }
    // return obj;
    // })
  });
};

