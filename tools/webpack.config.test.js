/*
* @Author: dser.wei
* @Date:   2016-07-06 11:39:06
* @Last Modified by:   dser.wei
* @Last Modified time: 2016-07-06 11:55:47
*/

'use strict';

var makeConf = require('./webpack.makeconf');

module.exports = makeConf({
    dev: false,
    debug: false,
    NODE_ENV: 'test'
});
