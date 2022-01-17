import type { ActiveHotKeys } from '../models/models';
import { writable } from 'svelte/store';

const initialKeyState: ActiveHotKeys = {
	shift: false,
	space: false,
	up: false,
	down: false,
	right: false,
	left: false,
	x: false,
	y: false,
	z: false
};

// TODO:
// ControlRight
// KeyR rotation
// KeyP position
// KeyS scale
// KeyX x-axis
// KeyY y-axis
// KeyZ z-axis
// MetaLeft
// MetaRight
// AltLeft
// AltRight
// ControlLeft
export const activeHotKeys = writable<ActiveHotKeys>(initialKeyState);

export const setKey = (key: keyof ActiveHotKeys, status: boolean) => {
	activeHotKeys.update((hotkeys) => {
      hotkeys[key] = status;
      return hotkeys;
	});
};
export const handleKeydown = (evt) => {
	switch (evt.code) {
		case 'ShiftLeft':
			setKey('shift', true);
			break;
		case 'ShiftRight':
			setKey('shift', true);
			break;
		case 'Shift':
			setKey('shift', true);
			break;
		case 'Space':
			setKey('space', true);
			break;
		case 'ArrowUp':
			setKey('up', true);
			break;
		case 'ArrowRight':
			setKey('right', true);
			break;
		case 'ArrowDown':
			setKey('down', true);
			break;
		case 'ArrowLeft':
			setKey('left', true);
			break;
		default:
			// console.log('DEFAULT KEYDOWN');
	}
};
export const handleKeyup = (evt) => {
	switch (evt.code) {
		case 'ShiftLeft':
			setKey('shift', false);
			break;
		case 'ShiftRight':
			setKey('shift', false);
			break;
		case 'Shift':
			setKey('shift', false);
			break;
		case 'Space':
			setKey('space', false);
			break;
		case 'ArrowUp':
			setKey('up', false);
			break;
		case 'ArrowRight':
			setKey('right', false);
			break;
		case 'ArrowDown':
			setKey('down', false);
			break;
		case 'ArrowLeft':
			setKey('left', false);
			break;
		default:
			// console.log('DEFAULT KEYUP');
	}
};
