/*
 * @Author: sihuicao
 * @Date:   2016-08-05 11:10:11
 * @Last Modified by:   zyuan
 * @Last Modified time: 2017-04-06 11:42:05
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
    var store = require('store2');
}

var item = React.createClass({
    getInitialState: function() {
        return {
            isWarnTip: false,
            warnTipContent: ''
        }
    },
    render: template,
    handleSilde: function() {
        this.props.callbackSilde(this.props.ivalue.index);
    },
    handleSelect: function() {
        this.props.callbackSelect(this.props.ivalue.index);
    },
    editAccount: function() {
        var data = this.props.ivalue;
        store.set('pjt_editMes', data);
        location.href = "/accountCenter/editAccount/" + this.props.projectId + '/' + this.props.subProjectId + '/' +this.props.ivalue.UserId;
        // this.props.clearStatus();
    },
    handleSend: function() {
        var self = this;
        if (this.props.SendEmailRight) {
            var ival = this.props.ivalue.UserSet;
            var email, mobile;
            ival.map(function(field, index) {
                if (field.FieldName == '邮箱') {
                    email = field.FieldResult;
                }
                if (field.FieldName == '手机') {
                    mobile = field.FieldResult;
                }
            });
            if (email || mobile) {
                this.props.handleSingleSend(this.props.ivalue.UserId);
            } else {
                cui.popTips.warnTip('无可发送的手机号和邮箱');
                // self.setState({
                //     isWarnTip: true,
                //     warnTipContent: '无可发送的手机号和邮箱'
                // }, function() {
                //     setTimeout(function() {
                //         self.setState({
                //             isWarnTip: false,
                //             warnTipContent: ""
                //         })
                //     }, 1500);
                // });
            }
        } else {
            cui.popTips.warnTip('无发送短信、邮件权限');

            // self.setState({
            //     isWarnTip: true,
            //     warnTipContent: '无发送短信、邮件权限'
            // }, function() {
            //     setTimeout(function() {
            //         self.setState({
            //             isWarnTip: false,
            //             warnTipContent: ""
            //         })
            //     }, 1500);
            // });
        }

    }


});

module.exports = item;
