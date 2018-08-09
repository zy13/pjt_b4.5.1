/*
 * @Author: yongquan.wu
 * @Date:   2016-07-25 17:48:11
 * @Last Modified by:   zyuan
 * @Last Modified time: 2016-08-17 15:29:58
 */

'use strict';

var q = require('q');
var http = require('../core/http');
var md5Sign = require('../core/sign');


/**
 * 获取用户个人信息
 * @param obj
 * return promise
 */
function queryPersonalInfo(obj) {
    if (!obj || typeof obj !== 'object') {
        var dfd = q.defer();
        dfd.reject('err:param error');
        return dfd.promise;
    }

    //签名...参数必须按照约定的顺序输入
    var signParm = {
        CustomerId: obj.CustomerId,
        CustomerAdminId: obj.CustomerAdminId
    }
    var sign = md5Sign(signParm);

    console.log(sign);

    var request = http.get('/JWebApi5/AssessmentMobile/QueryAdminInfo', {
        CustomerAdminId: obj.CustomerAdminId,
        CustomerId: obj.CustomerId,
        sign: sign
    });
    return request;
}

module.exports = {
    queryPersonalInfo: queryPersonalInfo
}
