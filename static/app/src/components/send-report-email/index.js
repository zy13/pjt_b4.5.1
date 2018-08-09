/*
 * @Author: yongquan.wu
 * @Date:   2016-07-25 11:12:15
* @Last modified by:   Jet.Chan
* @Last modified time: 2016-09-09T12:13:05+08:00
 */

'use strict';
var React = require('react');
var template = require('./template.jsx');

var cui,
    $,
    dal,
    util;
//node环境下不引用
if (process.env.BROWSER) {
    cui = require('c-ui');
    require('c-ui/assets/style.css');
    require('./style.less');
    $ = require('jquery');
    dal = require('../../dal/main');
    util = require('../../core/util');
}

var textBoxes = [];
var sendReportEmail = React.createClass({

    getInitialState: function() {
        return {
            ToUser: '', Title: '推送报告', //默认
            Content: this.props.Content,
            ContentData: this.props.ContentData,
            Remark: '',
            Status: 'edit', //状态：edit canSubmit submitting submitted
            submitText: '发送'
        }
    },
    componentDidMount: function() {
        $('.cui-textBoxContainer').map(function(i, v) {
            var instance = new cui.TextBox($(v));
            textBoxes.push(instance);
        }, this);

        var self = this;
        setInterval(function() {
            if (textBoxes[0].getValidate() && textBoxes[1].getValidate()) {
                self.setState({Status: 'canSubmit', submitText: '发送'});
            }
        }, 1000);

        $('#contentBox').find('a').attr('href', 'javascript:void(0)'); //将a标签设置为点击不跳转
    },
    handleInput: function() {
        if (textBoxes[0].getValidate() && textBoxes[1].getValidate()) {
            this.setState({Status: 'canSubmit', submitText: '发送'});
        } else {
            this.setState({Status: 'edit'});
        }
    },
    handleSubmit: function() {
        if (this.state.Status == 'canSubmit') {
            this.setState({submitText: '发送中'});
            var self = this;

            if (!this.props.Content) {
                cui.popTips.errorTip('邮件内容不能为空！');
                return;
            }
            var remark = this.refs.Remark.value.replace(/[\r\n]/g, "<br>")
            dal.report.SendReportEmail({
                Content: decodeURIComponent(this.props.ContentData),
                CustomerAdminId: window.userContext.customerAdminId,
                CustomerId: window.userContext.customerId,
                Remark: remark || '',
                Title: decodeURIComponent(this.refs.Title.value),
                ToUser: decodeURIComponent(this.refs.ToUser.value)
            }).then(function(res) {
                if (res.status) {
                    self.setState({Status: 'submitted', submitText: '已发送'});
                    cui.popTips.successTip('邮件发送成功');
                } else {
                    self.setState({Status: 'canSubmit', submitText: '发送'});
                    var errorMsg = res.message || '后台处理异常';
                    cui.popTips.errorTip(errorMsg);
                }
            }, function(err) {
                self.setState({Status: 'edit', submitText: '发送'});
                var errorMsg = err.message || '后台处理异常';
                cui.popTips.errorTip(errorMsg);
            });
        }
    },
    render: template

});

module.exports = sendReportEmail;
