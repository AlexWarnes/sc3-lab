<script lang="ts">
	import { clickOutside } from '../actions/ClickOutside';

	import { slide } from 'svelte/transition';
	// TODO: add open direction
	// TODO: close on click outside

	export let open: boolean = false;
</script>

{#if open}
	<div class="menu-container" in:slide use:clickOutside on:clickOutside={() => (open = false)}>
		<slot />
	</div>
{/if}

<style>
	.menu-container {
		position: absolute;
		background: var(--canvas-overlay);
		transform-origin: top left;
		/* open right */
		top: 0;
		left: 110%;
	}
</style>
