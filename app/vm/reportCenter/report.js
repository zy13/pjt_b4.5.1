/*
 * @Author: liexin.chen
 * @Date:   2016-07-19 09:32:28
 * @Last Modified by:   sihuicao
 * @Last Modified time: 2016-09-05 11:16:59
 */

'use strict';

var baseVM = require('../../core/baseViewModel');
var errEnum = require('../../core/errCodeHelper');
var dal = require('../../dal/main');
var qExt = require('../../core/asynRequestHelper');
var _ = require('lodash');


module.exports = function*(opts) {

    var reportVm = {};

    // 以下为服务端端api请求示例代码
    var r = yield * qExt.when([dal.reportList.QueryReports(opts)]);

    if (r[0] && r[0].Status) {
        reportVm = r[0].Data;
    }

    var content = '',message = '';
    var reportHtml = reportVm.Content ? reportVm.Content.match(/<body[\w\W]*?>([\w\W]*?)<\/body>/) : '';
    if (reportHtml) {
        content = reportHtml[1];
    }else{
        message = reportVm.Content=='生成报告失败'||'报告生成失败'?'报告生成失败':'';
    }

    var vm = _.extend(baseVM.base, {
        data: {
            report: {
                Content: content,
                Message: message
            }
        }
    });

    return vm;

}
