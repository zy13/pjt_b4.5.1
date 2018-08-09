/*
 * @Author: dser.wei
 * @Date:   2016-06-23 18:44:37
* @Last modified by:   Jet.Chan
* @Last modified time: 2016-09-09T12:06:07+08:00
 */

'use strict';

var path = require('path'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    _ = require('lodash'),
    AssetsPlugin = require('assets-webpack-plugin'),
    assetsPluginInstance = new AssetsPlugin({
        filename: 'assets.json'
    });

//path
var rootPath = path.resolve(__dirname, '../');
var nodeModulePath = path.resolve(rootPath, 'node_modules');
var appPath = path.resolve(rootPath, 'static/app');

//setting
var getAppConfig = require('./configHelper');

module.exports = function(opts) {
    //options
    var opt = _.extend({
        dev: true,
        debug: true,
        NODE_ENV: 'development'
    }, opts || {});

    var appConfig = getAppConfig(opt.NODE_ENV) || {};

    //entries
    var entryHelper = require('./entryHelper');
    var entries = entryHelper.getEntry(appConfig);

    var staticPort = appConfig.static.staticPort.length > 0 ? appConfig.static.staticPort : '';

    //entries setting
    if (opt.dev) {
        Object.keys(entries).forEach(function(v) {
            entries[v] = ['webpack-hot-middleware/client?path=http://localhost:' + staticPort + '/__webpack_hmr&timeout=20000&reload=true', entries[v]];
        });
    }

    var definePluginInstance = new webpack.DefinePlugin({
        __DEV__: JSON.stringify(JSON.parse(opt.NODE_ENV === 'development' ? 'true' : 'false')),
        AppConfig: JSON.stringify(appConfig),
        "process.env": {
            BROWSER: JSON.stringify(true),
            NODE_ENV: JSON.stringify(opt.NODE_ENV)
        }
    });

    var publicPath = '/assets/';
    if (appConfig.static.staticDomain.length > 0) {
        publicPath = appConfig.static.staticDomain + ':' + staticPort + publicPath;
    }
    entries['vendors'] = ['react', 'react-dom', 'jquery', 'c-ui', 'store2'];
    //base config obj
    var conf = {
        devtool: opt.debug ? '#source-map' : '',
        debug: opt.debug,
        entry: entries,
        output: {
            path: path.resolve(rootPath, 'public/assets/'),
            publicPath: publicPath,
            filename: '[name].[chunkhash].min.js',
        },
        node: {
            fs: 'empty',
        },
        module: {
            loaders: [{
                test: /\.css$/,
                loader: opt.dev ? 'style!css' : ExtractTextPlugin.extract('style', 'css'),
                include: nodeModulePath
            }, {
                test: /\.less$/,
                loader: opt.dev ? 'style!css!less' : ExtractTextPlugin.extract('style', 'css!less'),
                include: [appPath, nodeModulePath]
            }, {
                test: /\.scss$/,
                loader: opt.dev ? 'style!css!sass' : ExtractTextPlugin.extract('style', 'css!sass'),
                include: appPath
            }, {
                test: /\.styl$/,
                loader: opt.dev ? 'style!css!stylus' : ExtractTextPlugin.extract('style', 'css!stylus'),
                include: appPath
            }, {
                test: /\.woff\d?(\?.+)?$/,
                loader: 'url?limit=1000&minetype=application/font-woff',
                include: nodeModulePath
            }, {
                test: /\.ttf(\?.+)?$/,
                loader: 'url?limit=1000&minetype=application/octet-stream',
                include: nodeModulePath
            }, {
                test: /\.eot(\?.+)?$/,
                loader: 'url?limit=1000',
                include: nodeModulePath
            }, {
                test: /\.svg(\?.+)?$/,
                loader: 'url?limit=1000&minetype=image/svg+xml',
                include: nodeModulePath
            }, {
                test: /\.png$/,
                loader: 'url?limit=1000&mimetype=image/png',
            }, {
                test: /\.jpg$/,
                loader: 'url?limit=1000&mimetype=image/jpg',
            }, {
                test: /\.gif$/,
                loader: 'url?limit=1000&mimetype=image/gif'
            }, {
                test: /\.json$/,
                loader: 'json',
                include: appPath
            }, {
                test: /(\/|\\)tpl(\/|\\).*(\.html)$/,
                loader: 'html?config=htmlLoaderConfig'
            }, {
                test: /\.js$|\.jsx$/,
                loader: 'react-hot!jsx-loader?harmony',
                exclude: /node_modules/
            }]
        },
        htmlLoaderConfig: {
            removeAttributeQuotes: false,
            minimize: true
        },
        plugins: [
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendors',
                filename: 'vendors.js?[hash:8]',
                minChunks: Infinity
            }),
            new webpack.NoErrorsPlugin(),
            assetsPluginInstance,
            definePluginInstance,
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery'
            })
        ],
    };

    //plugins setting
    if (opt.dev) {
        //开发模式下加入热替换插件
        conf.plugins.push(
            new webpack.HotModuleReplacementPlugin()
        );
    } else {
        //非开发模式下生成css文件
        conf.plugins.push(
            new ExtractTextPlugin('css/[name].[chunkhash].css', {
                disable: false,
                allChunks: true
            })
        );
    }

    return conf;
}
