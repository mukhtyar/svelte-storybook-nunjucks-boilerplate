import './../styles/main.scss';
import ButtonComponent from "./components/Button.svelte";


const app = new ButtonComponent({
  target: document.querySelector("#root"),
  props: {
    text: 'Svelte Button'
  }
});

window.app = app;

export default app;
