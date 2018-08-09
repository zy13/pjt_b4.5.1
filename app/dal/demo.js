/*
 * @Author: dser.wei
 * @Date:   2016-06-29 14:13:56
 * @Last Modified by:   dser.wei
 * @Last Modified time: 2016-06-30 12:37:05
 */

'use strict';

var q = require('q');
var http = require('../core/http');

module.exports = {

    /**
     * demo1
     */
    getBaseCodeList: function(obj) {
        if (!obj || typeof obj !== 'object') {
            var dfd = q.defer();
            dfd.reject('err:param error');
            return dfd.promise;
        }

        return http.get('/WebApi5/Common/GetBaseCodeList', {
            Type: obj.Type || 1,
            Level: obj.Level || 1
        });
    },

    /**
     * demo2
     */
    getSingleVote: function(obj) {
        if (!obj || typeof obj !== 'object') {
            var dfd = q.defer();
            dfd.reject('err:param error');
            return dfd.promise;
        }

        return http.get('/WebApi5/Common/GetSingleVote', {
            PageIndex: obj.PageIndex || 1
        });
    },

    /**
     * demo3
     */
    sendMobileValidateSms: function(obj) {
        if (!obj || typeof obj !== 'object') {
            var dfd = q.defer();
            dfd.reject('err:param error');
            return dfd.promise;
        }

        return http.post('/WebApi5/Common/SendMobileValidateSms', {
            Mobile: obj.Mobile,
            ImageCode: obj.ImageCode
        });
    }

};
