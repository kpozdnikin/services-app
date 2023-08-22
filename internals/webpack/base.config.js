const { resolve, join } = require('path');
const childProcess = require('child_process');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const packageJson = require('../../package.json');
const getDotenvVars = require('../utils/env');

const dotenvVars = getDotenvVars();

const publicPath = `${dotenvVars.raw.PUBLIC_DEPLOYMENT_URL}/`;

const commitHash = childProcess.execSync('git rev-parse --short HEAD').toString().trim();
const pkgVersion = packageJson.version;

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@app': resolve(__dirname, '../../src/'),
      'react-dom': '@hot-loader/react-dom',
    },
  },
  context: resolve(__dirname, '../../src'),
  output: {
    publicPath,
    uniqueName: 'services',
    path: join(process.cwd(), './build'),
  },
  module: {
    rules: [
      {
        test: /bootstrap\.tsx$/,
        loader: 'bundle-loader',
        options: {
          lazy: true,
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              insert: function (element) {
                // we use it to intercept styles which will be inserted in shadow root at runtime
                const styles = (window.__tcs_web_services_shadow_styles =
                  window.__tcs_web_services_shadow_styles || []);
                styles.push(element);
              },
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        exclude: [resolve(__dirname, '../../src/styles/vendorStyles')],
        use: [
          'file-loader?hash=sha512&digest=hex&name=img/[contenthash].[ext]',
          'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false',
        ],
      },
      {
        test: /\.svg$/,
        exclude: [resolve(__dirname, '../../src/styles/vendorStyles')],
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true, // true outputs JSX tags
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
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        include: [resolve(__dirname, '../../src/styles/vendorStyles')],
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html.ejs',
      appRootId: process.env.PUBLIC_APP_ROOT_ID,
    }),
    new webpack.DefinePlugin({
      'process.env.VERSION': JSON.stringify(`${pkgVersion}_${commitHash}`),
      ...dotenvVars.stringified,
    }),
  ].filter(Boolean),
  performance: {
    hints: false,
  },
};
