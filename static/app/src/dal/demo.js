/*
 * @Author: dser.wei
 * @Date:   2016-06-29 17:49:33
 * @Last Modified by:   dser.wei
 * @Last Modified time: 2016-06-30 12:34:06
 */

'use strict';

var ajaxHelper = require('../core/ajaxHelper');

module.exports = {

    /**
     * demo1
     */
    getBaseCodeList: function(type, level) {
        return ajaxHelper.get({
            url: '/api/demo/GetBaseCodeList',
            data: {
                Type: type || 1,
                Level: level || 1
            }
        });
    },

    /**
     * demo2
     */
    getSingleVote: function(pageIndex) {
        return ajaxHelper.get({
            url: '/api/demo/GetSingleVote',
            data: {
                PageIndex: pageIndex || 1
            }
        });
    },

    /**
     * demo3
     */
    sendMobileValidateSms: function(data) {
        return ajaxHelper.post({
            url: '/api/demo/SendMobileValidateSms',
            data: {
                Mobile: data.mobile,
                ImageCode: data.imageCode
            }
        });
    }


};
