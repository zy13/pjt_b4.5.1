/*
 * @Author: liexin.chen
 * @Date:   2016-07-15 15:23:40
 * @Last Modified by:   sihuicao
 * @Last Modified time: 2016-08-08 17:14:54
 */

'use strict';

var router = require('../core/baseRouter')({
    prefix: '/api/accessmentMobile'
});

var baseRes = require('../core/baseResponse');
var dal = require('../dal/main');
var util = require('util');
var md5Sign = require('../core/sign');

router.get('/GetProjectList', function*() {


    var params = this.request.query;
    var res = yield dal.accessmentMobile.getProjectList(params);

    if (res && res.Status) {
        this.body = baseRes.success(res);
    } else {
        this.body = baseRes.error({}, res.ErrorCode, res.ErrorMessage);
    }

});

router.get('/CreateQRCode', function*() {

    var conf = global.appConfig.app;

    var params = this.request.query;
    var signParm = {
        CustomerId: params.CustomerId,
        ProjectId: params.ProjectId
    };
    params.sign = md5Sign(signParm);

    this.redirect('http://' + conf.http.host + '/JWebApi5/AssessmentMobile/CreateQRCode?' + require('querystring').stringify(params));


    /*this.set({
        'Access-Control-Allow-Headers': 'X-Requested-With',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Content-Type': 'image/png;charset=utf-8',
        'Expires': '-1',
        'Pragma': 'no-cache',
        'Transfer-Encoding': 'chunked'
    });

    this.type = 'image/png;charset=utf-8';
    this.body = res;*/


    /*var params = this.request.query;
    var res = yield dal.accessmentMobile.createQRCode(params);

    if (res && res.Status) {
        this.body = res;
    } else {
        this.body = baseRes.error({}, res.ErrorCode, res.ErrorMessage);
    }*/

});


module.exports = router;
