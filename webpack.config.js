const path = require('path');

module.exports = {
  context: __dirname,
  entry: './js/ClientApp.jsx',
  devtool: 'cheap-eval-source-map',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  devServer: {
    publicPath: '/public/',
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
      /* {
        test: /\.json$/,
        use: ['json-loader']
      }, */
      /* {
        test: /\.json/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }, */
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(s*)css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
};
