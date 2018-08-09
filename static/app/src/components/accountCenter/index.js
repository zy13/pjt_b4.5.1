/*
* @Author: sihuicao
* @Date:   2016-08-04 16:39:16
* @Last Modified by:   sihuicao
* @Last Modified time: 2016-08-24 09:53:44
*/

'use strict';
var cui;
var $;

var React = require('react');
var ReactUpdata = require('react-addons-update');
var template = require('./template.jsx');


// node环境下不引用
if (process.env.BROWSER) {
    cui = require('c-ui');
    require('c-ui/assets/style.css');
    require('./style.less');

    $ = require('jquery');
    var dal = require('../../dal/main');
    var util = require('../../core/util');
    var store = require('store2');
}


var account = React.createClass({
    getInitialState:function(){
        this.props.list.Data.List = this.initialSelect(0,this.props.list.Data.List);
        return {
            loadingType:0,
            pageIndex:1,
            data:this.props.list.Data,
            filterclass:false,
            status:[0,0,0],
            type:''
        }
    },
    // componentDidMount:function(){
        // var list = this.props.list.Data.List;
        // if(list.length>0){
        //     var data = list[0].UserSet;
        //     store.set('pjt_storageMes',data);
        // }
    // },
    render: template,
    initialSelect:function(index,list){
        list.forEach(function(v,i){
            v.index = i+index;
            v.isShow = (index==0&&i==0)?true:false;
            v.select = false;
        })
        return list;
    },
    callBackLoad:function(){             //加载更多
        var self = this;
        self.setState({
            loadingType:1
        });

        var keyword = util.urlContext().key || '';
        var projectId = location.pathname.match(/index\/(\d+)/)[1];
        var subProjectId = location.pathname.match(/index\/(\d+)\/(\d+)/)[2];
        dal.account.queryAccount({
            CustomerAdminId:window.userContext.customerAdminId,
            CustomerId: window.userContext.customerId,
            ProjectId: projectId,
            SubProjectId: subProjectId,
            ExamStatus:self.state.status[0]>0?(self.state.status[0] - 1):null,
            MailStatus:self.state.status[1]>0?(self.state.status[1]==1?2:self.state.status[1]==2?1:self.state.status[1]==3?0:null):null,
            SmsStatus:self.state.status[2]>0?(self.state.status[2]==1?2:self.state.status[2]==2?1:self.state.status[2]==3?0:null):null,
            PageIndex: self.state.pageIndex++,
            PageSize: 10,
            KeyWord: decodeURIComponent(keyword)
        }).then(function(res){
            if (!res.status) {
                self.setState({
                    loadingType: 2
                });
                return false;
            };
            var newData = ReactUpdata(self.state, {
                data: {
                    List:{
                        $push: self.initialSelect(self.state.data.List.length,res.data.Data.List)
                    },
                    PageIndex:{
                        $set: res.data.Data.PageIndex
                    },
                    SurplusItemCount:{
                        $set: res.data.Data.SurplusItemCount
                    },
                    TotalItemCount:{
                        $set: res.data.Data.TotalItemCount
                    }
                },
                loadingType:{
                    $set: 0
                }
            });
            self.setState(newData);
        }, function(err) {
            self.setState({
                loadingType: 2
            });
        });
    },
    callBackFilter:function(opt){           //筛选
        var self = this;
        this.setState({
            filterclass:!this.state.filterclass,
            type:'load'
        });


        var keyword = util.urlContext().key || '';
        var projectId = location.pathname.match(/index\/(\d+)/)[1];
        var subProjectId = location.pathname.match(/index\/(\d+)\/(\d+)/)[2];

        dal.account.queryAccount({
            CustomerAdminId:window.userContext.customerAdminId,
            CustomerId: window.userContext.customerId,
            ProjectId: projectId,
            SubProjectId: subProjectId,
            ExamStatus:this.state.status[0]>0?(this.state.status[0] - 1):null,
            MailStatus:this.state.status[1]>0?(this.state.status[1]==1?2:this.state.status[1]==2?1:this.state.status[1]==3?0:null):null,
            SmsStatus:this.state.status[2]>0?(this.state.status[2]==1?2:this.state.status[2]==2?1:this.state.status[2]==3?0:null):null,
            PageIndex: 0,
            PageSize: 10,
            KeyWord: decodeURIComponent(keyword)
        }).then(function(res){
            if (!res.status) {
                self.setState({
                    type:'search-error'
                });
                return false;
            };

            if(res.data.Data.TotalItemCount>0){
                res.data.Data.List = self.initialSelect(0,res.data.Data.List);
                self.setState({
                    loadingType:0,
                    pageIndex:1,
                    data:res.data.Data,
                    type:''
                })

            }else{
                self.setState({
                    type:'error-nodata'
                })
            }

        }, function(err) {
            self.setState({
                type:'search-error'
            });
        })
    },
    callBackFilterSelect:function(index,level){
        this.state.status[level] = index;
        this.setState({
            status:this.state.status
        })
    },
    callBackFilterActive:function(){
        this.setState({
            filterclass:!this.state.filterclass
        })
    }
});

module.exports = account;
