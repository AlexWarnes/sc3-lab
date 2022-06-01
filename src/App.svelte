<script>
  import Router from "svelte-spa-router";
  import routes from "./routes/routes";
  import TopBar from "./components/TopBar.svelte";
</script>

<TopBar />

<main>
  <Router {routes} />
</main>

<style>
  main {
    padding: 60px 0 0;
    width: 100%;
    height: 100%;
  }
</style>