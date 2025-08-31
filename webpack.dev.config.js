const path = require('path');
const webpack = require('webpack');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const env = process.env.WEBPACK_BUILD || 'development';

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackDevConfig = require('./webpack.base.config')('development');
const webpackProdConfig = require('./webpack.base.config')('production');

const paths = [
  '/',
  '/components/',
  '/components/validators/',
  '/components/checkboxes/',
  '/components/avform/',
  '/404.html',
];

const basepath = env === 'production' ? process.env.BASEPATH || '/availity-reactstrap-validation/' : '/';

const config = [{
  mode: env === 'production' ? 'production' : 'development',
  devtool: 'source-map',
  devServer: {
    static: './build',
    stats: {
      chunks: false,
    },
  },
  entry: {
    main: './docs/lib/app.js',
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  output: {
    filename: 'bundle.js',
    publicPath: basepath,
    path: path.resolve(__dirname, 'build'),
    library: {
      type: 'umd',
    },
    clean: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{ from: './docs/static', to: 'assets' }]
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
    new StaticSiteGeneratorPlugin('main', paths, {basename: basepath}),
    new MiniCssExtractPlugin({
      filename: '/assets/style.css'
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
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      'bootstrap-css': path.join(__dirname,'node_modules/bootstrap/dist/css/bootstrap.css'),
      'availity-reactstrap-validation': path.resolve(__dirname, 'src'),
    },
  },
}];

if (env === 'development') {
  config.push(webpackDevConfig);
  config.push(webpackProdConfig);
}

module.exports = config;
