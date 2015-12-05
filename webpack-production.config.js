var webpack = require('webpack');
var path = require('path');
var buildPath = path.resolve(__dirname, 'public');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var TransferWebpackPlugin = require('transfer-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
  entry: [path.join(__dirname, '/src/app/app.jsx')],
  resolveLoader: {
    modulesDirectories: [
      path.join(__dirname, '/node_modules')
    ]
  },
  //Config options on how to interpret requires imports
  resolve: {
    extensions: ['', '.jsx', '.scss', '.js', '.json', '.md'],
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-toolbox': path.resolve('./node_modules/react-toolbox'),
      'babel-loader': path.resolve(__dirname, './node_modules/babel-loader'),
    },
    modulesDirectories: [
      'node_modules',
      path.resolve(__dirname, './node_modules'),
      path.resolve(__dirname, './../node_modules'),
      path.resolve(__dirname, './../components')
   ]
  },
  //Render source-map file for final build
  devtool: 'source-map',
  //output config
  output: {
    path: buildPath,    //Path of output file
    filename: 'app.js'  //Name of output file
  },
  plugins: [
    new ExtractTextPlugin('enter-taipei.css', { allChunks: true }),
    //Minify the bundle
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        //supresses warnings, usually from module minification
        warnings: false
      }
    }),
    //Allows error warnings but does not stop compiling. Will remove when eslint is added
    new webpack.NoErrorsPlugin(),
    //Transfer Files
    new TransferWebpackPlugin([
      {from: 'www'}
    ], path.resolve(__dirname,"src"))
  ],
  module: {
    //Loaders to interpret non-vanilla javascript code as well as most other extensions including images and text.
    preLoaders: [
      {
        //Eslint loader
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        include: [path.resolve(__dirname, "src/app")],
        exclude: [nodeModulesPath]
      },
    ],
    loaders: [
      { test: /\.svg$/, loader: 'svg-loader?pngScale=2' },
      {
        test: /(\.scss|\.css)$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass?sourceMap!toolbox')
      //  loader: "style-loader!css-loader!postcss!sass!toolbox"
      },
      {
        //React-hot loader and
        test: /\.(js|jsx)$/,  //All .js and .jsx files
        loaders: ['babel-loader'], // babel loads jsx and es6-7
        exclude: [nodeModulesPath]
      }
    ]
  },
  //Eslint config
  eslint: {
    configFile: '.eslintrc' //Rules for eslint
  },
};

module.exports = config;
