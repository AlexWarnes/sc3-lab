import type { LabOrbitControls } from "../models/models";
import { uuid } from "./utils";

export const generateNewOrbitCtl =(): LabOrbitControls => {
  return {
    id: uuid(),
		type: 'ORBIT_CONTROLS',
		name: "ORBIT CONTROLS",
    enabled: true,
    enableZoom: true,
    enableDamping: true,
    dampingFactor: .1,
    autoRotate: false,
    autoRotateSpeed: 2,
  }
}