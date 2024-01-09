const { composePlugins, withNx } = require('@nx/webpack');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const webpackConfig = composePlugins(
  withNx({
    target: 'node',
    webpackConfig: (config) => {
      config.module = {
        rules: [
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          },
          {
            test: /\.(html|cs)$/,
            loader: 'ignore-loader'
          }
        ],
      };

      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /^(aws-sdk|mock-aws-s3|nock)$/
        })
      );

      return config;
    },
    externals: [nodeExternals()],
  })
);

module.exports = webpackConfig;
