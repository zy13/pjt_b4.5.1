/*
 * @Author: sihuicao
 * @Date:   2016-08-04 17:32:49
 * @Last Modified by:   zyuan
 * @Last Modified time: 2017-06-16 14:41:26
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


var select = React.createClass({
    getInitialState: function() {
        return {
            isWarnTip: false,
            warnTipContent: ''
        };
    },
    render: template,
    callbackSelectAll: function() {
        this.props.callbackSelectAll();
    },
    handleExam: function() {
        this.props.callbackExamMes(false);
    },
    handleExamShow: function() {
        if (this.props.BatchRight) {

            if (!this.props.sendStatus) {
                cui.popTips.warnTip('请选择帐号');
                return;
            }
            this.props.callbackExamMes(true);
        } else {
            cui.popTips.warnTip('无发送短信、邮件权限');
        }

    },
    handleUrgent: function() {
        this.props.callbackUrgentMes();
    },
    handleConfirm: function() {
        location.href = "/accountCenter/sendEmailMsg/" + this.props.projectId + '/' + this.props.subProjectId;
    },
    handleAdd: function() {
        location = "/accountCenter/addAccount/" + this.props.projectId + '/' + this.props.subProjectId;
    }

});

module.exports = select;
