<script>
	import { fade } from 'svelte/transition';

	import { showBackgroundLoading } from '../data/store';
</script>

{#if $showBackgroundLoading}
	<div class="background-loading-box" transition:fade>
		<div class="spinner" />
		<p class="loading-text">LOADING...</p>
	</div>
{/if}

<style>
	@keyframes Spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
	.background-loading-box {
		position: absolute;
		bottom: 0rem;
		left: calc(100% + 1rem);
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #fafbfc;
		background-color: var(--canvas-overlay);
		padding: 0.5rem 0.75rem;
	}

	.spinner {
		width: 0.75rem;
		height: 0.75rem;
		border: 2px solid var(--svelte-orange);
		border-top: 2px solid transparent;
		border-radius: 50%;
		animation: Spin 400ms linear 0s infinite forwards;
	}

	.loading-text {
		margin: 0 0 0 0.75rem;
		font-size: 0.75rem;
	}
</style>
