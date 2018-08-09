/*
 * @Author: liexin.chen
 * @Date:   2016-07-12 16:03:45
* @Last modified by:   Jet.Chan
* @Last modified time: 2016-09-14T16:12:12+08:00
 */

'use strict';

var router = require('../core/baseRouter')({
	prefix: '/api/report'
});

var baseRes = require('../core/baseResponse');
var dal = require('../dal/main');

router.get('/QueryResults', function*() {

	var params = this.request.query;
	var res = yield dal.reportList.queryResults(params);

	if (res && res.Status) {
		this.body = baseRes.success(res.Data);
	} else {
		this.body = baseRes.error({}, res.ErrorCode, res.ErrorMessage);
	}

});


router.post('/GetReportUrl',function*(){
    var params = this.request.body;
    var res = yield dal.reportList.GetReportUrl(params);

    if (res && res.Status) {
        this.body = baseRes.success(res.Data);
    } else {
        this.body = baseRes.error({}, res.ErrorCode, res.ErrorMessage);
    }
});

router.post('/SendReportEmail',function*(){
    var params = this.request.body;
    var res = yield dal.reportList.SendReportEmail(params);

    if (res && res.Status) {
        this.body = baseRes.success(res);
    } else {
        this.body = baseRes.error(res, res.ErrorCode, res.ErrorMessage);
    }
});

router.get('/QueryReports',function*(){
    var params = this.request.query;
    var res = yield dal.reportList.QueryReports(params);

    if (res && res.Status) {
        this.body = baseRes.success(res);
    } else {
        this.body = baseRes.error(res, res.ErrorCode, res.ErrorMessage);
    }
});

module.exports = router;
