/*
 * @Author: liexin.chen
 * @Date:   2016-07-05 10:38:54
 * @Last Modified by:   sihuicao
 * @Last Modified time: 2016-08-08 20:31:00
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

var listProjectItem = React.createClass({
    getDefaultProps: function() {
        return {
            type: 0,
            classShow: 'list-project-show'
        };
    },
    getInitialState: function() {
        return {
            isShow: false
        };
    },
    componentWillMount: function() {
        this.setState({
            isShow: !!this.props.type
        });
    },
    componentWillUpdate: function(nextProps, nextState) {
        if (this.state.isShow !== nextState.isShow) {
            this.refs['list-project-item']
                .classList
                .toggle(this.props.classShow);
        };
    },
    render: template,
    handleSlide: function() {
        this.setState({
            isShow: !this.state.isShow
        });
    },
    handleShowQrcode: function() {
        this.props.callbackParent({
            projectId: this.props.data.ProjectId
        });
    }
});

module.exports = listProjectItem;
