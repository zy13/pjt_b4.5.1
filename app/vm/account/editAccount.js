/*
* @Author: sihuicao
* @Date:   2016-08-10 16:17:02
* @Last Modified by:   sihuicao
* @Last Modified time: 2016-08-22 14:29:26
*/

'use strict';
var baseVM = require('../../core/baseViewModel');
var errEnum = require('../../core/errCodeHelper');
var dal = require('../../dal/main');
var qExt = require('../../core/asynRequestHelper');
var _ = require('lodash');


module.exports = function*(opts) {

    var editaccount = yield dal.account.editAccount(opts),
        editaccountVm = {};

    if (editaccount && editaccount.Status) {
        editaccountVm = editaccount;
    }

    // console.log(editaccount)
    var vm = _.extend(baseVM.base, {
        data: {
            editaccount: editaccountVm
        }
    });

    return vm;

}
