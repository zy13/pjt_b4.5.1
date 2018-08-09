/*
* @Author: dser.wei
* @Date:   2016-07-06 11:23:57
* @Last modified by:   Jet.Chan
* @Last modified time: 2016-09-12T10:06:34+08:00
*/

'use strict';

var gulp = require('gulp'),
    path = require('path'),
    gutil = require('gulp-util'),
    webpack = require('webpack');

gulp.task('build.env.test.js', function(callback) {
    var wpConfig = require('./tools/webpack.config.test');
    // create optimizations array
    var optimizations = [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false,
            },
            compress: {
                warnings: false,
            },
        })
    ];
    if (wpConfig.plugins) {
        wpConfig.plugins = wpConfig.plugins.concat(optimizations);
    } else {
        wpConfig.plugins = optimizations;
    }
    // run webpack
    webpack(wpConfig, function(err, stats) {
        if (err) {
            throw new gutil.PluginError('webpack', err);
        }
        // only log when errors
        gutil.log('[webpack]: ', stats.toString({
            chunks: false,
            modules: false,
            colors: true,
        }));
        callback();
    });
});

gulp.task('build.env.test', ['build.env.test.js']);


gulp.task('build.env.pre.js', function(callback) {
    var wpConfig = require('./tools/webpack.config.pre');
    // create optimizations array
    var optimizations = [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false,
            },
            compress: {
                warnings: false,
            },
        })
    ];
    if (wpConfig.plugins) {
        wpConfig.plugins = wpConfig.plugins.concat(optimizations);
    } else {
        wpConfig.plugins = optimizations;
    }
    // run webpack
    webpack(wpConfig, function(err, stats) {
        if (err) {
            throw new gutil.PluginError('webpack', err);
        }
        // only log when errors
        gutil.log('[webpack]: ', stats.toString({
            chunks: false,
            modules: false,
            colors: true,
        }));
        callback();
    });
});
gulp.task('build.env.pre', ['build.env.pre.js']);

//build production gulp config
gulp.task('build.env.production.js', function(callback) {
    var wpConfig = require('./tools/webpack.config.production');
    // create optimizations array
    var optimizations = [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false,
            },
            compress: {
                warnings: false,
            },
        })
    ];
    if (wpConfig.plugins) {
        wpConfig.plugins = wpConfig.plugins.concat(optimizations);
    } else {
        wpConfig.plugins = optimizations;
    }
    // run webpack
    webpack(wpConfig, function(err, stats) {
        if (err) {
            throw new gutil.PluginError('webpack', err);
        }
        // only log when errors
        gutil.log('[webpack]: ', stats.toString({
            chunks: false,
            modules: false,
            colors: true,
        }));
        callback();
    });
});
gulp.task('build.env.production', ['build.env.production.js']);
