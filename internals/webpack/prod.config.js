const { resolve } = require('path');

const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const { merge } = require('webpack-merge');

const baseConfig = require('./base.config');
const federationSettings = require('./moduleFederationSettings');

const ModuleFederationPlugin = webpack.container.ModuleFederationPlugin;

module.exports = merge(baseConfig, {
  mode: 'production',
  entry: './index.tsx',
  output: {
    filename: 'js/bundle.[contenthash].min.js',
    path: resolve(__dirname, '../../dist'),
  },
  module: {
    rules: [
      {
        test: [/\.jsx?$/, /\.tsx?$/],
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },
  devtool: 'source-map',
  plugins: [
    process.env.FEDERATED ? new ModuleFederationPlugin(federationSettings.prod) : null,
    new CopyPlugin({
      patterns: [
        {
          from: resolve(__dirname, '../../static'),
          to: resolve(__dirname, '../../dist'),
        },
      ],
    }),
  ].filter(Boolean),
});
