const path = require('path');

// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => ({
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // Make whatever fine-grained changes you need
  // Modified using https://stackoverflow.com/questions/55119427/can-i-use-css-modules-with-storybook-5-react-flavour
  ...config,
  module: {
    ...config.module,
    rules: [
      {
        test: /\.svelte$/,
        loader: 'svelte-loader',
        options: {
          emitCss: true,
        }
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { url: false, sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } }
        ],
      }
    ]
  }
});
