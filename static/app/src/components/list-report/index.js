/*
 * @Author: liexin.chen
 * @Date:   2016-07-05 10:38:54
 * @Last Modified by:   sihuicao
 * @Last Modified time: 2016-09-02 22:59:28
 */

'use strict';

var cui, $, dal, util;

var React = require('react');
var ReactUpdata = require('react-addons-update');
var template = require('./template.jsx');

// node环境下不引用
if (process.env.BROWSER) {
    cui = require('c-ui');
    require('c-ui/assets/style.css');
    require('./style.less');

    $ = require('jquery');
    dal = require('../../dal/main');
    util = require('../../core/util');
}


var reportList = React.createClass({
    getDefaultProps: function() {
        return {

        };
    },
    getInitialState: function() {
        /**
         * @param {boolean} [isSelectAll] [全选状态]
         * @param {array} [selectItem] [记录每个子项的选择状态 且异步加载后需要压入]
         */
        var data = this.props.data;
        var selectItem = {
            length: 0
        };
        data.List.map(function(val, key) {
            selectItem[key] = false;
            selectItem.length++;
        });
        return {
            loadingType: 0, //0正常情况 1加载中 2加载失败请重试
            data: data,
            isSelectAll: false,
            selectItem: selectItem
        };

    },

    render: template,
    handleSelectAll: function(event) {

        /**
         * 全选事件
         * 注意 state.selectItem 不是数组
         */
        /*this.state.selectItem = this.state.selectItem.map(function(val, key) {
            return event.target.checked;
        });*/
        for (var i = 0; i < this.state.selectItem.length; i++) {
            this.state.selectItem[i] = event.target.checked;
        };
        this.setState({
            isSelectAll: event.target.checked
        });

    },
    handleSendReportEmail:function(){
        var selectedIdsArr=[];
        for (var i = 0; i < this.state.selectItem.length; i++) {
            if(this.state.selectItem[i]===true){
                var id=this.state.data.List[i].UserExamId;
                if(id){
                    selectedIdsArr.push(id);
                }
            }
        };
        var ids='';
        var len=selectedIdsArr.length;
        if(len==0){
            return;
        }else if(len>100){
            return cui.popTips.warnTip('单次分享不能超过100个帐号，你已选中超过100个帐号！');
        }else if(len==1){
            ids=selectedIdsArr[0];
        }else {
            ids=selectedIdsArr.join(',');
        }

        window.location.href='../sendReportByEmail?ids='+ids;
    },
    handleLoad: function() {
        /**
         * 加载中
         */
        this.setState({
            loadingType: 1
        });

        /**
         * 加载数据
         */
        var self = this;
        var data = self.state.data;
        var selectItem = self.state.selectItem;
        var keyword = util.urlContext().key || '';
        var ProjectId = location.pathname.match(/items\/(\d+)/)[1];

        dal.report.QueryResults({
            CustomerId: window.userContext.customerId,
            KeyWord: decodeURIComponent(keyword),
            PageIndex: data.PageIndex++,
            PageSize: 10,
            ProjectId: ProjectId
        }).then(function(res) {
            if (!res.status) {
                self.setState({
                    loadingType: 2
                });
                return false;
            };
            var newData = ReactUpdata(data, {
                PageIndex:{
                    $set:data.PageIndex
                },
                SurplusItemCount:{
                    $set:res.data.SurplusItemCount
                },
                List: {
                    $push: res.data.List
                }
            });
            res.data.List.forEach(function(val, index, array) {
                selectItem[index + selectItem.length] = false;
            });
            selectItem.length += res.data.List.length;
            self.state.loadingType = 0;
            self.setState({
                data: newData,
                isSelectAll: false,
                selectItem: selectItem
            });
        });

    },
    callbackSelect: function(opt) {

        /**
         * 用于接收子组件反向传值
         * 使用 react-addons-update 合并 state.selectItem
         */
        var newState = ReactUpdata(this.state, {
            selectItem: {
                $merge: opt
            }
        });
        // 重置全选状态
        newState.isSelectAll = JSON.stringify(newState.selectItem).indexOf('false') >= 0 ? false : true;
        // 通知更新
        this.setState(newState);

    }

});

module.exports = reportList;
