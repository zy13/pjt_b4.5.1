/*
 * @Author: liexin.chen
 * @Date:   2016-07-15 15:30:08
 * @Last Modified by:   chenliexin
 * @Last Modified time: 2016-07-29 17:53:19
 */

'use strict';

var ajaxHelper = require('../core/ajaxHelper');

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
    GetProjectList: function(obj) {
        return ajaxHelper.get({
            url: '/api/accessmentMobile/GetProjectList',
            data: obj
        });
    },

    /**
     * 获取二维码
     */
    CreateQRCode: function(obj) {
        return ajaxHelper.get({
            url: '/api/accessmentMobile/CreateQRCode',
            data: obj
        });
    }

};
