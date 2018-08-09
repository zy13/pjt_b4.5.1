/*
 * @Author: sihuicao
 * @Date:   2016-08-10 14:00:32
 * @Last Modified by:   zyuan
 * @Last Modified time: 2017-04-17 13:44:39
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
    var dal = require('../../dal/main');
    var store = require('store2');
}


var addAccount = React.createClass({
    getInitialState: function() {
        var message = store ? store.get('pjt_editMes') || {} : {};

        return {
            message: message,
            fields: this.props.data,
            gender: message.Gender,
            edit: true
        }
    },
    render: template,
    componentDidMount: function() {
        var self = this;
        self.textBoxes = [], self.datePickers = [];

        $('.cui-textBoxContainer').map(function(i, v) {
            var instance = new cui.TextBox($(v));
            self.textBoxes.push(instance);
        }, this);

        $('.cui-datePickerContainer').map(function(i, v) {
            var instance = new cui.DatePicker($(v));
            self.datePickers.push(instance);
        }, this);

        this.state.fields.map(function(v, i) {
            if (v.FieldKey == 'Gender' && v.FieldResult != null) {
                this.setState({
                    gender: v.FieldResult
                })
            }
        });
    },
    add: function() {
        var self = this;
        var validates = [];
        self.textBoxes.forEach(function(v) {
            validates.push(v.getValidate());
        });
        var validate = true;

        validates.map(function(v, i) {
            if (!v) {
                self.textBoxes[i].$el.find('input').focus().blur();
            }
            validate = validate && v;
        }, this);

        if (validate) {
            if (!window.userContext) {
                window.location.reload();
                return;
            }
            if (self.state.edit) {
                self.setState({
                    edit: !self.state.edit
                })

                var data = {
                    Modifier: window.userContext.account,
                    CustomerId: window.userContext.customerId,
                    ProjectId: self.props.projectId,
                    UserId: self.state.message.UserId,
                    Account: self.state.message.Account,
                    Password: self.refs.Password.value,
                    Name: self.refs.Name.value,
                    Gender: self.state.gender
                };

                self.state.fields.forEach(function(v, i) {
                    var excludeArr = ['Account', 'Password', 'Name'];
                    if (excludeArr.indexOf(v.FieldKey) == -1 && v.FieldName != '性别') {
                        if (v.FieldType == 'select') {
                            var firo = 'FirstOption_' + v.FieldKey;

                            if (self.refs[v.FieldKey].value == '--请选择--') {
                                if (self.refs[firo].textContent != '--请选择--') {
                                    v.FieldSelectResult.split(',').map(function(va, i) {
                                        if (self.refs[firo].textContent == va.split('$$')[1]) {
                                            data[v.FieldKey] = va.split('$$')[0];
                                        }
                                    });
                                } else {
                                    data[v.FieldKey] = null;
                                }
                            } else {
                                v.FieldSelectResult.split(',').map(function(va, i) {
                                    var selectValue = va.split('$$')[1].replace('&amp;','&');

                                    if (self.refs[v.FieldKey].value == selectValue) {
                                        data[v.FieldKey] = va.split('$$')[0];
                                    }
                                });
                            }
                        } else {
                            if (v.FieldKey == 'Birthday') {
                                data[v.FieldKey] = self.refs[v.FieldKey].innerText == '--请选择--' ? null : self.refs[v.FieldKey].innerText
                            } else {
                                data[v.FieldKey] = self.refs[v.FieldKey].value;
                            }
                        }
                    }
                })

                dal.account.editAccount(data).then(function(res) {
                    if (res.status) {
                        cui.popTips.successTip('修改成功');
                        setTimeout(function() {
                            location.href = "/accountCenter/index/" + self.props.projectId + '/' + self.props.subProjectId;
                        }, 1500);
                    } else {
                        self.setState({
                            edit: !self.state.edit
                        })
                        cui.popTips.warnTip(res.message);
                    }
                })
            }
        }
    },
    handleRadio: function(event) {
        var self = this,
            genderValue = $(event.target).val();

        self.setState({
            gender: genderValue
        }, function() {
            self.setState({
                gender: genderValue
            })
        })
    },
    handleSelect: function(event) {
        var $this = $(event.currentTarget);

        if ($this.val() != '--请选择--') {
            $this.siblings('span').addClass('sel-value');
        } else {
            $this.siblings('span').removeClass('sel-value');
        }
        $this.siblings('span').text($this.val());
    }
});

module.exports = addAccount;
