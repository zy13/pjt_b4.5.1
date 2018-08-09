/*
 * @Author: dser.wei
 * @Date:   2016-06-27 16:58:17
 * @Last Modified by:   sihuicao
 * @Last Modified time: 2016-08-17 22:23:18
 */

'use strict';

var cui;
var $;

var React = require('react');
var template = require('./template.jsx');

// node环境下不引用
if (process.env.BROWSER) {
    cui = require('c-ui');
    // require('c-ui/assets/style.css');
    require('./style.less');

    $ = require('jquery');
}


var footer = React.createClass({

    render: template,
});

module.exports = footer;
