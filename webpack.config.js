const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
  disable: process.env.NODE_ENV !== 'production'
});

module.exports = {
  context: __dirname,
  entry: './js/ClientApp.jsx',
  devtool: 'cheap-eval-source-map',
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].[chunkhash].js'
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
  plugins: [
    extractSass,
    new HtmlWebpackPlugin({
      template: 'template.html'
    })
  ]
};
