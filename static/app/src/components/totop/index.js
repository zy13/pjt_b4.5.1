/*
 * @Author: liexin.chen
 * @Date:   2016-07-08 17:32:27
 * @Last Modified by:   liexin.chen
 * @Last Modified time: 2016-07-12 16:57:39
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
}


var gotoTop = React.createClass({
    componentDidMount: function() {
        var _this = this;
        $(window).scroll(function(event) {
            var _top = $(this).scrollTop();
            $(_this.refs.totop).toggleClass('totop-show', _top > 50 ? !0 : !1);
        });
    },
    render: template,
    gototop: function(event) {
        $('html, body').animate({
            scrollTop: 0
        })
    }
});

module.exports = gotoTop;