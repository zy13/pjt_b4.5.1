/*
* @Author: sihuicao
* @Date:   2016-08-10 10:32:42
* @Last Modified by:   sihuicao
* @Last Modified time: 2016-08-22 14:29:23
*/

'use strict';
var baseVM = require('../../core/baseViewModel');
var errEnum = require('../../core/errCodeHelper');
var dal = require('../../dal/main');
var qExt = require('../../core/asynRequestHelper');
var _ = require('lodash');


module.exports = function*(opts) {

    var createAccount = yield dal.account.createAccount(opts),
        createAccountVm = {};

    if (createAccount && createAccount.Status) {
        createAccountVm = createAccount;
    }

    // console.log(createAccount)
    var vm = _.extend(baseVM.base, {
        data: {
            createAccountVm: createAccountVm
        }
    });

    return vm;

}
