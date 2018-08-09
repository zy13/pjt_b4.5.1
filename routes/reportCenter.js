/*
 * @Author: liexin.chen
 * @Date:   2016-06-22 18:25:37
* @Last modified by:   Jet.Chan
* @Last modified time: 2016-09-09T11:27:20+08:00
 */

'use strict';

/*var router = require('../app/core/baseRouter')({
    prefix: '/reportCenter'
});*/
var router = require('koa-router')();


var checkAuth = function*(next) {
    if (!this.session.userContext) {
        this.session = null;
        this.redirect('/user/login');
        return false;
    }
    if (this.session.userContext.domain && this.params.domain != this.session.userContext.domain) {
        this.redirect('/user/login');
        return false;
    };
    yield next;
};

router.get('/:domain/reportCenter/items/:objectId', checkAuth, function*() {
    var domain = this.params.domain;
    var objectId = this.params.objectId;
    var keyword = this.request.query.key;
    var getVM = require('../app/vm/reportCenter/index');
    var vm = yield * getVM({
        CustomerId: this.session.userContext.customerId,
        KeyWord: keyword,
        PageIndex: 0,
        PageSize: 10,
        ProjectId: objectId
    });
    var href = domain;

    this.render('reportCenter/index', {
        title: '欢迎使用TAS人才测评系统-移动办公室',
        headerHtml: require('../app/service/isomorphic/header')({
            title: "查看结果",
            type: "1",
            href: href
        }),
        footerHtml: require('../app/service/isomorphic/footer')(),
        reportListHtml: require('../app/service/isomorphic/reportList')({
            domain: domain,
            data: vm.data.reportList
        })
    });
});

router.get('/:domain/reportCenter/report/:userExamId', checkAuth, function*() {
    var userExamId = this.params.userExamId;
    var getVM = require('../app/vm/reportCenter/report');
    var vm = yield * getVM({
        UserExamId: userExamId
    });
    this.render('reportCenter/report', {
        title: '欢迎使用TAS人才测评系统-移动办公室',
        headerHtml: require('../app/service/isomorphic/header')({
            title: "测评报告结果",
            type: "1"
        }),
        footerHtml: require('../app/service/isomorphic/footer')(),
        reportHtml: vm.data.report.Content,
        message: vm.data.report.Message
    });
});

//sendReportEmail--邮件推送报告
router.get('/:domain/reportCenter/sendReportByEmail', checkAuth, function*() {
    var userExamIds = this.request.query.ids;
    var getVM = require('../app/vm/reportCenter/sendReportByEmail');
    var vm = yield * getVM.getReportUrl({
        CustomerAdminId: this.session.userContext.customerAdminId,
        CustomerId: this.session.userContext.customerId,
        UserExamIds: userExamIds
    });

    var lookContent;
    if (vm.data && vm.data.PushReportUrl) {
        lookContent = vm.data.PushReportUrl.replace(/(<\/?a.*?>)/g, '');
    }

    this.render('reportCenter/sendReportEmail', {
        title: '推送报告',
        headerHtml: require('../app/service/isomorphic/header')({
            title: "推送报告",
            type: "1"
        }),
        footerHtml: require('../app/service/isomorphic/footer')(),
        emailHtml: require('../app/service/isomorphic/sendReportEmail')({
            Content: lookContent,
            ContentData: vm.data.PushReportUrl
        })
    });
});

module.exports = router;
