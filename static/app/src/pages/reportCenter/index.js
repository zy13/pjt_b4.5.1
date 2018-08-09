/*
 * @Author: liexin.chen
 * @Date:   2016-06-27 14:30:09
 * @Last Modified by:   zyuan
 * @Last Modified time: 2016-08-12 20:54:14
 */

'use strict';

require('./index.less');

// npm 引用
var $ = require('jquery');
var React = require('react');
var ReactDom = require('react-dom');

// core 引用
var printer = require('../../core/printer');
var context = require('../../core/context');
var util = require('../../core/util');

// comp 引用
var Header = require('../../components/header/index');
var Footer = require('../../components/footer/index');
var Sidebar = require('../../components/sidebar/index');
var Searchbar = require('../../components/searchbar/index');
var Totop = require('../../components/totop/index');
var ListReport = require('../../components/list-report/index');

// dal 引用
var dal = require('../../dal/main');
var sidebar;

ReactDom.render(<Header title="查看结果" type="1" />, document.getElementById('header'));
ReactDom.render(<Footer />, document.getElementById('footer'));
ReactDom.render(<Totop />, document.getElementById('totop'));


$(function() {
    var keyword = util.urlContext().key || '';
    var ProjectId = location.pathname.match(/items\/(\d+)/)[1];
    context.get().then(function() {
        dal.report.QueryResults({
            CustomerId: window.userContext.customerId,
            KeyWord: decodeURIComponent(keyword),
            PageIndex: 0,
            PageSize: 10,
            ProjectId: ProjectId
        }).then(function(res) {
            sidebar = ReactDom.render(<Sidebar
                type="left"
                logo={window.userContext.companyLogo}
            />, document.getElementById('sidebar'));
            ReactDom.render(<Searchbar
                keyword={keyword}
            />, document.getElementById('searchbar'));
            ReactDom.render(<ListReport
                domain={window.userContext.domain}
                data={res.data}
            />, document.getElementById('report'));
        });
    });

});
