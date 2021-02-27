const isMinify = !!process.env.BUILD_MINIFY;

module.exports = {
	context: __dirname + '/src',
	optimization: {
		minimize: isMinify
	},
	entry: {
		BP2D: './2D',
		BP3D: './3D',
		BinPacking: './index'
	},
	output: {
		path: __dirname + '/dist',
		filename: isMinify ? '[name].min.js' : '[name].js',
		library: 'BinPacking',
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
	mode: isMinify ? 'production' : 'development'
};
