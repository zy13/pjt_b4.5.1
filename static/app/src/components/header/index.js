/*
 * @Author: dser.wei
 * @Date:   2016-06-27 16:58:17
 * @Last Modified by:   sihuicao
 * @Last Modified time: 2016-08-17 22:19:14
 */

'use strict';

var cui;
var $;

var React = require('react');
var template = require('./template.jsx');

// node环境下不引用
if (process.env.BROWSER) {
    cui = require('c-ui');
    // require('c-ui/assets/style.css');
    require('./style.less');

    $ = require('jquery');
}

var defaultLogo = process.env.BROWSER ? AppConfig.static.staticDomain + ':' + (AppConfig.static.staticPort ? '3000' : '') + '/img/logo.png' : global.appConfig.static.staticDomain + ':' + (global.appConfig.static.staticPort ? '3000' : '') + '/img/logo.png';

var header = React.createClass({
    getInitialState: function() {
        return {
            src: this.props.logo
        };
    },
    render: template,
    componentDidMount: function() {
        // 用于修复用户无上传logo
        var self = this;
        if(this.state.src){
            var img = new Image();
            img.onerror = function() {
                self.setState({
                    src: defaultLogo
                });
            };
            img.src = this.state.src;
        }
    },

    back: function() {
        var self = this;
        var urlPath = this.props.href;
        var type = this.props.type;
        if (type == 1 && urlPath) {
            location.href = urlPath;
        } else {
            history.back();
        }
    },

    shareReport: function() {
        if (this.props.shareId) {
            var shareUrl = '../sendReportByEmail?ids=' + this.props.shareId;
            window.location.href = shareUrl;
        }
    }
});

module.exports = header;
