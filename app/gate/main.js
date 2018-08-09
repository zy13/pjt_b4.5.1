/*
 * @Author: dser.wei
 * @Date:   2016-06-29 18:34:05
 * @Last Modified by:   sihuicao
 * @Last Modified time: 2016-08-08 16:15:07
 */

'use strict';

var main = require('koa-router')();

var routers = {
    accessmentMobile: require('./accessmentMobile'),
    demo: require('./demo'),
    login: require('./login'),
    reportList: require('./reportList'),
    account: require('./account')
}

main.use(routers.accessmentMobile.routes(), routers.accessmentMobile.allowedMethods());
main.use(routers.demo.routes(), routers.demo.allowedMethods());
main.use(routers.login.routes(), routers.login.allowedMethods());
main.use(routers.reportList.routes(), routers.reportList.allowedMethods());
main.use(routers.account.routes(), routers.account.allowedMethods());

module.exports = main;
