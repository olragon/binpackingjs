const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

let libraryName = 'bp3d', plugins = [], outputFile;
const env = process.env.WEBPACK_ENV;

if (env === 'build') {
  plugins.push(new UglifyJSPlugin({
  	sourceMap: true
  }));
  outputFile = libraryName + '.min.js';
} else {
  outputFile = libraryName + '.js';
}

module.exports = {
	context: __dirname + "/src",
  entry: "./bp3d",
  output: {
    path: __dirname + "/dist",
    filename: outputFile,
    library: "bp3d",
    libraryTarget: "umd",
    umdNamedDefine: true    
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: plugins
}