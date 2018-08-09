/*
* @Author: sihuicao
* @Date:   2016-08-08 14:46:11
* @Last Modified by:   sihuicao
* @Last Modified time: 2016-08-22 14:20:49
*/

'use strict';

var ajaxHelper = require('../core/ajaxHelper');

module.exports = {
    /**
     * 帐号管理列表
     * @param  {string}  obj.CustomerId       企业编号
     * @param  {string}  obj.ExamStatus       测评状态
     * @param  {string}  obj.KeyWord          搜索条件
     * @param  {string}  obj.MailStatus       邮件发送状态
     * @param  {string}  obj.PageIndex        第几页
     * @param  {string}  obj.PageSize         每页显示几条
     * @param  {string}  obj.SmsStatus        短信发送状态
     * @param  {number}  obj.ProjectId        项目编号
     * @param  {number}  obj.SubProjectId     子项目编号
     * @return {promise}
     */
    queryAccount: function(obj) {
        return ajaxHelper.get({
            url: '/api/account/QueryAccount',
            data: obj
        });
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
        return ajaxHelper.get({
            url: '/api/account/SendEMailAndSms',
            data: obj
        });
    },
    /**
     * 新建账号
     * @param  {number}  obj.CustomerId       企业编号
     * @param  {object}  obj.User             用户信息
     * @param  {number}  obj.ProjectId        项目编号
     * @param  {number}  obj.SubProjectId     子项目编号
     * @return {promise}
     */
    addAccount: function(obj) {
        return ajaxHelper.post({
            url: '/api/account/AddAccount',
            data: obj
        });
    },

    /**
     * 新建账号
     * @param  {number}  obj.CustomerId       企业编号
     * @param  {number}  obj.ProjectId        项目编号
     * @return {promise}
     */
    createAccount: function(obj) {
        return ajaxHelper.get({
            url: '/api/account/CreateAccount',
            data: obj
        });
    },


    /**
     * 修改账号
     * @param  {number}  obj.UserId           用户Id
     * @param  {object}  obj.User             用户信息
     * @return {promise}
     */
    editAccount: function(obj) {
        return ajaxHelper.post({
            url: '/api/account/EditAccount',
            data: obj
        });
    },

    /**
     * 修改账号
     * @param  {string} obj.CustomerId
     * @return {promise}
     */
    getPushTemplate: function(obj) {
        return ajaxHelper.get({
            url: '/api/account/GetPushTemplate',
            data: obj
        });
    },

    /**
     * 获取短信提示信息
     * @param  {string} obj.CustomerId  企业id
     * @param  {string} obj.SmsTemplateId 短信模板id
     * @param  {string} obj.ProjectId 子项目id
     * @param  {string} obj.UserIds UserIds
     * @return {promise}
     */
    getSMSInformation: function(obj) {
        return ajaxHelper.get({
            url: '/api/account/GetSMSInformation',
            data: obj
        });
    }
};
