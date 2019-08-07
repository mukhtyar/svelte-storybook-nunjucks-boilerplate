import { storiesOf, addDecorator } from '@storybook/svelte';
import { action } from '@storybook/addon-actions';
import { withKnobs, number, text } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';

import '../src/styles/main.scss';

import Button from '../src/js/components/Button.svelte';

import 'leaflet/dist/leaflet.css';
import { L, key } from '../src/js/helpers/leaflet.js';
import { onMount, setContext } from 'svelte';
import Map from '../src/js/components/Map.svelte';

const mapTemplate = `<div id="mapContainer" class="container" style="height:400px;"></div>`;

addDecorator(withA11y);
addDecorator(withKnobs);

storiesOf('Button', module)
  .add('default', () => ({
    Component: Button,
    on: { click: action('clicked') },
  }))
  .add('with text', () => ({
    Component: Button,
    props: { 
      text: text('Text', 'Hello Storybook'),
    },
    on: { click: action('clicked') },
  }))
  .add('with some emoji', () => ({
    Component: Button,
    props: {
      text: '😀 😎 👍 💯',
    },
    on: { click: action('clicked') },
  }));

storiesOf('Map', module)
  .add('map', () => ({
    Component: Map,
    props: {
      lat: 40.5,
      lon: -120.5,
      zoom: 5,
    },
    template: mapTemplate,
  }))
  .add('with different basemap', () => ({
    Component: Map,
    props: {
      lat: 40.5,
      lon: -120.5,
      zoom: number('Zoom', 10),
      basemap: 'https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg'
    },
    template: mapTemplate,
  }));
