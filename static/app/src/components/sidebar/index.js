/*
 * @Author: dser.wei
 * @Date:   2016-07-04 11:12:15
 * @Last Modified by:   sihuicao
 * @Last Modified time: 2016-09-05 10:29:11
 */

'use strict';

var React = require('react');
var template = require('./template.jsx');

var cui = require('c-ui');
require('c-ui/assets/style.css');
require('./style.less');

var $ = require('jquery');
var className = require('classnames');
var printer = require('../../core/printer');

var dal = require('../../dal/main');
var defaultLogo = process.env.BROWSER ? AppConfig.static.staticDomain + ':' + (AppConfig.static.staticPort ? '3000' : '') + '/img/logo.png' : global.appConfig.static.staticDomain + ':' + (global.appConfig.static.staticPort ? '3000' : '') + '/img/logo.png';

var sidebar = React.createClass({
    getInitialState: function() {
        this.bodyClass = this.props.type == 'left' ? 'pjt-sidebar left' : 'pjt-sidebar right';

        return {
            bodyClass: this.bodyClass,
            logo:this.props.logo
        };
    },
    render: template,
    componentDidMount: function() {
        // console.log(this.refs['short-name']);
        var self = this;
        this.refs['short-name'].innerHTML = window.userContext.shortName;
        var day = new Date(Number(window.userContext.periodValidity));
        this.refs['Period-validity'].innerHTML = [day.getFullYear(), day.getMonth() + 1, day.getDate()].join('-');

        if(this.state.logo){
            var img = new Image();
            img.onerror = function() {
                self.setState({
                    logo: defaultLogo
                });
            };
            img.src = this.state.logo;
        }
    },
    open: function() {
        this.refs.sidebarBlock.open();

        $(this.refs.sidebar).parents('body').css({
            'position': 'fixed',
            'width': '100%',
            'height': '100%',
            'overflow-y': 'hidden'
        });

        var bodyClass = this.props.type == 'left' ? className(['pjt-sidebar', 'slideLeft']) : className(['pjt-sidebar', 'slideRight']);

        this.setState({
            bodyClass: bodyClass
        });
    },
    close: function() {
        this.refs.sidebarBlock.close();

        $(this.refs.sidebar).parents('body').css({
            'position': 'static',
            'height': 'auto',
            'overflow-y': 'auto'
        });

        this.setState({
            bodyClass: this.bodyClass
        });
    },
    touchStart: function(e) {
        var self = this;
        self.startX = e.touches[0].pageX;
        self.startY = e.touches[0].pageY;
    },
    touchMove: function(e) {
        var self = this;
        self.endX = e.touches[0].pageX;
        self.endY = e.touches[0].pageY;
    },
    touchEnd: function(e) {
        var self = this;

        if (Math.abs(self.endY - self.startY) < 10 && self.endX < self.startX && this.props.type == 'left') {
            self.close();
        }

        if (Math.abs(self.endY - self.startY) < 10 && self.endX > self.startX && this.props.type == 'right') {
            self.close();
        }
    },
    logout: function() {
        var self = this;
        self.close();
        window.setTimeout(function() {
            self.refs.logoutMsg.callback = function() {
                // 登出
                // 清除session
                $.ajax({
                    type: 'POST',
                    url: '/session/logout',
                    dataType: 'json',
                    data: {
                        TokenId: window.userContext.tokenId
                    }
                }).done(function(data) {
                    //console.log(data);
                    location.href = '/user/login';
                });
            };
            self.refs.logoutMsg.open();
        }, 300);
    }
});

module.exports = sidebar;
