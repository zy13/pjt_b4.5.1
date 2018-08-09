/*
* @Author: sihuicao
* @Date:   2016-08-17 11:18:13
* @Last Modified by:   zyuan
* @Last Modified time: 2016-08-17 14:21:17
*/

'use strict';
var baseVM = require('../../core/baseViewModel');
var errEnum = require('../../core/errCodeHelper');
var dal = require('../../dal/main');
var qExt = require('../../core/asynRequestHelper');
var _ = require('lodash');


module.exports = function*(opts) {

    // 以下为服务端端api请求示例代码
    var sendEmailMsgListVm = {},
        getPushTemplateVm = {},
        getSMSInformationVm = {};
    var r = yield * qExt.when([dal.account.sendEMailAndSms(opts), dal.account.getPushTemplate(opts), dal.account.getSMSInformation(opts)]);

    if(r[0] && r[0].Status) {
        sendEmailMsgListVm = r[0];
    }

    if(r[1] && r[1].Status) {
        getPushTemplateVm = r[1];
    }

    if(r[2] && r[2].Status) {
        getSMSInformationVm = r[2];
    }

    var vm = _.extend(baseVM.base, {
        data: {
            sendEmailMsg: sendEmailMsgListVm,
            getPushTemplate: getPushTemplateVm,
            getSMSInformation: getSMSInformationVm
        }
    });

    return vm;

}
