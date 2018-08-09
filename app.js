/*
 * @Author: dser.wei
 * @Date:   2016-06-20 15:52:51
 * @Last Modified by:   chenliexin
 * @Last Modified time: 2016-07-19 15:14:06
 */

'use strict';

var app = require('koa')(),
    koa = require('koa-router')(),
    koaLogger = require('koa-logger'),
    json = require('koa-json'),
    koaJade = require('koa-jade'),
    path = require('path'),
    logger = require('./app/core/logger');


var onerror = require('koa-onerror');
onerror(app);

//routers
var routers = {
    session: require('./app/core/sessionController'),
    api: require('./app/gate/main'),
    main: require('./routes/main'),
    user: require('./routes/user'),
    reportCenter: require('./routes/reportCenter'),
    error: require('./routes/error'),
    accountCenter: require('./routes/accountCenter')
}


// global middlewares
var jade = new koaJade({
    viewPath: path.resolve(__dirname, 'views'),
    debug: false,
    helperPath: [{
        pageHelper: require('./app/core/pageHelper')
    }]
});
app.use(jade.middleware);


app.use(require('koa-bodyparser')());
app.use(json());
app.use(koaLogger());


app.use(require('koa-static')(__dirname + '/public'));


//appConfig middleware
var env = process.env.NODE_ENV || 'development';
var appConfig = require('./tools/configHelper');
app.use(appConfig.config(app, env));


// session middleware
var session = require('koa-session');
app.keys = ['user context'];
app.use(session(app));


// routes definition
koa.use(routers.session.routes(), routers.session.allowedMethods());
koa.use(routers.api.routes(), routers.api.allowedMethods());
koa.use(routers.main.routes(), routers.main.allowedMethods());
koa.use(routers.user.routes(), routers.user.allowedMethods());
koa.use(routers.reportCenter.routes(), routers.reportCenter.allowedMethods());
koa.use(routers.error.routes(), routers.error.allowedMethods());
koa.use(routers.accountCenter.routes(), routers.accountCenter.allowedMethods());

// mount root routes
app.use(koa.routes());


app.on('error', function(err, ctx) {
    logger.error({
        err: err ? err.toString() : 'unknow',
        ctx: ctx || '',
        errorPosition: err.stack
    });
});

module.exports = app;
