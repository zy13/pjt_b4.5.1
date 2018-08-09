/*
* @Author: sihuicao
* @Date:   2016-08-05 20:40:03
* @Last Modified by:   zyuan
* @Last Modified time: 2016-08-17 14:13:35
*/

'use strict';
var baseVM = require('../../core/baseViewModel');
var errEnum = require('../../core/errCodeHelper');
var dal = require('../../dal/main');
var qExt = require('../../core/asynRequestHelper');
var _ = require('lodash');


module.exports = function*(opts) {

    // 以下为服务端端api请求示例代码
    /*var demo1Vm = {},
        demo2Vm = {},
        demo3Vm = {};
    var r = yield * qExt.when([dal.demo.getBaseCodeList({}), dal.demo.getSingleVote({}), dal.demo.sendMobileValidateSms({Mobile:'13580515020'})]);

    if(r[0] && r[0].Status) {
        demo1Vm = r[0].Data;
    }

    if(r[1] && r[1].Status) {
        demo2Vm = r[1].Data;
    }

    if(r[2] && r[2].Status) {
        demo3Vm = r[2].Data;
    }*/

    var accountList = yield dal.account.queryAccount(opts),
        accountListVm = {};

    if (accountList && accountList.Status) {
        accountListVm = accountList;
    }

    var vm = _.extend(baseVM.base, {
        data: {
            accountList: accountListVm
        }
    });

    return vm;

}
