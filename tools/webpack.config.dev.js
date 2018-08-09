/*
* @Author: dser.wei
* @Date:   2016-07-06 11:45:46
* @Last Modified by:   dser.wei
* @Last Modified time: 2016-07-06 11:55:44
*/

'use strict';

var makeConf = require('./webpack.makeconf');

module.exports = makeConf({
    dev: true,
    debug: true,
    NODE_ENV: 'development'
});
