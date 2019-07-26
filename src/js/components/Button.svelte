<button class="button is-primary is-large" on:click={onClick}>
    {text}
</button>

<style>
  .button {
    color: black;
  }
</style>

<script>
  import { createEventDispatcher } from 'svelte';
  console.log('reached here');

  export let text = 'Default';

  const dispatch = createEventDispatcher();

  function onClick(event) {
    console.log('button clicked');
    dispatch('click', event)
  }
</script>
