/*
* @Author: sihuicao
* @Date:   2016-08-08 16:13:34
* @Last Modified by:   sihuicao
* @Last Modified time: 2016-08-22 14:19:56
*/

'use strict';

var router = require('../core/baseRouter')({
    prefix: '/api/account'
});

var baseRes = require('../core/baseResponse');
var dal = require('../dal/main');

router.get('/QueryAccount', function*() {

    var params = this.request.query;
    var res = yield dal.account.queryAccount(params);

    if (res && res.Status) {
        this.body = baseRes.success(res);
    } else {
        this.body = baseRes.error(res, res.ErrorCode, res.ErrorMessage);
    }

});

router.get('/SendEMailAndSms', function*(){
    var params = this.request.query;
    var res = yield dal.account.sendEMailAndSms(params);

    if (res && res.Status) {
        this.body = baseRes.success(res);
    } else {
        this.body = baseRes.error(res, res.ErrorCode, res.ErrorMessage);
    }
});

router.post('/AddAccount', function*() {
    var params = this.request.body;
    var res = yield dal.account.addAccount(params);
    if (res && res.Status) {
        this.body = baseRes.success(res);
    } else {
        this.body = baseRes.error(res, res.ErrorCode, res.ErrorMessage);
    }
});

router.get('/CreateAccount', function*() {
    var params = this.request.query;
    var res = yield dal.account.createAccount(params);
    if (res && res.Status) {
        this.body = baseRes.success(res);
    } else {
        this.body = baseRes.error(res, res.ErrorCode, res.ErrorMessage);
    }
});

router.get('/GetPushTemplate', function*(){
    var params = this.request.query;
    var res = yield dal.account.getPushTemplate(params);
    if (res && res.Status) {
        this.body = baseRes.success(res);
    } else {
        this.body = baseRes.error(res, res.ErrorCode, res.ErrorMessage);
    }
});

router.post('/EditAccount', function*() {
    var params = this.request.body;
    var res = yield dal.account.editAccount(params);

    if (res && res.Status) {
        this.body = baseRes.success(res);
    } else {
        this.body = baseRes.error(res, res.ErrorCode, res.ErrorMessage);
    }
});

router.get('/GetSMSInformation', function*() {
    var params = this.request.query;
    var res = yield dal.account.getSMSInformation(params);

    if (res && res.Status) {
        this.body = baseRes.success(res);
    } else {
        this.body = baseRes.error(res, res.ErrorCode, res.ErrorMessage);
    }
});


module.exports = router;
