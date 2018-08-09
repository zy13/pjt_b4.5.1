/*
 * @Author: sihuicao
 * @Date:   2016-08-05 10:52:25
 * @Last Modified by:   zyuan
 * @Last Modified time: 2017-06-16 14:41:45
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
    var cookie = require('cookie_js');
    var store = require('store2');
}


var list = React.createClass({
    getInitialState: function() {
        return {
            urgentMes: false,
            examMes: false,
            sendStatus: false,
            selectAll: false,
            list: this.props.list,
            examCount: {
                email: 0,
                mobile: 0,
                total: 0
            },
            isWarnTip: false,
            warnTipContent: ''
        };
    },
    render: template,
    componentWillMount: function() {
        this.setState({
            selectAll: false
        })
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({
            sendStatus: nextProps.type == 'error-nodata' ? false : this.state.sendStatus,
            selectAll: false,
            list: nextProps.list
        })
    },
    callbackSilde: function(index) {
        this.state.list[index].isShow = !this.state.list[index].isShow;
        this.setState({
            list: this.state.list
        })
    },
    callbackSelect: function(index) {
        var verify = true;
        var sendStatus = false;
        var total = 0
        var self = this;
        if (this.props.BatchRight) {
            this.state.list.forEach(function(v, i) {
                if (i == index)
                    v.select = !v.select;
                verify *= v.select;
                if (v.select){
                    total++
                    sendStatus = true;
                }
            });
            this.setState({
                sendStatus: sendStatus,
                selectAll: verify,
                list: this.state.list,
                examCount: {
                    total: total
                }
            })
        } else {
            cui.popTips.warnTip('无发送短信、邮件权限');
        }
    },
    callbackSelectAll: function() {
        var self = this;
        var sendStatus = false;
        var total = 0
        if (this.props.BatchRight) {
            this.state.selectAll = !this.state.selectAll;
            this.state.list.forEach(function(v, i) {
                v.select = self.state.selectAll;
                if (v.select) {
                    total ++
                    sendStatus = true;
                }
            });
            this.setState({
                sendStatus: sendStatus,
                selectAll: this.state.selectAll,
                list: this.state.list,
                examCount: {
                    total: total
                }
            })
        } else {
            cui.popTips.warnTip('无发送短信、邮件权限');
        }

    },
    handleLoad: function() {
        this.setState({
            selectAll: false
        })
        this.props.callBackLoad();
    },
    callbackUrgentMes: function() {
        var self = this;
        if (this.props.BatchRight) {
            if (this.props.NoCompleteCnt && this.props.NoCompleteCnt > 0) {
                store.set('pjt_MailSms', null);
                store.set('pjt_MailSmsCount', this.props.NoCompleteCnt);
                this.setState({
                    urgentMes: !this.state.urgentMes
                })
            } else {
                cui.popTips.warnTip('不存在催办的帐号');
            }
        } else {
            cui.popTips.warnTip('无批量通知权限');
        }

    },
    callbackExamMes: function(flag) {
        var mobile = 0,
            email = 0,
            total = 0;
        var userIds = '';
        if (flag) {
            this.state.list.forEach(function(v, i) {
                if (v.select) {
                    total++;
                    userIds += v.UserId + ',';
                    var mstatus = false,
                        estatus = false;
                    v.UserSet.forEach(function(w, k) {
                        if (w.FieldKey == 'Mobile' && w.FieldResult)
                            mstatus = true;
                        if (w.FieldKey == 'Email' && w.FieldResult)
                            estatus = true;
                    })
                    if (!mstatus)
                        mobile++;
                    if (!estatus)
                        email++;
                }
            });
            store.set('pjt_MailSms', userIds);
            this.setState({
                examMes: !this.state.examMes,
                examCount: {
                    email: email,
                    mobile: mobile,
                    total: total
                }
            });
        } else {
            this.setState({
                examMes: !this.state.examMes
            })
        }
    },
    clearStatus: function() {
        this.state.list.forEach(function(v, i) {
            v.select = false;
        });
        this.setState({
            selectAll: false,
            list: this.state.list
        });
    },
    handleSingleSend: function(id) {
        store.set('pjt_MailSms', id + ',');
        location.href = "/accountCenter/sendEmailMsg/" + this.props.projectId + '/' + this.props.subProjectId;
        this.clearStatus();
    }
});

module.exports = list;
