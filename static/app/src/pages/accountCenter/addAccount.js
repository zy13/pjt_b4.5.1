/*
* @Author: sihuicao
* @Date:   2016-08-09 17:52:09
* @Last Modified by:   zyuan
* @Last Modified time: 2017-04-01 10:15:44
*/

'use strict';

require('./style.less');

var cui = require('c-ui');

// npm 引用
var $ = require('jquery');
var React = require('react');
var ReactDom = require('react-dom');
var touch = require('touchjs');

// core 引用
var printer = require('../../core/printer');
var context = require('../../core/context');
var util = require('../../core/util');

// comp 引用
var Header = require('../../components/header/index');
var Footer = require('../../components/footer/index');
// var Sidebar = require('../../components/sidebar/index');

var Totop = require('../../components/totop/index');
var AddAccount= require('../../components/addAccount/index');

// dal 引用
var dal = require('../../dal/main');


ReactDom.render(<Footer />, $("#footer")[0]);
ReactDom.render(<Totop />, $("#totop")[0]);

// var sidebar = ReactDom.render(<Sidebar/>, $("#sidebar")[0]);


$(function(){
    var projectId = location.pathname.match(/addAccount\/(\d+)/)[1];
    var subProjectId = location.pathname.match(/addAccount\/(\d+)\/(\d+)/)[2];
    var href = "/accountCenter/index/"+projectId+'/'+subProjectId;

    context.get().then(function() {
        dal.account.createAccount({
            CustomerId: window.userContext.customerId,
            ProjectId: projectId,
            UserId: 0
        }).then(function(res) {
            if(!res.status){
                cui.popTips.warnTip('出错啦');
                return;
            }
            var data = res.data.Data.UserSet?res.data.Data.UserSet:[];
            ReactDom.render(<AddAccount
                projectId={projectId}
                subProjectId={subProjectId}
                data={data}
            />,$('#addAccount')[0]);
            ReactDom.render(<Header
                title = "新建帐号"
                type = "1"
                href = {href}
            />, $("#header")[0]);
        });
    });
});
