/*
 * @Author: zyuan
 * @Date:   2016-08-03 16:27:37
 * @Last Modified by:   zyuan
 * @Last Modified time: 2017-04-13 16:53:36
 */

'use strict';

var React = require('react');
var template = require('./template.jsx');

var cui, $, dal, util, store;
//node环境下不引用
if (process.env.BROWSER) {
    cui = require('c-ui');
    require('c-ui/assets/style.css');
    require('./style.less');
    $ = require('jquery');
    dal = require('../../dal/main');
    util = require('../../core/util');
    store = require('store2');
}

var textBoxes = [],
    checkBoxes = [];
var sendEmailMsg = React.createClass({
    getInitialState: function() {
        return {
            isEmailChecked: false,
            isMsgChecked: false,
            openModal: false,
            canSub: false,
            btnClass: false,
            targetHeight: $('#header').height() + $('#content').height(),
            winHeight: $(window).height(),
            fixBottom: false,
            errorMessage: '',
            actIndex: '0',
            userIds: '0',
            accountLen: '0',
            isIphone: false,
            isWarnTip: false,
            isSuccess: false,
            isError: false,
            warnTipContent: '',
            emailData: {
                templateName: this.props.PushTemplate.MailTemplate[0].TemplateName,
                mailTemplateId: this.props.PushTemplate.MailTemplate[0].MailTemplateId,
                mailSubject: this.props.PushTemplate.MailTemplate[0].MailSubject,
                mailBody: this.props.PushTemplate.MailTemplate[0].MailBody
            },
            smsData: {
                templateName: this.props.PushTemplate.SmsTemplate[0].TemplateName,
                smsTemplateId: this.props.PushTemplate.SmsTemplate[0].SmsTemplateId,
                templateContent: this.props.PushTemplate.SmsTemplate[0].TemplateContent
            }
        };
    },
    componentDidMount: function() {
        var self = this;
        var arrUserIds, userIds = store.get('pjt_MailSms') ? store.get('pjt_MailSms') : '';
        var pjt_MailSmsCount = store.get('pjt_MailSmsCount') ? store.get('pjt_MailSmsCount') : '';
        var ua = navigator.userAgent.toLowerCase();
        var isMobileIphone = ua.match(/iphone/i) == 'iphone' ? true : false;
        var isUc = ua.match(/uc/i) == 'ucweb' ? true : false;

        /*iphone mobile for uc*/
        if (isMobileIphone) {
            var self = this;
            $('.itemTitle').focus(function() {
                self.setState({
                    isIphone: true
                });
            });
        }

        if (userIds) {
            arrUserIds = userIds.split(',');
            this.setState({
                accountLen: arrUserIds.length - 1
            }, function() {
                this.setState({
                    accountLen: arrUserIds.length - 1
                })
            });
        } else {
            this.setState({
                accountLen: pjt_MailSmsCount
            }, function() {
                this.setState({
                    accountLen: pjt_MailSmsCount
                })
            });
        }

        $('.cui-textBoxContainer').map(function(i, v) {
            var instance = new cui.TextBox($(v));
            textBoxes.push(instance);
        }, this);
        $('.cui-checkboxContainer').map(function(i, v) {
            var instance = new cui.Checkbox($(v));
            checkBoxes.push(instance);
        }, this);
    },
    handleEmailChecked: function() {
        var self = this;
        if (!this.state.isEmailChecked) {
            this.setState({
                isEmailChecked: true
            }, function() {
                $(window).on('scroll', function(event) {
                    var _top = $(this).scrollTop();
                    if (_top >= (self.refs.btn_event.offsetTop - (parseInt(self.state.winHeight) - (self.refs.btn_event.clientHeight + 12)))) {
                        self.setState({
                            btnClass: false
                        });
                        $(window).off('scroll');
                    }
                });
                if ((45 + this.refs.pjt_send.clientHeight) > (parseInt(this.state.winHeight) - (this.refs.btn_event.clientHeight + 12))) {
                    this.setState({
                        btnClass: true
                    });
                }
            });
        } else {
            this.setState({
                btnClass: false,
                isEmailChecked: false
            });
        }
        this.setState({
            canSub: !this.state.canSub
        }, function() {
            if (this.state.isMsgChecked) {
                this.setState({
                    canSub: true
                });
            }
        });
    },
    handleMsgChecked: function() {
        if (!this.state.isMsgChecked) {
            this.setState({
                isMsgChecked: true
            }, function() {
                var self = this;

                $(window).on('scroll', function(event) {
                    var _top = $(this).scrollTop();
                    if (_top >= (self.refs.btn_event.offsetTop - (parseInt(self.state.winHeight) - (self.refs.btn_event.clientHeight + 12)))) {
                        self.setState({
                            btnClass: false
                        });
                        $(window).off('scroll');
                    }
                });
                if ((45 + this.refs.pjt_send.clientHeight) > (parseInt(this.state.winHeight) - (this.refs.btn_event.clientHeight + 12))) {
                    this.setState({
                        btnClass: true
                    });
                }

                if (!this.state.canSub) {
                    this.setState({
                        canSub: true
                    })
                }
                self.getSmsLeftMessage();

            });
        } else {
            this.setState({
                btnClass: false,
                isMsgChecked: false
            });
            if (!this.state.isEmailChecked) {
                this.setState({
                    canSub: false
                });
            }
        }
    },
    handleSubmit: function() {
        var self = this;
        var strEnd = '';
        var newUserId = '';
        var userIds = '';
        var urlStr = location.pathname;
        var projectId = urlStr.match(/sendEmailMsg\/(\d+)/)[1];

        if (store.get('pjt_MailSms')) {
            userIds = store.get('pjt_MailSms') ? store.get('pjt_MailSms') : '';
            strEnd = userIds.charAt(userIds.length - 1);
            if (strEnd == ',') {
                for (var i = 0; i < userIds.length - 1; i++) {
                    newUserId += userIds[i];
                }
            }
        }

        if (this.state.canSub) {
            dal.account.sendEMailAndSms({
                CustomerId: window.userContext.customerId,
                CustomerAdminId: window.userContext.customerAdminId,
                SmsTemplateId: this.state.isMsgChecked ? this.state.smsData.smsTemplateId : '',
                MailTemplateId: this.state.canSub && this.state.isEmailChecked ? this.state.emailData.mailTemplateId : '',
                ProjectId: this.props.SubProjectId,
                UserIds: newUserId,
                MailSubject: this.state.emailData.mailSubject
            }).then(function(res) {
                if (res.status) {
                    self.setState({
                        openModal: false
                    });
                    if (res.data.ErrorCode == 2) {
                        self.setState({
                            openModal: true,
                            errorMessage: res.data.ErrorMessage
                        });
                    } else {
                        cui.popTips.successTip('发送成功');
                        setTimeout(function() {
                            location.href = '/accountCenter/index/' + self.props.ProjectId + '/' + self.props.SubProjectId;
                        }, 2000)
                    }

                } else {
                    var error = res.message || '后台处理异常';
                    self.setState({
                        openModal: true,
                        errorMessage: error
                    });
                }
            }, function(err) {
                var errorMsg = err.message || '后台处理异常';
                cui.popTips.errorTip(errorMsg);
            });
        }
    },
    handleInput: function(event) {
        var self = this,
            $this = $(event.currentTarget);

        if (this.state.isEmailChecked && $this.val()) {
            this.setState({
                canSub: true,
                emailData: {
                    templateName: self.state.emailData.templateName,
                    mailTemplateId: self.state.emailData.mailTemplateId,
                    mailSubject: $this.val(),
                    mailBody: self.state.emailData.mailBody
                }
            });
        }
    },
    handleModal: function() {
        this.setState({
            openModal: false
        });
    },
    handleCancle: function() {
        location.href = '/accountCenter/index/' + this.props.ProjectId + '/' + this.props.SubProjectId;
    },
    handleSelect: function(event) {
        var self = this,
            $this = $(event.currentTarget);

        if ($this.is('.emailt')) {
            self.setState({
                emailData: {
                    templateName: $this.val(),
                    mailTemplateId: $this.find('option:selected').data('id'),
                    mailSubject: $this.find('option:selected').data('subject'),
                    mailBody: $this.find('option:selected').data('body')
                }
            });
        }

        if ($this.is('.smst')) {
            self.setState({
                smsData: {
                    templateName: $this.val(),
                    smsTemplateId: $this.find('option:selected').data('id'),
                    templateContent: $this.find('option:selected').data('content')
                }
            },function(){
                self.getSmsLeftMessage();
            });

        }
    },
    getSmsLeftMessage: function() {
        var self = this,
            strEnd = '',
            newUserId = '',
            userIds = '';

        if (store.get('pjt_MailSms')) {
            userIds = store.get('pjt_MailSms') ? store.get('pjt_MailSms') : '';
            strEnd = userIds.charAt(userIds.length - 1);

            if (strEnd == ',') {
                for (var i = 0; i < userIds.length - 1; i++) {
                    newUserId += userIds[i];
                }
            }
        }

        dal.account.getSMSInformation({
            CustomerId: window.userContext.customerId,
            SmsTemplateId: self.state.smsData.smsTemplateId,
            ProjectId: self.props.SubProjectId,
            UserIds: newUserId
        }).then(function(res) {
            if (res.status) {
                $('.dec-detail').text(res.data.Message);
            } else {
                return;
            }
        });
    },
    render: template
});

module.exports = sendEmailMsg;
