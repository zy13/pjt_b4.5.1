/*
 * @Author: dser.wei
 * @Date:   2016-06-28 15:26:19
 * @Last Modified by:   dser.wei
 * @Last Modified time: 2016-06-28 15:31:28
 */

'use strict';

// npm 引用
var $ = require('jquery');
var React = require('react');
var ReactDom = require('react-dom');

// core 引用
var printer = require('../../core/printer');

// comp 引用
var Header = require('../../components/header/index');
var Footer = require('../../components/footer/index');
var PersonalInfo = require('../../components/personal-info/index');


ReactDom.render(<Header title="个人信息" type="1" />, $("#header")[0]);
//ReactDom.render(<Footer />, $("#footer")[0]);
//ReactDom.render(<PersonalInfo />, $("#content")[0]);

$(function() {

});
