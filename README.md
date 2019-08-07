
### A boilerplate for exploring Svelte and Storybook

[Svelte](https://svelte.dev/) is a new component framework that runs at build time, converting your JavaScript components into highly efficient imperative code that surgically updates the DOM. With [Storybook](https://storybook.js.org/) you can visualize different states of your UI components and develop them outside of your application.

This boilerplate was developed to understand how both these libraries would work within a build environment using Webpack, SCSS and Nunjucks.

### Features:

* Built using via [Webpack 4](https://webpack.js.org/)
* ES6 Support via [Babel 7](https://babeljs.io/)
* Nunjucks templates and support for multiple static pages via a custom nunjucks-html-loader forked from [nunjucks-html-loader](https://github.com/ft-interactive/nunjucks-html-loader)
* SCSS Support via [sass-loader](https://github.com/jtangelder/sass-loader)
* Styling via CSS framework [Bulma](https://bulma.io/)
* Linting via [eslint-loader](https://github.com/MoOx/eslint-loader)
* Map component using Leaflet JS and Svelte (https://leafletjs.com/)

#### Setup

Download or clone the repository and install dependencies.
```
cd svelte-storybook-nunjucks-boilerplate
npm install
```

#### Run for Development

```
npm run start
```

#### Run for Production

```
npm run build
```

#### Run Storybook

```
npm run storybook
```

#### Build a static Storybook site

```
npm run build-storybook
```

#### Acknowledgements

This project owes a lot to following projects:
- [Killer Storybook Config] (https://github.com/hghazni/killer-storybook-config)
- [Starter Kit from Financial Times] (https://github.com/ft-interactive/starter-kit)
- [Vue components for MapboxGL](https://github.com/openearth/vue2mapbox-gl)
- [Svelte example](https://svelte.dev/examples#context-api)
- [Stack Overflow](https://stackoverflow.com/)
- Svelete and Storybook Docs


