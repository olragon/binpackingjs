const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

let libraryName = 'BinPacking',
	plugins = [],
	outputFile;
const env = "build";

if (env === 'build') {
	plugins.push(
		new UglifyJSPlugin({
			sourceMap: true
		})
	);
	outputFile = `[name].min.js`;
} else {
	outputFile = `[name].js`;
}

module.exports = {
	context: __dirname + '/src',
	entry: {
		BP2D: './2D',
		BP3D: './3D',
		BinPacking: './index'
	},
	output: {
		path: __dirname + '/dist',
		filename: outputFile,
		library: libraryName,
		libraryTarget: 'umd',
		umdNamedDefine: true,
		globalObject: 'this'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},
	plugins: plugins,
	mode: env === 'build' ? 'production' : 'development'
};
