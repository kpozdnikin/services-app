const { join, resolve } = require('path');

const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const { merge } = require('webpack-merge');

const baseConfig = require('./base.config');
const federationSettings = require('./moduleFederationSettings');

const ModuleFederationPlugin = webpack.container.ModuleFederationPlugin;

const port = process.env.PUBLIC_PORT || 3003;

module.exports = merge(baseConfig, {
  mode: 'development',
  entry: ['react-hot-loader/patch', './index.tsx'],
  module: {
    rules: [
      {
        test: [/\.jsx?$/, /\.tsx?$/],
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  devServer: {
    hot: true,
    port: port,
    historyApiFallback: true,
    contentBase: join(process.cwd(), './build'),
    writeToDisk: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    process.env.FEDERATED ? new ModuleFederationPlugin(federationSettings.dev) : null,
    new webpack.HotModuleReplacementPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: resolve(__dirname, '../../static'),
          to: resolve(__dirname, '../../build'),
        },
      ],
    }),
  ].filter(Boolean),
});
