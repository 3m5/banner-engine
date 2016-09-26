var webpack    = require('webpack'),
    path       = require('path');

console.log(path.join(__dirname, '/node_modules/handlebars/dist/handlebars.runtime.js'));

module.exports = {
	cache: false,
	entry: {
		engine: ['webpack/hot/dev-server', './scripts/BannerEngine.js']
	},
	output: {
		path: path.join(__dirname, "build/js"),
		filename: "[name].js"
	},
	node: {
		fs: "empty",
		net: "empty",
		dns: "empty"
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015-loose', 'stage-2', 'stage-3'],
					//plugins: ["syntax-async-functions","transform-regenerator"]
					plugins: [
						["transform-strict-mode", {
							"strict": false
						}],
						"es6-promise"
						//["transform-es2015-classes", {
						//	"loose": true
						//}]
					]
					//optional: ['es7.asyncFunctions'],
					//stage: 0
				}
			},
			{
				test: /\.hbs$/,
				exclude: /node_modules/,
				loader: "handlebars-loader",
				query: {
					helperDirs: [__dirname + 'scripts/helpers'],
					knownHelpers: ['add', 'sub', 'for', 'concat', 'log', 'route', 'routeParam', 'getText', 'getTextConcat', 'ifNot', 'ifCond', 'nl2br', 'dotdotdot', 'testIf', 'formatRelative', 'formatDate', 'today', 'formatNumber', 'formatTime', 'content', 'extend']
				}
			}
		]
	},
	resolve: {
		root: path.resolve(__dirname, 'scripts'),
		modulesDirectories: [
			'node_modules'
		]
	},
	plugins: [new webpack.HotModuleReplacementPlugin()],
	devtool: 'inline-source-map'
};