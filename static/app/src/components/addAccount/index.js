/*
 * @Author: sihuicao
 * @Date:   2016-08-09 17:47:41
 * @Last Modified by:   zyuan
 * @Last Modified time: 2017-04-07 11:37:44
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
    var cookie = require('cookie_js');
}


var addAccount = React.createClass({
    getInitialState: function() {
        return {
            fields: this.props.data,
            gender: '',
            add: true
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
            if (!window.userContext || !this.props.projectId || !this.props.subProjectId) {
                window.location.reload();
                return;
            }
            if (self.state.add) {
                self.setState({
                    add: !self.state.add
                });
                var data = {
                    Creater: window.userContext.account,
                    CustomerId: window.userContext.customerId,
                    ProjectId: self.props.projectId || '',
                    SubProjectId: self.props.subProjectId || '',
                    Account: self.refs.Account.value,
                    Password: self.refs.Password.value,
                    Name: self.refs.Name.value
                };

                self.state.fields.forEach(function(v, i) {
                    var excludeArr = ['Account', 'Password', 'Name'];
                    if (excludeArr.indexOf(v.FieldKey) == -1 && v.FieldName != '性别') {
                        if(v.FieldType=='select'){
                            var firo = 'FirstOption_'+v.FieldKey

                            if(self.refs[v.FieldKey].value=='--请选择--'){
                                if(self.refs[firo].textContent!='--请选择--'){
                                    v.FieldSelectResult.split(',').map(function(va,i){
                                        if(self.refs[firo].textContent==va.split('$$')[1]){
                                            data[v.FieldKey] = va.split('$$')[0];
                                        }
                                    });
                                }else{
                                    data[v.FieldKey] = null;
                                }
                            }else{
                                v.FieldSelectResult.split(',').map(function(va,i){
                                    if(self.refs[v.FieldKey].value==va.split('$$')[1]){
                                        data[v.FieldKey] = va.split('$$')[0];
                                    }
                                });
                            }
                        }else{
                            if(v.FieldKey=='Birthday'){
                                data[v.FieldKey] = self.refs[v.FieldKey].innerText=='--请选择--'?null:self.refs[v.FieldKey].innerText
                            }else{
                                data[v.FieldKey] = self.refs[v.FieldKey].value;
                            }
                        }
                    }
                    if (v.FieldName == '性别') {
                        data[v.FieldKey] = self.refs.Gender.value ? self.refs.Gender.value : null;
                    }
                })

                dal.account.addAccount(data).then(function(res) {
                    if (res.status) {
                        cui.popTips.successTip('添加成功');
                        setTimeout(function() {
                            location.href = "/accountCenter/index/" + self.props.projectId + '/' + self.props.subProjectId;
                        }, 1500);
                    } else {
                        self.setState({
                            add: !self.state.add
                        });
                        cui.popTips.warnTip(res.message);
                    }
                });
            }

        }
    },
    handleRadio: function(event) {
        var classN = event.target.className;
        if (classN == 'sel-radio1') {
            this.setState({
                gender: 1
            }, function() {
                this.setState({
                    gender: 1
                });
            });
        } else {
            this.setState({
                gender: 2
            }, function() {
                this.setState({
                    gender: 2
                });
            })
        }
    },
    handleSelect: function(event){
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
