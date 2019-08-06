<style>
  div {
    width: 100%;
    height: 100%;
    min-height: 500px;
  }
</style>

<script>
  import { onMount, setContext } from 'svelte';
  import { L, key } from './../helpers/leaflet.js';

  setContext(key, {
    getMap: () => map
  });

  export let lat;
  export let lon;
  export let zoom;
  export let basemap = 'https://cartocdn_{s}.global.ssl.fastly.net/base-antique/{z}/{x}/{y}.png';

  let container;
  let map;

  onMount(() => {
    map = L.map(container, {
      center: [lat, lon],
      zoom,
    });

    L.tileLayer(basemap).addTo(map);

    return () => {
      map.remove();
    };
  });
</script>

<div bind:this={container}>
  {#if map}
    <slot></slot>
  {/if}
</div>
