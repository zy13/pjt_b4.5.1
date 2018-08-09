/*
 * @Author: liexin.chen
 * @Date:   2016-07-12 17:29:03
 * @Last Modified by:   chenliexin
 * @Last Modified time: 2016-07-26 17:46:02
 */

'use strict';

var q = require('q');
var http = require('../core/http');
var md5Sign = require('../core/sign');

module.exports = {

    /**
     * 查看报告列表
     * @param  {string}  obj.CustomerId 企业域名
     * @param  {string}  obj.ProjectId  账号
     * @param  {string}  obj.PageIndex  页码
     * @param  {string}  obj.PageSize   每页数量
     * @return {promise}
     */
    queryResults: function (obj) {
        if (!obj || typeof obj !== 'object') {
            var dfd = q.defer();
            dfd.reject('err:param error');
            return dfd.promise;
        }
        //md5加密，参数顺序必须按约定规则输入
        var signParm = {
            CustomerId: obj.CustomerId,
            ProjectId: obj.ProjectId,
            PageIndex: obj.PageIndex,
            PageSize: obj.PageSize
        };
        var sign = md5Sign(signParm);


        obj.sign = sign;

        return http.get('/JWebApi5/AssessmentMobile/QueryResultInfo', obj);
    },

    /**
     * 查看报告列表
     * @param  {string}  obj.UserExamId 测评者ID
     * @return {promise}
     */
    QueryReports: function (obj) {
        if (!obj || typeof obj !== 'object') {
            var dfd = q.defer();
            dfd.reject('err:param error');
            return dfd.promise;
        }

        //md5加密，参数顺序必须按约定规则输入
        var signParm = {
            UserExamId: obj.UserExamId
        };
        var sign = md5Sign(signParm);

        obj.sign = sign;

        return http.get('/JWebApi5/AssessmentMobile/QueryReports', obj);
    },

    /***
     * 获取发送邮件的ContentUrl
     * @param obj。CustomerAdminId {string} 企业管理员id
     * @param obj.UserExamIds {string} 用户测评IDs
     * @return promise
     */
    GetReportUrl: function (obj) {
        if (!obj || typeof obj !== 'object') {
            var dfd = q.defer();
            dfd.reject('err:param error');
            return dfd.promise;
        }

        //md5加密，参数顺序必须按约定规则输入
        var signParm = {
            CustomerAdminId: obj.CustomerAdminId,
            CustomerId:obj.CustomerId,
            UserExamIds: obj.UserExamIds
        };
        var sign = md5Sign(signParm);

        obj.sign = sign;

        return http.get('/JWebApi5/AssessmentMobile/GetReportUrl', obj);
    },
    /***
     * 邮件发送报告
     * @param obj
     * @returns {*}
     * @constructor
     */
    SendReportEmail:function(obj){
        if (!obj || typeof obj !== 'object') {
            var dfd = q.defer();
            dfd.reject('err:param error');
            return dfd.promise;
        }

        //md5加密，参数顺序必须按约定规则输入
        var signParm = {
            CustomerAdminId:obj.CustomerAdminId,
            CustomerId: obj.CustomerId,
            Remark:obj.Remark,
            Title:obj.Title,
            ToUser:obj.ToUser,
            Content: obj.Content
        };
        var sign = md5Sign(signParm);

        obj.sign = sign;

        return http.get('/JWebApi5/AssessmentMobile/SendContentByEMail', obj);
    }

};
