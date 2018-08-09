/*
 * @Author: dser.wei
 * @Date:   2016-06-29 11:02:37
 * @Last Modified by:   sihuicao
 * @Last Modified time: 2016-08-12 10:58:25
 */

'use strict';

var http = require('http');
var q = require('q');
var mockjs = require('mockjs');
var consoler = require('consoler');
var logger = require('./logger');


var clean = function(param) {
    if (!param) {
        return '';
    }
    param = param.replace(/^&+/, '');
    param = param.replace(/&{2,}/g, '');
    return param;
}

var appendToUrl = function(url, params) {
    if (!params) {
        return url;
    }
    url += (url.indexOf('?') != -1 ? '&' : '?') + clean(params);
    return url;
}


module.exports = {

    get: function(url, args) {
        var request_timer = null,
            req = null;

        var conf = global.appConfig.app;
        if(!conf) {
            logger.error('conf error, current configure is [' + global.appConfig + ']\r\n');
            consoler.error('Error:not valid configure');
        }

        var dfd = q.defer();
        var postData = args ? require('querystring').stringify(args) : '';
        var options = {
            hostname: conf.http.host,
            path: appendToUrl(conf.http.path + url, postData),
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': postData.length
            }
        };

        console.time(options.path);

        var startDate = new Date();
        req = http.request(options, function(res) {
            res.setEncoding('utf8');
            var returnBody = '';
            res.on('data', function(chunk) {
                returnBody += chunk;
            });
            res.on('end', function() {
                clearTimeout(request_timer);

                if (conf.http.mock) {
                    returnBody = returnBody.replace(/^\s*callback\(|\)$/g, '');
                    if (typeof returnBody == 'string') {
                        returnBody = returnBody.trim();
                        try {
                            returnBody = JSON.parse(returnBody);
                            returnBody = mockjs.mock(returnBody);
                            dfd.resolve(returnBody);
                        } catch (e) {
                            consoler.error('Error:not valid json: ');
                            consoler.error(returnBody);
                            dfd.reject(e);
                        }
                    } else {
                        consoler.error('Error:not valid string: ');
                        consoler.error(returnBody);
                        dfd.reject('data error');
                    }
                } else {
                    try {
                        if (typeof returnBody == 'string' && res.statusCode == 200) {

                            returnBody = JSON.parse(returnBody);
                        }
                        if (!returnBody) {
                            logger.error('data error, returnBody is [' + returnBody + ']\r\n request HOST is [' + conf.http.host + ']\r\n request URL is [' + options.path + ']');
                            consoler.error('Error:no data');
                            dfd.reject('no Data');
                        }
                        if (returnBody) {
                            logger.http('data succcess, request time is [' + (new Date() - startDate) + 'ms]\r\n request HOST is [' + conf.http.host + ']\r\n request URL is [' + options.path + ']');
                            dfd.resolve(returnBody);
                        }
                    } catch (e) {
                        logger.http('data error, returnBody is [' + returnBody + ']\r\n request HOST is [' + conf.http.host + ']\r\n request URL is [' + options.path + ']');
                        consoler.error('Error:not valid data: ');
                        consoler.error(returnBody);
                        consoler.error('Request URL:' + options.path);
                        dfd.reject(e);
                    }
                }

                if (conf.http.console) {
                    consoler.info({
                        req: url,
                        args: args,
                        res: returnBody,
                        host: conf.http.host
                    });

                    console.timeEnd(options.path);
                    console.log('\r\n');
                }

            });
            res.on('abort', function() {
                dfd.reject('请求超时');
            });
        }).on('timeout', function(e) {
            if (req.res) {
                req.res.emit('abort');
            }
            req.abort();
            dfd.reject('请求超时');
        }).on('error', function(e) {
            logger.error(e);
            consoler.error('Error:unknown')
            consoler.error('Request URL:' + options.path);
            dfd.reject(e.message);
        });
        request_timer = setTimeout(function() {
            req.emit('timeout', {
                message: 'have been timeout...'
            });
        }, 30000);
        if (!req.socket) {
            req.write(postData);
            req.end();
        }
        return dfd.promise;
    },

    post: function(url, args) {
        var conf = global.appConfig.app;
        if(!conf) {
            logger.error('conf error, current configure is [' + global.appConfig + ']\r\n');
            consoler.error('Error:not valid configure');
        }

        var dfd = q.defer();
        var postData = args ? require('querystring').stringify(args) : '';
        var options = {
            hostname: conf.http.host,
            path: appendToUrl(conf.http.path + url),
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': postData.length
            }
        };
        console.time(options.path);
        var startDate = new Date();
        var req = http.request(options, function(res) {
            res.setEncoding('utf8');
            var returnBody = '';
            res.on('data', function(chunk) {
                returnBody += chunk;
            });
            res.on('end', function() {

                if (conf.http.mock) {
                    returnBody = returnBody.replace(/^\s*callback\(|\)$/g, '');
                    if (typeof returnBody == 'string' && res.statusCode == 200) {
                        returnBody = returnBody.trim();
                        try {
                            returnBody = JSON.parse(returnBody);
                            returnBody = mockjs.mock(returnBody);
                            dfd.resolve(returnBody);
                        } catch (e) {
                            consoler.error('Error:not valid json: ');
                            consoler.error(returnBody);
                            dfd.reject(e);
                        }
                    } else {
                        consoler.error('Error:not valid string: ');
                        consoler.error(returnBody);
                        dfd.reject('data error');
                    }
                } else {
                    try {
                        if (typeof returnBody == 'string' && res.statusCode == 200) {
                            returnBody = JSON.parse(returnBody);
                        }
                        logger.http('data succcess, request time is [' + (new Date() - startDate) + 'ms]\r\n request HOST is [' + conf.http.host + ']\r\n request URL is [' + options.path + ']');
                        dfd.resolve(returnBody);
                    } catch (e) {
                        logger.http('data error, returnBody is [' + returnBody + ']\r\n request HOST is [' + conf.http.host + ']\r\n request URL is [' + options.path + ']');
                        consoler.error('Error:not valid data: ');
                        consoler.error(returnBody);
                        consoler.error('Request URL:' + options.path);
                        dfd.reject(e);
                    }
                }

                if (conf.http.console) {
                    consoler.info({
                        req: url,
                        args: args,
                        res: returnBody,
                        host: conf.http.host
                    });

                    console.timeEnd(options.path);
                    console.log('\r\n');
                }


            })
        }).on('error', function(e) {
            logger.error(e);
            consoler.error('Error:unknown')
            consoler.error('Request URL:' + options.path);
            dfd.reject(e.message);
        });
        req.write(postData);
        req.end();
        return dfd.promise;
    }

}
