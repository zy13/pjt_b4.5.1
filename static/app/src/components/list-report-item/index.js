/*
 * @Author: liexin.chen
 * @Date:   2016-07-05 10:38:54
* @Last modified by:   Jet.Chan
* @Last modified time: 2016-09-18T10:31:44+08:00
 */

'use strict';

var cui,
    $,
    dal;

var React = require('react');
var template = require('./template.jsx');

// node环境下不引用
if (process.env.BROWSER) {
    cui = require('c-ui');
    require('c-ui/assets/style.css');
    require('./style.less');

    dal = require('../../dal/main');
    $ = require('jquery');
}

var login = React.createClass({
    getDefaultProps: function() {
        return {
            type: 0 // 0收起 1展开
        };
    },
    getInitialState: function() {
        return {
            isShow: !!this.props.type
        };
    },
    render: template,
    handleSlide: function() {

        /**
         * 展开收起
         */
        this.setState({
            isShow: !this.state.isShow
        });

    },
    handleSelect: function(event) {

        /**
         * 用于多选通知父组件 this -> list-project -> list-report
         */
        var key = this.props.index;
        this.props.callbackSelect({[key]: event.target.checked})

    },
    handleExistReport: function(userExamId) {
        if (userExamId) {
            dal.report.QueryReports({
                userExamId:userExamId,
                creator:window.userContext.account,
                domain:window.userContext.domain
            }).then(function(res) {
                if (res && res.status) {
                    if (res.data.Data && res.data.Data.Content && res.data.Data.Content.length > 0) {
                        window.location.href = res.data.Data.Content;
                    } else {
                        cui.popTips.errorTip('亲，码农小哥正在拼命开发中，请移驾PC端查看报告！');
                    }
                }
            });
        } else {
            cui.popTips.errorTip('无效测评id');
        }
    }
});

module.exports = login;
