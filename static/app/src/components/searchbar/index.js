/*
 * @Author: liexin.chen
 * @Date:   2016-07-05 10:38:54
 * @Last Modified by:   zyuan
 * @Last Modified time: 2017-04-12 21:14:57
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

var login = React.createClass({
    getInitialState: function() {
        return {
            value: decodeURIComponent(this.props.keyword)
        };
    },
    render: template,
    search: function() {
        var query = encodeURIComponent($.trim(this.refs.query.value));
        location.href = location.origin + location.pathname + '?key=' + query;
    },
    handleChange: function() {
        this.setState({
            value: event.target.value
        });
    }
});

module.exports = login;
