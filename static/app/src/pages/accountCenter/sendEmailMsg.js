/*
 * @Author: zyuan
 * @Date:   2016-08-03 16:08:00
 * @Last Modified by:   zyuan
 * @Last Modified time: 2017-04-11 10:30:19
 */

'use strict';

require('./sendEmailMsg.less');

if (process.env.BROWSER) {
    var cui = require('c-ui');
}

// npm 引用
var $ = require('jquery');
var React = require('react');
var ReactDom = require('react-dom');

// core 引用
var printer = require('../../core/printer');
var context = require('../../core/context');
var util = require('../../core/util');

// comp 引用
var Header = require('../../components/header/index');
var Footer = require('../../components/footer/index');
var SendEmailMsg = require('../../components/send-email-msg/index');

// dal 引用
var dal = require('../../dal/main');


ReactDom.render(<Footer /> , $("#footer")[0]);


$(function() {
    var projectId = location.pathname.match(/sendEmailMsg\/(\d+)/)[1];
    var subProjectId = location.pathname.match(/sendEmailMsg\/(\d+)\/(\d+)/)[2];
    var href = '/accountCenter/index/' + projectId + '/' + subProjectId;

    ReactDom.render(<Header title = "发送测评" type = "1" href = {href}/>, $("#header")[0]);

    context.get().then(function() {
        dal.account.getPushTemplate({
            CustomerId: window.userContext.customerId,
            Creater: window.userContext.account
        }).then(function(res){
            var _data = res.data.Data;
            if(res.status&&res.data.Data){
                ReactDom.render(<SendEmailMsg
                    PushTemplate={_data}
                    ProjectId={projectId}
                    SubProjectId={subProjectId}
                    SmsTemplateId={_data.SmsTemplate[0].SmsTemplateId}
                /> , $("#content")[0]);
            }
        });
    });
});
