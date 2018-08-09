/*
* @Author: sihuicao
* @Date:   2016-08-05 20:14:10
* @Last Modified by:   zyuan
* @Last Modified time: 2017-04-11 10:30:29
*/

'use strict';
var q = require('q');
var http = require('../core/http');
var md5Sign = require('../core/sign');

module.exports = {

    /**
     * 帐号管理列表
     * @param  {number}  obj.CustomerId       企业编号
     * @param  {number}  obj.ExamStatus       测评状态
     * @param  {string}  obj.KeyWord          搜索条件
     * @param  {number}  obj.MailStatus       邮件发送状态
     * @param  {number}  obj.PageIndex        第几页
     * @param  {number}  obj.PageSize         每页显示几条
     * @param  {number}  obj.SmsStatus        短信发送状态
     * @param  {number}  obj.ProjectId        项目编号
     * @param  {number}  obj.SubProjectId     子项目编号
     * @return {promise}
     */
    queryAccount: function(obj) {
        if (!obj || typeof obj !== 'object') {
            var dfd = q.defer();
            dfd.reject('err:param error');
            return dfd.promise;
        }

        //md5加密，参数顺序必须按约定规则输入
        var signParm = {
            CustomerAdminId: obj.CustomerAdminId||'',
            CustomerId: obj.CustomerId || '',
            ProjectId: obj.ProjectId || '',
            SubProjectId: obj.SubProjectId || '',
            ExamStatus: obj.ExamStatus || null,
            MailStatus: obj.MailStatus || null,
            SmsStatus: obj.SmsStatus || null,
            PageIndex: obj.PageIndex || 0,
            PageSize: obj.PageSize || 10
        };
        var sign = md5Sign(signParm);

        obj.sign = sign;

        return http.get('/JWebApi5/AssessmentMobile/QueryAccount', obj);
    },


    /**
     * 新建账号
     * @param  {number}  obj.CustomerId       企业编号
     * @param  {object}  obj.User             用户信息
     * @param  {number}  obj.ProjectId        项目编号
     * @param  {number}  obj.SubProjectId     子项目编号
     * @return {promise}
     */
    addAccount: function (obj) {
        if (!obj || typeof obj !== 'object') {
            var dfd = q.defer();
            dfd.reject('err:param error');
            return dfd.promise;
        }

        //md5加密，参数顺序必须按约定规则输入
        var signParm = {
            CustomerId:obj.CustomerId,
            ProjectId :obj.ProjectId,
            SubProjectId :obj.SubProjectId,
        };
        var sign = md5Sign(signParm);
        obj.sign = sign;
        return http.post('/JWebApi5/AssessmentMobile/AddAccount', obj);
    },

    /**
     * 修改账号
     * @param  {number}  obj.UserId       用户ID
     * @param  {object}  obj.User         用户信息
     * @return {promise}
     */
    editAccount: function (obj) {
        if (!obj || typeof obj !== 'object') {
            var dfd = q.defer();
            dfd.reject('err:param error');
            return dfd.promise;
        }

        //md5加密，参数顺序必须按约定规则输入
        var signParm = {
            CustomerId:obj.CustomerId,
            ProjectId:obj.ProjectId,
            UserId:obj.UserId
        };
        var sign = md5Sign(signParm);
        obj.sign = sign;
        return http.post('/JWebApi5/AssessmentMobile/UpdateAccount', obj);
    },

    /**
     * 发送邮件和短信
     * @param  {string}  obj.CustomerAdminId    企业用户管理员id
     * @param  {string}  obj.CustomerId         企业id
     * @param  {string}  obj.MailTemplateId     邮件模板id
     * @param  {string}  obj.ProjectId          项目id
     * @param  {string}  obj.SmsTemplateId      短信模板id
     * @param  {string}  obj.UserIds            测评账号id，多个账号用逗号隔开
     * @param  {string}  obj.MailSubject        邮件标题
     * @return {promise}
     */
    sendEMailAndSms: function(obj) {

        if (!obj || typeof obj !== 'object') {
            var dfd = q.defer();
            dfd.reject('err:param error');
            return dfd.promise;
        }

        //md5加密，参数顺序必须按约定规则输入
        var signParm = {
            CustomerId: obj.CustomerId || '',
            CustomerAdminId: obj.CustomerAdminId || '',
            SmsTemplateId: obj.SmsTemplateId || '',
            MailTemplateId: obj.MailTemplateId || '',
            ProjectId: obj.ProjectId || '',
            UserIds: obj.UserIds || '',
            MailSubject: obj.MailSubject || ''
        };
        var sign = md5Sign(signParm);

        obj.sign = sign;

        return http.get('/JWebApi5/AssessmentMobile/SendEMailAndSms', obj);
    },

    /**
     * 获取发送测评模板
     * @param  {string} obj.CustomerId
     * @return {promise}
     */
    getPushTemplate: function (obj) {
        if (!obj || typeof obj !== 'object') {
            var dfd = q.defer();
            dfd.reject('err:param error');
            return dfd.promise;
        }

        //md5加密，参数顺序必须按约定规则输入
        var signParm = {
            CustomerId: obj.CustomerId,
            Creater: obj.Creater
        };
        var sign = md5Sign(signParm);

        obj.sign = sign;

        return http.get('/JWebApi5/AssessmentMobile/GetPushTemplate', obj);
    },

    /**
     * 获取短信发送量提示信息
     * @param  {string} obj.CustomerId  企业id
     * @param  {string} obj.SmsTemplateId 短信模板id
     * @param  {string} obj.ProjectId 子项目id
     * @param  {string} obj.UserIds UserIds
     * @return {promise}
     */
    getSMSInformation: function(obj){
        if (!obj || typeof obj !== 'object') {
            var dfd = q.defer();
            dfd.reject('err:param error');
            return dfd.promise;
        }
        //md5加密，参数顺序必须按约定规则输入
        var signParm = {
            CustomerId: obj.CustomerId,
            SmsTemplateId: obj.SmsTemplateId,
            ProjectId: obj.ProjectId,
            UserIds: obj.UserIds
        };
        var sign = md5Sign(signParm);

        obj.sign = sign;

        return http.get('/JWebApi5/AssessmentMobile/GetSMSInformation', obj);
    },

    /**
     * 获取新增账号字段
     * @param  {string} obj.CustomerId  企业id
     * @param  {string} obj.ProjectId   项目id
     * @return {promise}
     */
    createAccount: function(obj){
        if (!obj || typeof obj !== 'object') {
            var dfd = q.defer();
            dfd.reject('err:param error');
            return dfd.promise;
        }
        //md5加密，参数顺序必须按约定规则输入
        var signParm = {
            CustomerId: obj.CustomerId,
            ProjectId: obj.ProjectId,
            UserId: obj.UserId
        };
        var sign = md5Sign(signParm);

        obj.sign = sign;

        return http.get('/JWebApi5/AssessmentMobile/CreateAccount', obj);
    }

}
