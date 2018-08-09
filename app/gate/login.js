/*
 * @Author: liexin.chen
 * @Date:   2016-06-30 10:33:02
* @Last modified by:   Jet.Chan
* @Last modified time: 2016-09-07T11:46:07+08:00
 */

'use strict';

var router = require('../core/baseRouter')({
    prefix: '/api/login'
});

var baseRes = require('../core/baseResponse');
var dal = require('../dal/main');

router.post('/Login', function*() {

    var params = this.request.body;
    var res = yield dal.login.login(params);

    if (res && res.Status) {
        if (res.ErrorCode && res.ErrorCode > 0) {
            this.body = baseRes.error(res, res.ErrorCode, res.Message);
        } else {
            this.body = baseRes.success(res);
        }
    } else {
        this.body = baseRes.error(res, res.ErrorCode, res.ErrorMessage);
    }

});

module.exports = router;
