/*
 * @Author: dser.wei
 * @Date:   2016-06-30 16:28:45
 * @Last Modified by:   dser.wei
 * @Last Modified time: 2016-06-30 16:56:33
 */

'use strict';

var $ = require('jquery');
var q = require('q');

module.exports = {

    get: function() {
        var dfd = q.defer();

        if (window.userContext) {
            dfd.resolve();
        } else {
            $.ajax({
                type: 'GET',
                url: '/session/getContext'
            }).done(function(res) {
                if (res.status) {
                    window.userContext = res.data;
                    dfd.resolve();
                } else {
                    dfd.reject();
                }
            }).fail(function(error) {
                dfd.reject(error);
            });
        }

        return dfd.promise;
    },

    update: function() {
        var dfd = q.defer();

        $.ajax({
            type: 'POST',
            url: '/session/updateContext'
        }).done(function(res) {
            if (res.status) {
                dfd.resolve();
            } else {
                dfd.reject();
            }
        }).fail(function(error) {
            dfd.reject(error);
        });

        return dfd.promise;
    }

}
