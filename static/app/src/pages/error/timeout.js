/*
 * @Author: chenliexin
 * @Date:   2016-06-28 15:22:23
 * @Last Modified by:   sihuicao
 * @Last Modified time: 2016-09-02 20:53:18
 */

'use strict';

require('./timeout.less');

// npm 引用
var $ = require('jquery');
var React = require('react');
var ReactDom = require('react-dom');

// core 引用
var printer = require('../../core/printer');

// comp 引用
var Header = require('../../components/header/index');
var Footer = require('../../components/footer/index');


ReactDom.render(<Header title="TAS人才测评系统" type="0" />, document.getElementById('header'));
ReactDom.render(<Footer />, document.getElementById('footer'));

$(function() {

    setTimeout(function() {
        window.location.href = '/user/login';
    }, 3000);

});
