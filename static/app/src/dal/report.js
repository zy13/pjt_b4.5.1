/*
 * @Author: liexin.chen
 * @Date:   2016-07-11 17:11:48
* @Last modified by:   Jet.Chan
* @Last modified time: 2016-09-14T16:14:07+08:00
 */

'use strict';

var ajaxHelper = require('../core/ajaxHelper');

module.exports = {

    QueryResults: function(obj) {
        return ajaxHelper.get({
            url: '/api/report/QueryResults',
            data: {
                CustomerId: obj.CustomerId || 0,
                KeyWord: obj.KeyWord || '',
                PageIndex: obj.PageIndex || 0,
                PageSize: obj.PageSize || 10,
                ProjectId: obj.ProjectId || 0
            }
        });
    },

    GetReportUrl: function(obj) {
        return ajaxHelper.post({
            url: '/api/report/GetReportUrl',
            //timeout: 30000,
            data: {
                CustomerAdminId: obj.CustomerAdminId,
                CustomerId: obj.CustomerId,
                UserExamIds: obj.UserExamIds
            }
        });
    },

    SendReportEmail: function(obj) {
        return ajaxHelper.post({
            url: '/api/report/SendReportEmail',
            //timeout: 30000,
            data: {
                Content: obj.Content,
                CustomerAdminId: obj.CustomerAdminId,
                CustomerId: obj.CustomerId,
                Remark: obj.Remark,
                Title: obj.Title,
                ToUser: obj.ToUser
            }
        });
    },

    QueryReports: function(opts) {
        return ajaxHelper.get({
            url: '/api/report/QueryReports',
            data: {
                UserExamId: opts.userExamId,
                Creator: opts.creator,
                Domain: opts.domain
            }
        });
    }


};
