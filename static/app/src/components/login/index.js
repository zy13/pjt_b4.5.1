/*
 * @Author: liexin.chen
 * @Date:   2016-07-05 10:38:54
* @Last modified by:   Jet.Chan
* @Last modified time: 2016-09-09T15:28:22+08:00
 */

'use strict';

var cui;
var $;

var React = require('react');
var template = require('./template.jsx');

var util = require('../../core/util');

var CryptoJS = require('crypto-js')

// node环境下不引用
if (process.env.BROWSER) {
    cui = require('c-ui');
    require('c-ui/assets/style.css');
    require('./style.less');

    $ = require('jquery');
}

var dal = require('../../dal/main');

var textBoxes = [];
var login = React.createClass({
    getDefaultProps: function() {
        return {
            domain: {
                tip: '二级域名不能为空',
                plh: '请输入二级域名，如：talebase'
            },
            user: {
                tip: '帐号不能为空',
                plh: '请输入帐号'
            },
            pwd: {
                tip: '密码不能为空',
                plh: '请输入密码'
            }
        };
    },
    getInitialState: function() {
        return {isPwdShow: false, isSubmitting: false, canSub: false, start: true};
    },
    componentDidMount: function() {
        var self = this;
        $('.cui-textBoxContainer').map(function(i, v) {
            var instance = new cui.TextBox($(v));
            textBoxes.push(instance);
        }, this);

        $('html,body').addClass('ovfHiden');
        setTimeout(function() {
            $('.start-page').fadeOut(500).children().fadeOut(500,function(){ $('.start-page').remove(); });
            $('html,body').removeClass('ovfHiden');
        }, 2000);
    },
    componentWillUpdate: function(nextProps, nextState) {
        if (this.state.isPwdShow !== nextState.isPwdShow) {
            $('#btn-pwd-toggel').toggleClass('cpf-icon-ic_pwd_show', this.state.isPwdShow
                ? !1
                : !0).siblings('input').attr('type', this.state.isPwdShow
                ? 'password'
                : 'text').focus();
        };
    },
    handlePwdToggel: function() {
        this.setState({
            isPwdShow: !this.state.isPwdShow
        });
    },
    handleSub: function(event) {

        /**
         * 登录
         * 前置状态 全部输入均非空
         */
        if (this.state.canSub) {
            // 触发 登录中 状态
            this.setState({isSubmitting: true});
            // 登录
            var self = this;
            var signPassword = this.Encrypt(this.refs.password.value)

            dal.login.Login({account: this.refs.account.value, domain: this.refs.domain.value, password: signPassword}).then(function(res) {
                /*
                 * 是否有需要让 登录中 的状态明显一点而setTimeout
                 */

                if (res.status) {
                    var _data = res.data.Data;
                    // 写入登录
                    $.ajax({
                        type: 'POST',
                        url: '/session/login',
                        dataType: 'json',
                        timeout: 20000,
                        data: {
                            Account: _data.Account,
                            // CompanyLogo: 'http://' + _data.Domain + '.talebase.org/Upload/CustomerLogos/' + _data.CompanyLogo,
                            CompanyLogo: _data.CompanyLogoUrl,
                            CustomerAdminId: _data.CustomerAdminId,
                            CustomerId: _data.CustomerId,
                            Domain: _data.Domain,
                            ShortName: _data.ShortName,
                            PeriodValidity: _data.PeriodValidity,
                            TokenId: [_data.CustomerAdminId, _data.CustomerId].join('+')
                        }
                    }).done(function(data) {
                        if (data.status) {
                            location.href = decodeURIComponent('/' + _data.Domain);
                        } else {
                            textBoxes[2].setValidate(false, '网络连接失败');
                            self.setState({isSubmitting: false});
                        };
                    }).fail(function(err) {
                        switch (err.statusText) {
                            case 'timeout':
                                cui.popTips.errorTip('请求超时');
                                break;
                            default:
                                cui.popTips.errorTip('网络连接失败');
                                break;
                        };
                        self.setState({isSubmitting: false});
                    });
                } else {
                    switch (res.code) {
                        case 1:
                            textBoxes[0].setValidate(false, res.message);
                            break;
                        case 3:
                            textBoxes[1].setValidate(false, res.message);
                            textBoxes[2].setValidate(false, res.message);
                            break;
                        case 2:
                        case 4:
                        case 5:
                            textBoxes[1].setValidate(false, res.message);
                            break;
                        default:
                            break;
                    };
                    self.setState({isSubmitting: false});
                    cui.popTips.errorTip(res.message || '出错啦');
                };
            }, function(err) {
                switch (err.statusText) {
                    case 'timeout':
                        cui.popTips.errorTip('请求超时');
                        break;
                    default:
                        cui.popTips.errorTip('网络连接失败');
                        break;
                };
                self.setState({isSubmitting: false});
            });
        };
    },
    handleInput: function() {
        var canSub = true;
        $('.sub-required').each(function(index, el) {
            if ($.trim($(this).val()) === '') {
                canSub = false;
                return false;
            };
        });
        this.setState({canSub: canSub});
    },
    Encrypt (word) {
        var key = CryptoJS.enc.Utf8.parse("www.talebase.com");
        var srcs = CryptoJS.enc.Utf8.parse(word);
        var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
         return encrypted.toString();
    },
    Decrypt (word) {
        var key = CryptoJS.enc.Utf8.parse("abcdefgabcdefg12");

        var decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
        return CryptoJS.enc.Utf8.stringify(decrypt).toString();
    },
    render: template
});

module.exports = login;
