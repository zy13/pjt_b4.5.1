'use strict';

var checkAuth = function*(next) {
    if (!this.session.userContext) {
        this.session = null;
        this.redirect('/user/login');
        return false;
    }
    yield next;
};

var router = require('../app/core/baseRouter')({
    prefix: '/accountCenter'
});

router.get('/index/:projectid/:subprojectid', checkAuth,function*() {
    var projectId = this.params.projectid;
    var subProjectId = this.params.subprojectid;

    var keyword = this.request.query.key || '';
    var getVm = require('../app/vm/account/index');

    var vm = yield * getVm({
        CustomerAdminId:this.session.userContext.customerAdminId,
        CustomerId: this.session.userContext.customerId,
        ProjectId: projectId,
        SubProjectId: subProjectId,
        ExamStatus:null,
        MailStatus:null,
        SmsStatus:null,
        PageIndex: 0,
        PageSize: 10,
        KeyWord: keyword
    });

    var listType = '';
    if (vm.data&&vm.data.accountList&&vm.data.accountList.Data&&vm.data.accountList.Data.TotalItemCount > 0) {
        listType = 'list';
    } else {
        if (keyword) {
            listType = 'error-nodata';
        } else {
            listType = 'error-noData';
        }
    }
    var href = "/"+this.session.userContext.domain;
    this.render('accountCenter/index', {
        title: '帐号管理',
        headerHtml: require('../app/service/isomorphic/header')({
            title: "帐号管理",
            type: "1",
            href: href
        }),
        accountCenterHtml: require('../app/service/isomorphic/accountCenter')({
            keyword:keyword,
            list:vm.data&&vm.data.accountList?vm.data.accountList:{},
            type:listType,
            projectId:projectId,
            subProjectId:subProjectId
        }),
        footerHtml: require('../app/service/isomorphic/footer')()
    });
});

router.get('/addAccount/:projectid/:subprojectid',checkAuth,function*() {
    var projectId = this.params.projectid;
    var subProjectId = this.params.subprojectid;
    var href="/accountCenter/index/"+projectId+'/'+subProjectId;
    var getVm = require('../app/vm/account/addAccount');

    var vm = yield * getVm({
        CustomerId: this.session.userContext.customerId,
        ProjectId: projectId
    });
    this.render('accountCenter/addAccount', {
        title: '新建帐号',
        headerHtml: require('../app/service/isomorphic/header')({
            title: "新建帐号",
            type: "1",
            href:href
        }),
        addAccountHtml: require('../app/service/isomorphic/addAccount')({
            projectId:projectId,
            subProjectId:subProjectId,
            data:vm.data.createAccountVm&&vm.data.createAccountVm.Data?vm.data.createAccountVm.Data.UserSet:[]
        }),
        footerHtml: require('../app/service/isomorphic/footer')()
    });
})

router.get('/editAccount/:projectid/:subprojectid/:userId',checkAuth,function*() {
    var projectId = this.params.projectid;
    var subProjectId = this.params.subprojectid;
    var userId = this.params.userId;
    var href="/accountCenter/index/"+projectId+'/'+subProjectId;
    var getVm = require('../app/vm/account/addAccount');

    var vm = yield * getVm({
        CustomerId: this.session.userContext.customerId,
        ProjectId: projectId,
        UserId: userId
    });

    this.render('accountCenter/editAccount', {
        title: '修改帐号',
        headerHtml: require('../app/service/isomorphic/header')({
            title: "修改帐号",
            type: "1",
            href:href
        }),
        editAccountHtml: require('../app/service/isomorphic/editAccount')({
            projectId:projectId,
            subProjectId:subProjectId,
            data: vm.data.createAccountVm&&vm.data.createAccountVm.Data?vm.data.createAccountVm.Data.UserSet:[]
        }),
        footerHtml: require('../app/service/isomorphic/footer')()
    });
})


router.get('/sendEmailMsg/:projectid/:subprojectid',checkAuth, function*() {
    console.log('account',this.session.userContext.account)
    var projectId = this.params.projectid;
    var subProjectId = this.params.subprojectid;
    var href="/accountCenter/index/"+projectId+'/'+subProjectId;
    var getVm = require('../app/vm/account/sendEmailMsg');
    var vm = yield * getVm({
        CustomerId: this.session.userContext.customerId,
        CustomerAdminId: this.session.userContext.customerAdminId,
        SmsTemplateId: '',
        MailTemplateId: '',
        ProjectId: subProjectId || '',
        UserIds: '',
        Creater: this.session.userContext.account
    });

    var smsTemplateId = vm.data.getPushTemplate.Data.SmsTemplate[0].SmsTemplateId || '';
    this.render('accountCenter/sendEmailMsg', {
        title: '发送测评',
        headerHtml: require('../app/service/isomorphic/header')({
            title: "发送测评",
            type: "1",
            href:href
        }),
        footerHtml: require('../app/service/isomorphic/footer')(),
        sendEmailMsgHtml: require('../app/service/isomorphic/sendEmailMsg')({
            PushTemplate: vm.data.getPushTemplate.Data,
            ProjectId: projectId,
            SubProjectId: subProjectId,
            SmsTemplateId: smsTemplateId
        })
    });
});

module.exports = router;
