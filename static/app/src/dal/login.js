/*
 * @Author: liexin.chen
 * @Date:   2016-07-11 17:11:48
 * @Last Modified by:   chenliexin
 * @Last Modified time: 2016-07-26 14:53:59
 */

'use strict';

var ajaxHelper = require('../core/ajaxHelper');

module.exports = {

    Login: function(data) {
        return ajaxHelper.post({
            url: '/api/login/Login',
            timeout: 30000,
            data: {
                Account: data.account,
                Domain: data.domain,
                Password: data.password
            }
        });
    },

    Logout: function(data) {
        return ajaxHelper.post({
            url: '/api/login/Logout',
            data: {
                Account: data.account,
                Domain: data.domain
            }
        });
    }


};