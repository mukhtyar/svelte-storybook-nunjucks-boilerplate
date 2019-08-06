import { configure } from '@storybook/svelte';

function loadStories() {
  require('../stories/index.stories.js');
}

configure(loadStories, module);
