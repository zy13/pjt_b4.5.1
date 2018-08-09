/*
 * @Author: dser.wei
 * @Date:   2016-06-20 15:52:51
 * @Last Modified by:   sihuicao
 * @Last Modified time: 2016-09-20 13:31:17
 */

'use strict';

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

router.get('/', checkAuth, function*() {
    var domain = this.session.userContext.domain;
    this.redirect('/' + domain);
});

router.get('/:domain', checkAuth, function*() {
    var domain = this.params.domain;
    var keyword = this.request.query.key || '';

    var getVm = require('../app/vm/main/index');
    var vm = yield * getVm({
        CustomerAdminId: this.session.userContext.customerAdminId,
        CustomerId: this.session.userContext.customerId,
        KeyWord: keyword,
        PageIndex: 0,
        PageSize: 10
    });

    var listType = '';
    if (vm.data.projectList.totalCount > 0) {
        listType = 'list';
    } else {
        if (keyword) {
            listType = 'error-nodata';
        } else {
            listType = 'error';
        }
    }

    this.render('main/index', {
        title: '倍智TAS人才测评系统',
        headerHtml: require('../app/service/isomorphic/header')({
            title: "",
            type: "2",
            titleType:'1',
            logo: this.session.userContext.companyLogo
        }),
        footerHtml: require('../app/service/isomorphic/footer')(),
        listType: listType,
        listHtml: require('../app/service/isomorphic/list')({
            domain: this.session.userContext.domain,
            type: listType,
            list: vm.data.projectList.data.List || [],
            totalCount: vm.data.projectList.totalCount || 0,
            remainsCount: vm.data.projectList.remainsCount || 0,
            pageIndex: vm.data.projectList.pageIndex || 0,
            accountRight: vm.data.projectList.accountRight || false,
            reportRight: vm.data.projectList.reportRight || false,
            createRight: vm.data.projectList.createRight || false
        })
    });

});


module.exports = router;
