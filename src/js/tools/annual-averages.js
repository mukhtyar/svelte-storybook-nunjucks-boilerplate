import ButtonComponent from "./../components/Button.svelte";

document.addEventListener('DOMContentLoaded', () => {
	new ButtonComponent({
	  target: document.querySelector("#mapContainer"),
	  props: {
	    text: 'Annual Averages Button'
	  }
	});
});