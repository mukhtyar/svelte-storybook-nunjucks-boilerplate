import './../styles/main.scss';
import ButtonComponent from "./components/Button.svelte";


document.addEventListener('DOMContentLoaded', () => {
	new ButtonComponent({
	  target: document.querySelector("#root"),
	  props: {
	    text: 'Svelte Button'
	  }
	});
});
