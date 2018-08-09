/*
 * @Author: dser.wei
 * @Date:   2016-06-28 15:10:41
 * @Last Modified by:   sihuicao
 * @Last Modified time: 2016-08-24 14:34:22
 */

'use strict';

//require('./login.less');

// npm 引用
var $ = require('jquery');
var React = require('react');
var ReactDom = require('react-dom');

// core 引用
var printer = require('../../core/printer');
var context = require('../../core/context');

// comp 引用
var Header = require('../../components/header/index');
var Footer = require('../../components/footer/index');
var Login = require('../../components/login/index');

// dal 引用
var dal = require('../../dal/main');


// ReactDom.render(<Header title='欢迎使用TAS人才测评系统-移动办公室' type='0' />, document.getElementById('header'));
ReactDom.render(<Footer />, document.getElementById('footer'));
ReactDom.render(<Login />, document.getElementById('login'));

$(function() {

    context.get().then(function() {
        // printer.log(window.userContext);
    });

    // 以下为客户端api请求及userContext请求示例代码
    /*dal.demo.getBaseCodeList().then(function(res) {
        printer.log(res);
    });

    dal.demo.getSingleVote().then(function(res) {
        printer.log(res);
    });

    dal.demo.sendMobileValidateSms({mobile:'13580515020'}).then(function(res) {
        printer.log(res);
    });

    $.ajax({
        url: '/session/login',
        type: 'POST',
        data: {TokenId:'asdfasdfasdfasdfasdf'},
        dataType: 'json'
    });

    context.get().then(function(){
        printer.log(window.userContext);
    });*/

});
