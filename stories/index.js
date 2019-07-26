import { storiesOf, addDecorator } from '@storybook/svelte'
import { action } from '@storybook/addon-actions'
import { withKnobs, boolean, text } from '@storybook/addon-knobs'
import { withA11y } from '@storybook/addon-a11y'

import Button from '../src/js/components/Button.svelte'

addDecorator(withA11y)
addDecorator(withKnobs)

storiesOf('Button', module)
  .add('default', () => ({
    Component: Button,
    on: { click: action('clicked') },
  }))
  .add('with text', () => ({
    Component: Button,
    props: { text: 'Hello Button' },
    on: { click: action('clicked') },
  }))
  .add('with some emoji', () => ({
    Component: Button,
    props: {
      text: '😀 😎 👍 💯',
    },
    on: { click: action('clicked') },
  }));
