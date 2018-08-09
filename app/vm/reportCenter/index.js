/*
 * @Author: liexin.chen
 * @Date:   2016-07-12 17:15:57
 * @Last Modified by:   chenliexin
 * @Last Modified time: 2016-07-19 16:28:15
 */

'use strict';

var baseVM = require('../../core/baseViewModel');
var errEnum = require('../../core/errCodeHelper');
var dal = require('../../dal/main');
var qExt = require('../../core/asynRequestHelper');
var _ = require('lodash');


module.exports = function*(opts) {

    var reportListVm = {};

    // 以下为服务端端api请求示例代码
    var r = yield * qExt.when([dal.reportList.queryResults(opts)]);

    if (r[0] && r[0].Status) {
        reportListVm = r[0].Data;
    }

    var vm = _.extend(baseVM.base, {
        data: {
            reportList: reportListVm,
        }
    });

    return vm;

}