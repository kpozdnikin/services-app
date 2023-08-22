const { resolve } = require('path');

module.exports = {
  stories: ['../src/**/*.story.mdx', '../src/**/*.story.@(js|jsx|ts|tsx)', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  webpackFinal: (config) => {
    // Default rule for images /\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/
    const fileLoaderRule = config.module.rules.find((rule) => rule.test && rule.test.test('.svg'));
    fileLoaderRule.exclude = /\.svg$/;

    config.module.rules.unshift({
      test: /\.svg$/,
      use: [
        {
          loader: require.resolve('react-svg-loader'),
          options: {
            svgo: {
              plugins: [
                {
                  removeViewBox: false,
                },
              ],
            },
          },
        },
      ],
    }, {
      test: /\.js$/,
      include: /@getsquire\/glue-ui/,
      loader: 'babel-loader',
      options: {
        plugins: ['@babel/plugin-proposal-export-namespace-from'],
      },
    }, {
      type: 'javascript/auto',
      test: /\.mjs$/,
      include: /node_modules/,
    });

    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        '@app': resolve(__dirname, '../src/'),
      },
    };

    return config;
  },
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
};
