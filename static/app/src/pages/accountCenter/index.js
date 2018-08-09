/*
 * @Author: liexin.chen
 * @Date:   2016-06-27 14:30:09
 * @Last Modified by:   sihuicao
 * @Last Modified time: 2016-09-02 23:05:56
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

var Totop = require('../../components/totop/index');
var Account= require('../../components/accountCenter/index');

// dal 引用
var dal = require('../../dal/main');


ReactDom.render(<Footer />, $("#footer")[0]);
ReactDom.render(<Totop />, $("#totop")[0]);


$(function() {
    //lazyload
    cui.img.lazyLoad();
    var keyword = util.urlContext().key || '';
    var projectId = location.pathname.match(/index\/(\d+)/)[1];
    var subProjectId = location.pathname.match(/index\/(\d+)\/(\d+)/)[2];

    context.get().then(function() {
        var href = '/'+window.userContext.domain;
        dal.account.queryAccount({
            CustomerAdminId:window.userContext.customerAdminId,
            CustomerId: window.userContext.customerId,
            ProjectId: projectId,
            SubProjectId: subProjectId,
            ExamStatus:null,
            MailStatus:null,
            SmsStatus:null,
            PageIndex: 0,
            PageSize: 10,
            KeyWord: decodeURIComponent(keyword)
        }).then(function(res) {
            if(!res.status){
                cui.popTips.errorTip('出错啦');
                return;
            }
            var _data = res.data;
            var listType = '';
            if (_data.Data.TotalItemCount > 0) {
                listType = 'list';
            } else {
                if (keyword) {
                    listType = 'error-nodata';
                } else {
                    listType = 'error-noData';
                }
            }
            // console.log(_data)
            ReactDom.render(<Account
                keyword={keyword}
                list={_data}
                type={listType}
                projectId={projectId}
                subProjectId={subProjectId}
            />, $("#accountCenter")[0]);
            ReactDom.render(<Header
                title= "帐号管理"
                type= "1"
                href={href}
            />,$('#header')[0]);
        });

    })

});
