/*
 * @Author: dser.wei
 * @Date:   2016-06-29 17:39:48
 * @Last Modified by:   chenliexin
 * @Last Modified time: 2016-07-26 14:51:25
 */

'use strict';

var $ = require('jquery');
var q = require('q');
var mockjs = require('mockjs');
var appConfig = AppConfig || {};

module.exports = {

    get: function(opts) {
        var dfd = q.defer();
        var conf = appConfig.static;

        if (opts.url && typeof opts.url === 'string' && opts.url[0] === '/' && opts.url[1] !== '/') {
            opts.url = conf.ajaxDomain + opts.url;
        }
        opts = $.extend(opts, {
            type: 'GET',
            dataType: 'json'
        });

        $.ajax(opts).done(function(res) {
            dfd.resolve(res);
        }).fail(function(err) {
            dfd.reject(err);
        });

        return dfd.promise;
    },

    post: function(opts) {
        var dfd = q.defer();
        var conf = appConfig.static;

        if (opts.url && typeof opts.url === 'string' && opts.url[0] === '/' && opts.url[1] !== '/') {
            opts.url = conf.ajaxDomain + opts.url;
        }
        opts = $.extend(opts, {
            type: 'POST',
            dataType: 'json'
        });

        $.ajax(opts).done(function(res) {
            dfd.resolve(res);
        }).fail(function(err) {
            dfd.reject(err);
        });

        return dfd.promise;
    }

}