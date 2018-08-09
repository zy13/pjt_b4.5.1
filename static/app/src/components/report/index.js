/*
 * @Author: liexin.chen
 * @Date:   2016-07-19 10:12:31
 * @Last Modified by:   liexin.chen
 * @Last Modified time: 2016-07-19 10:13:23
 */


'use strict';

var cui;
var $;

var React = require('react');
var template = require('./template.jsx');

// node环境下不引用
if (process.env.BROWSER) {
    cui = require('c-ui');
    require('c-ui/assets/style.css');
    require('./style.less');

    $ = require('jquery');
}

var report = React.createClass({
    render: template
});

module.exports = report;