/*
 * @Author: dser.wei
 * @Date:   2016-06-30 10:33:02
 * @Last Modified by:   dser.wei
 * @Last Modified time: 2016-06-30 13:11:31
 */

'use strict';

var router = require('../core/baseRouter')({
    prefix: '/api/demo'
});

var baseRes = require('../core/baseResponse');
var dal = require('../dal/main');


router.get('/GetBaseCodeList', function*() {

    var params = this.request.query;
    var res = yield dal.demo.getBaseCodeList(params);

    if(res && res.Status) {
        this.body = baseRes.success(res.Data);
    } else {
        this.body = baseRes.error({}, res.ErrorCode, res.ErrorMessage);
    }

});

router.get('/GetSingleVote', function*() {

    var params = this.request.query;
    var res = yield dal.demo.getSingleVote(params);

    if(res && res.Status) {
        this.body = baseRes.success(res.Data);
    } else {
        this.body = baseRes.error({}, res.ErrorCode, res.ErrorMessage);
    }

});

router.post('/SendMobileValidateSms', function*() {

    var params = this.request.query;
    var res = yield dal.demo.sendMobileValidateSms(params);

    if(res && res.Status) {
        this.body = baseRes.success(res.Data);
    } else {
        this.body = baseRes.error({}, res.ErrorCode, res.ErrorMessage);
    }

});


module.exports = router;
