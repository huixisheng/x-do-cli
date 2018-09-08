const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackVueStyle = require('@x-scaffold/webpack-vue-style');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const IP = require('ip').address();

const isProduction = process.env.NODE_ENV === 'production';

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  entry: {
    app: './src/main.js',
  },
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: 'js/[name].[hash:8].js',
  },
  module: {
    rules: webpackVueStyle.styleLoaders({
      sourceMap: false,
      extract: isProduction,
    }).concat([
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [path.resolve('src')],
        exclude: /node_modules/,
        options: {
          formatter: require('eslint-friendly-formatter'),
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: webpackVueStyle.loaders,
          // extractCSS: true,
          // cssSourceMap: false,
          // other vue-loader options go here
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[ext]?[hash]',
        },
      },
    ]),
  },
  resolve: {
    modules: [
      path.resolve('src'),
      path.resolve('node_modules'),
    ],
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      src: resolve('src'),
      views: resolve('src/views'),
      components: resolve('src/components'),
      assets: resolve('src/assets'),
    },
  },
  performance: {
    hints: false,
  },
  // devtool: '#eval-source-map',
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      verbose: true,
    }),
    // http://mobilesite.github.io/2017/02/18/all-the-errors-encountered-in-webpack/
    // https://segmentfault.com/q/1010000008716379
    // https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/548
    new ExtractTextPlugin({
      disable: !isProduction,
      filename: path.join('css/[name].[contenthash:8].css'),
      allChunks: false,
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'template.html',
      chunks: ['app'],
      showErrors: true,
      hash: true,
      inject: true,
      chunksSortMode: 'dependency',
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource
          && /\.js$/.test(module.resource)
          && module.resource.indexOf(
            path.join(__dirname, '../node_modules'),
          ) === 0
        );
      },
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
    }),
  ],
};
if (!isProduction) {
  module.exports.devtool = '#eval-source-map';
  module.exports.devServer = {
    host: IP,
    hot: false,
    open: true,
    historyApiFallback: true,
    noInfo: true,
  };
}