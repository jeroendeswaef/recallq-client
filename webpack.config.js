const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
  disable: process.env.NODE_ENV !== 'production'
});

const plugins = [
  extractSass,
  new HtmlWebpackPlugin({
    template: 'template.html'
  })
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new UglifyJSPlugin({
      uglifyOptions: {
        keep_fnames: true
      }
    })
  );
}

const config = {
  context: __dirname,
  entry: ['babel-polyfill', './js/ClientApp.jsx'],
  // messes up uglify on production build
  devtool: 'cheap-eval-source-map',
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].[chunkhash].js',
    chunkFilename: 'dynamic-[name]-[chunkhash].js'
    /* publicPath: '/public/' */
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  devServer: {
    /* publicPath: '/public/', */
    historyApiFallback: true,
    disableHostCheck: true
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader'
            }
          ],
          // use style-loader in development
          fallback: 'style-loader'
        })
      }
      /* {
        test: /\.(s*)css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      } */
    ]
  },
  plugins
};

if (process.env.NODE_ENV === 'production') {
  config.devtool = false;
}

module.exports = config;
