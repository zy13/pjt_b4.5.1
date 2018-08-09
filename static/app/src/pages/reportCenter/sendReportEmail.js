/*
 * @Author: yongquan.wu
 * @Date:   2016-06-28 15:26:19
* @Last modified by:   Jet.Chan
* @Last modified time: 2016-09-09T11:27:23+08:00
 */

'use strict';

// npm 引用
var $ = require('jquery');
var React = require('react');
var ReactDom = require('react-dom');

if (process.env.BROWSER) {
    var cui = require('c-ui');
}

// core 引用
var printer = require('../../core/printer');
var context = require('../../core/context');
var util = require('../../core/util');

// comp 引用
var Header = require('../../components/header/index');
var Footer = require('../../components/footer/index');
var SendReportEmail = require('../../components/send-report-email/index');

//dal
var dal = require('../../dal/main');

ReactDom.render(
    <Header title="推送报告" type="1"/>, $("#header")[0]);
ReactDom.render(
    <Footer/>, $("#footer")[0]);
//ReactDom.render(<SendReportEmail />, $("#content")[0]);

$(function() {
    context.get().then(function() {
        var ids = util.urlContext().ids || '';
        dal.report.GetReportUrl({CustomerAdminId: window.userContext.customerAdminId, CustomerId: window.userContext.customerId, UserExamIds: ids}).then(function(res) {
            if (res.status) {
                var lookContent = res.data.PushReportUrl.replace(/(<\/?a.*?>)/g, '');
                ReactDom.render(
                    <SendReportEmail Content={lookContent} ContentData={res.data.PushReportUrl}/>, $("#content")[0]);
            } else {
                var errorMsg = res.message || '后台处理异常';
                cui.popTips.errorTip(errorMsg);
            }
        }, function(err) {
            var errorMsg = err.message || '后台处理异常';
            cui.popTips.errorTip(errorMsg);
        });
    });
});
