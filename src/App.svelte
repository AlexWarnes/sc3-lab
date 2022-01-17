<script>
  import Router from "svelte-spa-router";
  import routes from "./routes/routes";

  import TopBar from "./components/TopBar.svelte";
</script>

<TopBar />
<Router {routes} />
