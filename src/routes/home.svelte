<script>
  import HeaderScene from "../components/HeaderScene.svelte";
  import HeaderLogoBox from "../components/HeaderLogoBox.svelte";
  import LinkBtn from "../components/LinkBtn.svelte";
  import ChevronRight from "../icons/ChevronRight.svelte";
  // import TopBar from "../components/TopBar.svelte";
</script>

<!-- <TopBar /> -->
<header>
  <h1>SC3<span class="lab">LAB</span></h1>
  <span class="spacer"></span>
  <div class="description">
    <p>
      <span class="action-word">Experiment</span> with 3D scenes using svelte-cubed
      and three.js
    </p>
    <p>
      <span class="action-word">Learn</span> basic interactions between light, geometry,
      and material
    </p>
    <p><span class="action-word">Generate</span> your code</p>
  </div>

  <LinkBtn href="/#/lab" background="var(--svelte-orange)"
    ><span>Go to the Lab</span>
    <ChevronRight height="16" />
  </LinkBtn>
  <HeaderScene />
</header>
<HeaderLogoBox />

<style>
  header {
    position: relative;
    width: 100%;
    min-height: 80vh;
    padding: calc(2% + 60px) 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fafbfc;
    /* background-color: #676779;
		background: radial-gradient(
				34.14% 72.25% at 47.58% 31.75%,
				rgba(232, 244, 255, 0.52) 0%,
				rgba(255, 255, 255, 0) 100%
			),
			linear-gradient(
				92.4deg,
				#d1d4d7 14.67%,
				rgba(238, 247, 255, 0.48) 54.37%,
				rgba(206, 216, 224, 0.62) 92.49%
			),
			linear-gradient(0deg, #dbe7ef, #dbe7ef); */
    overflow: hidden;
    z-index: 1;
  }

  header p {
    line-height: 1.5rem;
    font-size: 1rem;
  }

  header .spacer {
    flex-grow: 1;
  }
  .action-word {
    font-weight: 600;
    text-transform: uppercase;
    font-size: 18px;
  }
  h1 {
    font-size: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 0;
    /* color: var(--threejs-black); */
  }

  h1 .lab {
    color: var(--svelte-orange);
  }
</style>
