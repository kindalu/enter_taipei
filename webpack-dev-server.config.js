var webpack = require('webpack');
var path = require('path');
var buildPath = path.resolve(__dirname, 'public');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var TransferWebpackPlugin = require('transfer-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
  //Entry points to the project
  entry: [
    path.join(__dirname, '/src/app/app.jsx')
  ],
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
    },
    modulesDirectories: [
      'node_modules',
      path.resolve(__dirname, './node_modules'),
      path.resolve(__dirname, './../node_modules'),
      path.resolve(__dirname, './../components')
   ]
  },
  //Server Configuration options
  devServer:{
    contentBase: 'src/www',  //Relative directory for base of server
    devtool: 'eval-source-map',
    hot: false,        //Live-reload
    inline: true,
    port: 3000        //Port Number
  },
  devtool: 'eval-source-map',
  output: {
    path: buildPath,    //Path of output file
    filename: 'app.js'
  },
  plugins: [
    new ExtractTextPlugin('enter-taipei.css', { allChunks: true }),
    //Allows error warnings but does not stop compiling. Will remove when eslint is added
    new webpack.NoErrorsPlugin(),
    //Moves files
    new TransferWebpackPlugin([
      {from: 'www'}
    ], path.resolve(__dirname, "src"))
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
  //eslint config options. Part of the eslint-loader package
  eslint: {
    configFile: '.eslintrc'
  },
};

module.exports = config;
