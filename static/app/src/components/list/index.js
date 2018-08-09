/*
 * @Author: liexin.chen
 * @Date:   2016-07-05 10:38:54
 * @Last Modified by:   chenliexin
 * @Last Modified time: 2016-07-20 17:13:41
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

var list = React.createClass({
    propTypes: function() {
        type: React.PropTypes.string.isRequired
    },
    getDefaultProps: function() {
        return {
            type: 'list'
        };
    },
    getInitialState: function() {
        return {
            list: this.props.list,
            totalCount: this.props.totalCount,
            remainsCount: this.props.remainsCount,
            pageIndex: this.props.pageIndex,
            accountRight: this.props.accountRight,
            reportRight: this.props.reportRight,
            createRight: this.props.createRight
        };
    },
    render: template,
    callbackState: function(opt) {

        this.setState(opt);

    }
});

module.exports = list;