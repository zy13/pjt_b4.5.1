/*
 * @Author: dser.wei
 * @Date:   2016-06-22 18:25:37
 * @Last Modified by:   sihuicao
 * @Last Modified time: 2016-09-20 11:27:26
 */

'use strict';

var router = require('../app/core/baseRouter')({
    prefix: '/user'
});

var checkAuth = function*(next) {
    if (!this.session.userContext) {
        this.session = null;
        this.redirect('/user/login');
        return false;
    }
    yield next;
};

router.get('/login', function*() {
    this.render('user/login', {
        title: '欢迎使用倍智TAS人才测评系统',
        noHead:true,
        // headerHtml: require('../app/service/isomorphic/header')({
        //     title: "欢迎使用TAS人才测评系统-移动办公室",
        //     type: "0"
        // }),
        footerHtml: require('../app/service/isomorphic/footer')()
    });
});

router.get('/personalInfo',function *(){
    //1.get data from api server..
    var obj={
        CustomerAdminId:this.session.userContext.customerAdminId,
        CustomerId:this.session.userContext.customerId
    }

    var getVM=require('../app/vm/user/index');
    var vm = yield * getVM.queryPersonalInfoVM(obj);

    //2.render..
    this.render('user/personalInfo',{
        title: '个人信息',
        headerHtml: require('../app/service/isomorphic/header')({
            title: "个人信息",
            type: "1"
        }),
        footerHtml: require('../app/service/isomorphic/footer')(),
        personalInfoHtml: require('../app/service/isomorphic/personalInfo')({
            Account:vm.data.Account,
            Email:vm.data.Email,
            GroupName:vm.data.GroupName,
            Name:vm.data.Name,
            RoleName:vm.data.RoleName
        })
    });

});

router.get('/about', checkAuth, function*() {
    this.render('user/about', {
        title: '关于倍智TAS人才测评系统触屏版',
        headerHtml: require('../app/service/isomorphic/header')({
            title: "",
            type: "1",
            titleType:'2'
        }),
        footerHtml: require('../app/service/isomorphic/footer')()
    });
});

module.exports = router;
