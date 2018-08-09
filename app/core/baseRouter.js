/*
* @Author: dser.wei
* @Date:   2016-06-22 17:10:30
* @Last Modified by:   dser.wei
* @Last Modified time: 2016-06-27 15:17:04
*/

'use strict';

var koaRouter = require('koa-router');

module.exports = function(opts) {
	var router = koaRouter();

	if(opts && opts.prefix && typeof opts.prefix === 'string') {
		router.prefix(opts.prefix);
	}

	if(opts && opts.default && typeof opts.default === 'function') {
		router.get('/', opts.default);
		router.get('/index', opts.default);
	}

	return router;
};
