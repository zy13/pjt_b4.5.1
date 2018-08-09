/*
 * @Author: liexin.chen
 * @Date:   2016-06-27 14:30:09
 * @Last Modified by:   sihuicao
 * @Last Modified time: 2016-08-24 16:48:49
 */

'use strict';

require('./style.less');

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
var List = require('../../components/list/index');
var Totop = require('../../components/totop/index');

// dal 引用
var dal = require('../../dal/main');
var sidebar;

ReactDom.render(<Footer />, document.getElementById('footer'));
ReactDom.render(<Totop />, document.getElementById('totop'));


$(function() {

    var keyword = util.urlContext().key || '';

    context.get().then(function() {
        dal.accessmentMobile.GetProjectList({
            CustomerAdminId: window.userContext.customerAdminId,
            CustomerId: window.userContext.customerId,
            KeyWord: decodeURIComponent(keyword),
            PageIndex: 0,
            PageSize: 10
        }).then(function(res) {
            var _data = res.data;

            var listType = '';
            if (_data.TotalItemCount > 0) {
                listType = 'list';
            } else {
                if (keyword) {
                    listType = 'error-nodata';
                } else {
                    listType = 'error';
                }
            };

            sidebar = ReactDom.render(<Sidebar
                type="left"
                logo={window.userContext.companyLogo}
            />, document.getElementById('sidebar'));
            ReactDom.render(<Header
                title=""
                type="2"
                titleType="1"
                logo={window.userContext.companyLogo}
                showSidebar={sidebar.open}
            />, document.getElementById('header'));
            ReactDom.render(<Searchbar
                keyword={keyword}
            />, document.getElementById('searchbar'));
            ReactDom.render(<List
                domain={window.userContext.domain}
                type={listType}
                list={_data.Data.List}
                totalCount={_data.TotalItemCount}
                remainsCount={_data.SurplusItemCount}
                pageIndex={_data.PageIndex}
                accountRight={_data.AccountRight}
                reportRight={_data.ReportRight}
                createRight={_data.CreateRight}
            />, document.getElementById('list'));
        });


    });

});
