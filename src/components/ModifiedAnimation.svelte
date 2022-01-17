<script>
	import { setup } from 'svelte-cubed/utils/context';
	import * as THREE from 'three';
	export let selectedClips;
	export let allClips;
	export let time = 0;
	export let timeScale = 1;
	export let weight = 1;
	const ROOT = {};
	const PARENT = {};
	const { root, parent } = setup();

	const mixer = new THREE.AnimationMixer(parent);
	$: {
		allClips.forEach(modelClip => {
			let action = mixer.clipAction(modelClip)
			if(selectedClips.includes(modelClip.uuid)){
				action.weight = weight;
				action.play();
			} else {
				action.stop();
			}
		})
		// TODO uncache stuff
	}
	$: {
		mixer.timeScale = timeScale;
		mixer.setTime(time);
		root.invalidate();
	}
</script>
