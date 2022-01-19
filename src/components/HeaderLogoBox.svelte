<script>
  import LinkBtn from "../components/LinkBtn.svelte";
  import ChevronRight from "../icons/ChevronRight.svelte";
</script>

<div class="img-box">
  <div class="col">
    <img
      class="watermark svelte"
      src="/assets/svelteLogo.svg"
      alt="svelte logo"
      height="48px"
    />

    <LinkBtn href="https://svelte.dev/" background="var(--threejs-black)"
      ><span>Learn Svelte</span>
      <ChevronRight height="16" />
    </LinkBtn>
  </div>
  <div class="col">
    <img
      class="watermark threejs"
      src="/assets/threejsLogo.svg"
      alt="threejs logo"
      height="48px"
    />

    <LinkBtn href="https://threejs.org/" background="var(--threejs-black)">
      <span class="threejs-btn-text">Learn three.js</span>
      <ChevronRight height="16" />
    </LinkBtn>
  </div>
  <div class="col">
    <img
      class="watermark svelte-cubed"
      src="/assets/vector.svg"
      alt="svelte logo"
      height="48px"
    />

    <LinkBtn href="https://svelte-cubed.vercel.app/" background="var(--threejs-black)"
      ><span>Learn svelte-cubed</span>
      <ChevronRight height="16" />
    </LinkBtn>
  </div>
</div>

<style>
  .img-box {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    flex-wrap: wrap;
    margin: -4rem auto 0;
    z-index: 10;
    background: #fafbfc;
    border-radius: 4px;
    padding: 1rem 2rem;
    border: 2px solid #444;
    width: 95%;
    max-width: 600px;
    position: relative;
  }
  .col {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1rem;
  }
  .watermark {
    opacity: 0.75;
    margin: 0 0 1rem 0;
  }
  .watermark.svelte {
    width: 40px;
    vertical-align: top;
  }
  .watermark.threejs {
    width: 40px;
    vertical-align: bottom;
  }
  .watermark.svelte-cubed {
    width: 40px;
    vertical-align: bottom;
    color: var(--svelte-orange);
  }
</style>
