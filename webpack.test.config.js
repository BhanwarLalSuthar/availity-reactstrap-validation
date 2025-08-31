const path = require('path');
const webpack = require('webpack');

const webpackConfig = {
  target: 'node',
  mode: 'development',
  context: path.join(__dirname, './src'),
  devtool: 'cheap-module-source-map',
  entry: {
    'availity-reactstrap-validation': ['./index.js']
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': 'test'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(json)$/,
        type: 'json',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      'availity-reactstrap-validation': path.resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.jsx', '.json'],
  },
  externals: {
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
    'react/addons': true,
  },
  output: {
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]',
  },
  webpackServer: {
    noInfo: true,
  },
};

module.exports = webpackConfig;
