import 'leaflet/dist/leaflet.css';
import MapComponent from "./../components/Map.svelte";

document.addEventListener('DOMContentLoaded', () => {
	new MapComponent({
	  target: document.querySelector("#mapContainer"),
	  props: {
	    lat: 40.5,
      lon: -120.5,
      zoom: 5,
	  }
	});
});
