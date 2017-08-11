const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

module.exports = {
  entry: './src/app.ts',
  target: 'node',
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: './dist',
    libraryTarget: 'commonjs2',
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$|\.js$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.s?css$/,
        use: [
          { loader: 'vue-style-loader' },
          {
            loader: 'css-loader',
            query: {
              modules: true,
              camelCase: true,
              importLoaders: 1,
            },
          },
          { loader: 'postcss-loader' },
        ],
      },
    ],
  },
  externals: nodeExternals(),
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development',
      ),
      'process.env.VUE_ENV': '"server"',
    }),
    new webpack.LoaderOptionsPlugin({
      test: /\.tsx?$|\.js$/,
      options: {
        ts: {
          transpileOnly: false,
          silent: false,
          compilerOptions: {
            target: 'es2017',
            module: 'es6',
          },
        },
      },
    }),
    new VueSSRServerPlugin(),
  ],
};
