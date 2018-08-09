/*
* @Author: dser.wei
* @Date:   2016-06-28 15:26:19
* @Last Modified by:   sihuicao
* @Last Modified time: 2016-08-24 16:42:11
*/

'use strict';

require('./about.less');

// npm 引用
var $ = require('jquery');
var React = require('react');
var ReactDom = require('react-dom');

// core 引用
var printer = require('../../core/printer');

// comp 引用
var Header = require('../../components/header/index');
var Footer = require('../../components/footer/index');


ReactDom.render(<Header title="" type="1" titleType='2'/>, $("#header")[0]);
ReactDom.render(<Footer />, $("#footer")[0]);

$(function() {

});
