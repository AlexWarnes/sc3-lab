<script>

</script>

<button type="button" on:click>
	<slot />
</button>
<style>
	button {
		padding: 0.5rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-radius: 50%;
		margin: 0;
		border: none;
		background-color: var(--canvas-overlay-hover);
		color: #fafbfc;
		transition: background-color 0.2s ease;
	}
	button:hover {
		cursor: pointer;
		background-color: var(--canvas-overlay);
	}
</style>
