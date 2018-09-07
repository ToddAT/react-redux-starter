const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/index.js',
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.txt$/,
        exclude: /node_modules/,
        use: {
          loader: "raw-loader"
        }
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [{
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
           'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
           'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin(
      [ { from: 'public', to: '' } ],
      { force: true }
    ),
    new HtmlWebPackPlugin({
      title: "My Web App",
      filename: "./index.html"
    }),
    //new webpack.HotModuleReplacementPlugin(),
    /*
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common'
    })
    */
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
