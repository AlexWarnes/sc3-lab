<script>
	import Copy from '../icons/Copy.svelte';

	import { targetID } from '../data/store';
	import GPS from '../icons/GPS.svelte';
	import IconButton from './IconButton.svelte';
	import { copyObject } from '../data/copy';
	export let obj;
</script>

<div class="row">

	<IconButton on:click={() => ($targetID = $targetID === obj.id ? null : obj.id)}>
		<GPS height="1rem" />
	</IconButton>
	<IconButton on:click={() => copyObject(obj)}>
		<Copy height="1rem" />
	</IconButton>
	
</div>

<style>
	.row {
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 0 .5rem .5rem;
	}
</style>