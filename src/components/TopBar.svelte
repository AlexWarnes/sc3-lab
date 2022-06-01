<nav>
  <a href="/#/" class="logo-link" title="Home" aria-label="Home">
    <img
      class="sc3lab-icon"
      src="/assets/view3d.svg"
      alt="sc3lab logo"
      width="24"
    />
    <span>SC3 LAB</span>
  </a>
  <!-- <a href="/#/lab">LAB</a> -->
  <span class="flex-spacer" />
  <a href="https://github.com/AlexWarnes/sc3-lab" title="GitHub" aria-label="GitHub">
    <img
      class="link-icon"
      src="/assets/githubLogo.svg"
      alt="github logo"
      width="24"
    />
  </a>
  <a href="https://twitter.com/a_warnes" title="Twitter" aria-label="Twitter">
    <img
      class="link-icon"
      src="/assets/twitterLogo.svg"
      alt="twitter logo"
      width="24"
    />
  </a>
</nav>

<style>
  nav {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    padding: 1rem 1.75rem;
    background: #fafbfc;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    z-index: 5;
  }

  a {
    color: var(--threejs-black);
    text-decoration: none;
  }
  a:visited {
    color: var(--threejs-black);
  }

  .logo-link {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-grow: 1;
	}
	.logo-link img {
		margin: 0 1rem 0 0;
	}

  .link-icon {
    margin: 0 1rem;
  }

  .flex-spacer {
    flex-grow: 1;
  }
</style>
