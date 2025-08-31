const path = require('path');
const webpack = require('webpack');

const libraryName = 'AvailityReactstrapValidation';

module.exports = function(env) {
  const outputFile = env === 'production' 
    ? libraryName.toLowerCase() + '.min.js'
    : libraryName.toLowerCase() + '.js';

  const config = {
    mode: env === 'production' ? 'production' : 'development',
    devtool: 'source-map',
    entry: [path.resolve(__dirname, 'src/index.js')],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: outputFile,
      library: {
        name: libraryName,
        type: 'umd',
        umdNamedDefine: true,
      },
      globalObject: 'this',
      clean: true,
    },
    externals: [
      {
        react: {
          root: 'React',
          commonjs2: 'react',
          commonjs: 'react',
          amd: 'react',
        },
      },
      {
        'react-dom': {
          root: 'ReactDOM',
          commonjs2: 'react-dom',
          commonjs: 'react-dom',
          amd: 'react-dom',
        },
      },
      {
        'reactstrap': {
          root: 'Reactstrap',
          commonjs2: 'reactstrap',
          commonjs: 'reactstrap',
          amd: 'reactstrap',
        },
      },
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
        'availity-reactstrap-validation': path.resolve(__dirname, 'src/index'),
      },
      extensions: ['.js', '.jsx', '.json'],
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env),
      }),
    ],
  };

  return config;
};
