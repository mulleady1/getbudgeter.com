var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

const HOST = '0.0.0.0';
const PORT = 5031;

config.entry.unshift('webpack/hot/only-dev-server');
config.entry.unshift(`webpack-dev-server/client?http://localhost:${PORT}`);
config.module.loaders[0].loaders.unshift('react-hot');
config.module.loaders[1].loader = 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!sass-loader?outputStyle=expanded';
config.plugins[0] = new webpack.HotModuleReplacementPlugin();

new WebpackDevServer(webpack(config), {
	contentBase: 'public/',
	hot: true,
	historyApiFallback: true,
  proxy: {
    '**/*.js': 'http://localhost:5030'
  }
}).listen(PORT, HOST, function (err, result) {
	if (err) {
		return console.log(err);
	}

	console.log(`Listening at http://${HOST}:${PORT}/`);
});
