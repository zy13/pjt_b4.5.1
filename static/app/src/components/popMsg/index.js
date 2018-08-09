/*
 * @Author: dser.wei
 * @Date:   2016-07-11 15:31:39
 * @Last Modified by:   liexin.chen
 * @Last Modified time: 2016-07-15 13:10:00
 */

'use strict';

var React = require('react');
var template = require('./template.jsx');

var cui = require('c-ui');
require('c-ui/assets/style.css');
require('./style.less');

var $ = require('jquery');
var className = require('classnames');
var printer = require('../../core/printer');

var popMsg = React.createClass({
    getInitialState: function() {
        this.classnames = [];
        this.classnames.push('pjt-popMsg');

        return {
            bodyClass: className(this.classnames)
        };
    },
    render: template,
    open: function() {
        this.classnames.push('active');

        this.setState({
            bodyClass: className(this.classnames)
        });

        this.refs.popBlock.open();
    },
    close: function() {
        this.classnames.pop();

        this.setState({
            bodyClass: className(this.classnames)
        });

        this.refs.popBlock.close();
    },
    cancel: function() {
        this.close();
    },
    confirm: function() {
        /**
         * 可以在调用open时候
         * 写入callbcak
         * 如果不写入，默认刷新页面
         */
        if (this.callback && typeof this.callback === 'function') {
            this.callback();
            this.callback = undefined;
            this.close();
        } else {
            location.reload();
        };
    }
});

module.exports = popMsg;