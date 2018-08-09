/*
 * @Author: dser.wei
 * @Date:   2016-06-30 15:50:43
 * @Last Modified by:   sihuicao
 * @Last Modified time: 2016-08-23 13:59:54
 */

'use strict';

require('koa');
var router = require('./baseRouter')({
    prefix: '/session'
});

var dal = require('../dal/main');
var qExt = require('./asynRequestHelper');
var baseRes = require('./baseResponse');
var errEnum = require('./errCodeHelper');

router.post('/login', function*() {

    var postData = this.request.body;
    if (postData.TokenId) {

        var results = yield qExt.when([]);

        this.session.userContext = {
            tokenId: postData.TokenId,
            companyLogo: postData.CompanyLogo,
            domain: postData.Domain,
            account: postData.Account,
            customerAdminId: postData.CustomerAdminId,
            shortName: postData.ShortName,
            periodValidity: postData.PeriodValidity,
            customerId: postData.CustomerId
        };

        //expire time为30min
        // this.session.maxAge = 30 * 60 * 1000;

        //expire time为1year
        this.session.maxAge = 365 * 24 * 60 * 60 * 1000;

        this.body = baseRes.success(this.session.userContext);
    } else {
        this.body = baseRes.error({}, errEnum.unAuth, 'unauthorised');
    }
});


router.post('/logout', function*() {

    var postData = this.request.body;
    if (!this.session || !this.session.userContext || postData.TokenId == this.session.userContext.tokenId) {
        this.session = null;
        this.body = baseRes.success({});
    } else {
        this.body = baseRes.error({}, errEnum.unknown, 'unknown');
    }
});


router.get('/getContext', function*() {
    if (this.session.userContext) {
        this.body = baseRes.success(this.session.userContext);
    } else {
        this.body = baseRes.error({}, errEnum.unAuth, 'unauthorised');
    }
});

router.post('/updateContext', function*() {
    if (this.session.userContext) {
        var tokenId = this.session.userContext.tokenId;

        var results = yield qExt.when([]);

        this.session.userContext = {
            tokenId: tokenId,
            domain: 'test'
        };

        this.body = baseRes.success(this.session.userContext);
    } else {
        this.body = baseRes.error({}, errEnum.unAuth, 'unauthorised');
    }

});

module.exports = router;
