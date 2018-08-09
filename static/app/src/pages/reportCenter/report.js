/*
 * @Author: liexin.chen
 * @Date:   2016-07-19 09:55:23
 * @Last Modified by:   sihuicao
 * @Last Modified time: 2016-09-02 23:06:28
 */

'use strict';

require('./report.less');
var cui = require('c-ui');

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
var Sidebar = require('../../components/sidebar/index');
var Totop = require('../../components/totop/index');

// dal 引用
var dal = require('../../dal/main');
var sidebar;

//ReactDom.render(<Header title="测评报告结果" type="3" />, document.getElementById('header'));
ReactDom.render(<Footer />, document.getElementById('footer'));
ReactDom.render(<Totop />, document.getElementById('totop'));


$(function() {
    var message = $('#dataMessage').val();
    if(message){
        cui.popTips.warnTip(message);
    }
    var arr = location.href.split('/');
    var id=arr[arr.length-1];
    ReactDom.render(<Header title="测评报告结果" type="3" shareId={id} />, document.getElementById('header'));

});
