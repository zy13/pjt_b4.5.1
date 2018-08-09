/*
 * @Author: yongquan.wu
 * @Date:   2016-07-25 14:31:01
 * @Last Modified by:   yongquan.wu
 * @Last Modified time: 2016-07-25 14:59:53
 */

'use strict';

var baseVM = require('../../core/baseViewModel');
var errEnum = require('../../core/errCodeHelper');
var dal = require('../../dal/main');
var qExt = require('../../core/asynRequestHelper');
var _ = require('lodash');


var queryPersonalInfoVM = function*(opts){

    var r = yield * qExt.when([dal.user.queryPersonalInfo(opts)]);

    var data;
    if(r[0] && r[0].Status){
        data=r[0].Data;
    }

    var vm = _.extend(baseVM,{data:data});
    return vm;
}

module.exports={
    queryPersonalInfoVM:queryPersonalInfoVM
}
