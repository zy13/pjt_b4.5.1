/*
* @Author: dser.wei
* @Date:   2016-06-27 11:12:09
* @Last Modified by:   dser.wei
* @Last Modified time: 2016-06-27 14:07:01
*/

'use strict';

var fileHelper = require('./fileHelper'),
    path = require('path'),
    _ = require('lodash');

var getConfig = function(env) {
    // var env = process.env.NODE_ENV || 'development';
    var defConfig = fileHelper.readJSON(path.join(__dirname, './config', 'default.json'));
    var userConfig = fileHelper.readJSON(path.join(__dirname, './config', 'user.json'), {});
    var cfg = _.extend(defConfig, userConfig);
    return cfg[env] || {};
}

//koa middleware
var config = function(app, env) {
    var self = app || this || {};
    var conf = getConfig(env || 'development');
    self.context.appConfig = global.appConfig = conf;
    return function*(next) {
        try {
            yield * next;
        } catch (err) {
            throw err;
        }
    };
}

module.exports = getConfig;
module.exports.config = config;
