/*
 * @Author: liexin.chen
 * @Date:   2016-07-11 17:48:11
 * @Last Modified by:   chenliexin
 * @Last Modified time: 2016-07-26 17:43:09
 */

'use strict';

var q = require('q');
var http = require('../core/http');
var md5Sign = require('../core/sign');

module.exports = {

    /**
     * 登录
     * @param  {string}  obj.Domain   企业域名
     * @param  {string}  obj.Account  账号
     * @param  {string}  obj.Password 密码
     * @return {promise}
     */
    login: function (obj) {
        if (!obj || typeof obj !== 'object') {
            var dfd = q.defer();
            dfd.reject('err:param error');
            return dfd.promise;
        }

        //md5加密，参数顺序必须按约定规则输入
        var signParm = {
            DoMain: obj.Domain,
            Account: obj.Account,
            Password: obj.Password
        };
        var sign = md5Sign(signParm);

        return http.get('/JWebApi5/AssessmentMobile/Login', {
            DoMain: obj.Domain,
            Account: obj.Account,
            Password: obj.Password,
            sign: sign
        });
    }

};
