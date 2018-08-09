/*
 * @Author: dser.wei
 * @Date:   2016-07-12 17:19:50
 * @Last Modified by:   chenliexin
 * @Last Modified time: 2016-07-26 17:38:19
 */

'use strict';

var q = require('q');
var http = require('../core/http');
var md5Sign = require('../core/sign');

module.exports = {

    /**
     * 获取项目列表
     * @param  {string}     obj.CustomerAdminId     登陆用户名id
     * @param  {string}     obj.CustomerId          企业id
     * @param  {string}     obj.KeyWord             搜索内容
     * @param  {string}     obj.PageIndex           第几页
     * @param  {string}     obj.PageSize            每页显示条数
     * @return {promise}
     */
    getProjectList: function (obj) {
        if (!obj || typeof obj !== 'object') {
            var dfd = q.defer();
            dfd.reject('err:param error');
            return dfd.promise;
        }

        //md5加密，参数顺序必须按约定规则输入
        var signParm = {
            CustomerAdminId: obj.CustomerAdminId,
            CustomerId: obj.CustomerId,
            PageIndex: obj.PageIndex,
            PageSize: obj.PageSize
        };
        var sign = md5Sign(signParm);

        obj.sign = sign;

        return http.get('/JWebApi5/AssessmentMobile/GetProjectList', obj);
    }

};
