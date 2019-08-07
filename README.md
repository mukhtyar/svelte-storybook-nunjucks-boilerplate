
### A boilerplate for exploring Svelte and Storybook

[Svelte](https://svelte.dev/) is a new component framework that runs at build time, converting your JavaScript components into highly efficient imperative code that surgically updates the DOM. With [Storybook](https://storybook.js.org/) you can visualize different states of your UI components and develop them outside of your application.

I developed this boilerplate to understand how both these libraries work within a build environment using Webpack, SCSS and Nunjucks for a website that has a combination of static pages and apps. The static page generation in this boilerpalte is specific to my needs, it can be easily replaced with other templating engines &/or loaders.

### Features:

* Built with [Webpack 4](https://webpack.js.org/)
* ES6 Support via [Babel 7](https://babeljs.io/)
* [Nunjucks](https://mozilla.github.io/nunjucks/) templates and support for multiple static pages via a custom nunjucks-html-loader forked from [nunjucks-html-loader](https://github.com/ft-interactive/nunjucks-html-loader)
* SCSS support via [sass-loader](https://github.com/jtangelder/sass-loader)
* Styling using CSS framework [Bulma](https://bulma.io/)
* Linting via [eslint-loader](https://github.com/MoOx/eslint-loader)
* Map component using [Leaflet](https://leafletjs.com/) and [Svelte](https://svelte.dev/)

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

#### Build for Production

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
- [Killer Storybook Config](https://github.com/hghazni/killer-storybook-config)
- [Starter Kit from Financial Times](https://github.com/ft-interactive/starter-kit)
- [Vue components for MapboxGL](https://github.com/openearth/vue2mapbox-gl)
- [Svelte example](https://svelte.dev/examples#context-api)
- [Stack Overflow](https://stackoverflow.com/)
- Svelte and Storybook Docs


