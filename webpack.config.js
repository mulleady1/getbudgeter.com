const path = require('path');
const webpack = require('webpack');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: [
    'react-hot-loader/patch',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'budgeter', 'static'),
    filename: 'js/bundle.js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: 1,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // new ExtractTextPlugin('css/styles.css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    })
  ],
  // devServer: {
  //   host: '0.0.0.0',
  //   port: 8001,
  //   historyApiFallback: true,
  //   hot: true,
  //   publicPath: '/budgeter/static/',
  //   proxy: [
  //     {
  //       context: ['/webclient', '/review'],
  //       target: 'http://localhost:8873',
  //       changeOrigin: true
  //     }
  //   ],
  //   setup: function(app) {
  //     app.get('/', (req, res) => res.redirect('/dist'));
  //   }
  // }
};
