/*
 * @Author: liexin.chen
 * @Date:   2016-07-05 10:38:54
 * @Last Modified by:   sihuicao
 * @Last Modified time: 2016-08-22 11:35:53
 */

'use strict';

var cui,
    $,
    dal, util;

var React = require('react');
var ReactUpdata = require('react-addons-update');
var template = require('./template.jsx');


// node环境下不引用
if (process.env.BROWSER) {
    $ = require('jquery');
    cui = require('c-ui');
    require('c-ui/assets/style.css');
    require('./style.less');

    dal = require('../../dal/main');
    util = require('../../core/util');
    //require('jquery.qrcode');
    require('../../core/jquery.qrcode');
}

var listProject = React.createClass({
    getInitialState: function() {
        return {
            loadingType: 0, //0正常情况 1加载中 2加载失败请重试
            bridge: false,
            projectId: '',
            pageIndex: this.props.pageIndex,
            totalCount: this.props.totalCount,
            remainsCount: this.props.remainsCount
        };
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({
            bridge: !this.state.bridge
        });
    },
    render: template,
    componentDidUpdate: function() {
        /**
         * 生成二维码
         */
        // console.log($(this.refs.qrcode));
        $(this.refs.qrcode).html('<img src="/api/accessmentMobile/CreateQRCode?CustomerId=' + window.userContext.customerId + '&ProjectId=' + this.state.projectId + '" width="228" height="228">');
        /*$(this.refs.qrcode).html('').qrcode({
            render: 'canvas',
            width: 228,
            height: 228,
            text: this.state.qrcodeUrl,
            src: window.userContext.companyLogo,
        });*/
        /**
         * qrcode canvas转换成img
         */
        //var qrcode = this.refs.qrcode.getElementsByTagName('canvas')[0].toDataURL('image/png');
        //$(this.refs.qrcode).html('<img src="' + qrcode + '">');
    },
    onChildChanged: function(opt) {
        this.setState(opt);
    },
    handlePopClose: function(opt) {
        this.setState({
            projectId: ''
        });
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
        var keyword = util.urlContext().key || '';

        dal.accessmentMobile.GetProjectList({
            CustomerAdminId: window.userContext.customerAdminId,
            CustomerId: window.userContext.customerId,
            KeyWord: decodeURIComponent(keyword),
            PageIndex: this.state.pageIndex,
            PageSize: 10
        }).then(function(res) {
            if (!res.status) {
                self.setState({
                    loadingType: 2
                });
                return false;
            };
            var newList = ReactUpdata(self.props, {
                list: {
                    $push: res.data.Data.List
                }
            });

            self.state.loadingType = 0;
            self.state.pageIndex = res.data.PageIndex;
            self.state.totalCount = res.data.TotalItemCount;
            self.state.remainsCount = res.data.SurplusItemCount;

            self.props.callbackState(newList);
        }, function(err) {
            self.setState({
                loadingType: 2
            });
        });
    },
    callbackSelect: function(opt) {
        /**
         * 用于多选反向传值
         * list-report-item -> this -> list-report
         */
        this.props.callbackSelect(opt);
    }
});

module.exports = listProject;
