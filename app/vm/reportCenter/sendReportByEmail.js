/*
 * @Author: yongquan.wu
 * @Date:   2016-07-12 17:15:57
 * @Last Modified by:   yongquan.wu
 * @Last Modified time: 2016-07-19 16:28:15
 */

'use strict';

var baseVM = require('../../core/baseViewModel');
var errEnum = require('../../core/errCodeHelper');
var dal = require('../../dal/reportList');
var qExt = require('../../core/asynRequestHelper');
var _ = require('lodash');


var getReportUrl=function*(opts){
    var data;
    var r = yield * qExt.when([dal.GetReportUrl(opts)]);

    if (r[0] && r[0].Status) {
        data = r[0].Data;
    }

    var vm = _.extend(baseVM.base, {data:data});

    return vm;
}



module.exports = {
    getReportUrl:getReportUrl
}
