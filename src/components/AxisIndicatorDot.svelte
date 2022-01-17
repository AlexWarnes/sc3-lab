<script lang="ts">
	export let axis: 'x' | 'y' | 'z';
</script>

<span class={`dot ${axis}`} />

<style>
  .dot {
    width: .5rem;
    height: .5rem;
    border-radius: 50%;
  }

  .dot.x {
    background-color: red;
    box-shadow: 0 0 8px 4px red;
  }
  .dot.y {
    background-color: limegreen;
    box-shadow: 0 0 8px 4px limegreen;
  }
  .dot.z {
    background-color: blue;
    box-shadow: 0 0 8px 4px blue;
  }
</style>