/*
* @Author: dser.wei
* @Date:   2016-06-28 15:22:23
* @Last Modified by:   sihuicao
* @Last Modified time: 2016-09-01 11:56:42
*/

'use strict';

require('./404.less');

// npm 引用
var $ = require('jquery');
var React = require('react');
var ReactDom = require('react-dom');

// core 引用
var printer = require('../../core/printer');

// comp 引用
var Header = require('../../components/header/index');
var Footer = require('../../components/footer/index');


ReactDom.render(<Header title="" type="0" titleType="1" />, $("#header")[0]);
ReactDom.render(<Footer />, $("#footer")[0]);

$(function() {

});
