/*
* @Author: dser.wei
* @Date:   2016-07-11 15:31:39
* @Last Modified by:   dser.wei
* @Last Modified time: 2016-07-11 15:58:05
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

var block = React.createClass({
    getInitialState: function() {
        this.classnames = [];
        this.classnames.push('pjt-block');

        return {
            blockClass: className(this.classnames)
        };
    },
    render: template,
    open: function(){
        this.classnames.push('active');

        this.setState({
            blockClass: className(this.classnames)
        });
    },
    close: function() {
        this.classnames.pop();

        this.setState({
            blockClass: className(this.classnames)
        });
    }
});

module.exports = block;
