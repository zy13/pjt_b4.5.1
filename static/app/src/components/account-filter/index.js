/*
* @Author: sihuicao
* @Date:   2016-08-05 17:32:21
* @Last Modified by:   sihuicao
* @Last Modified time: 2016-08-18 14:28:30
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


var filter = React.createClass({
    render: template,
    filterClick:function(){
        this.props.callBackFilterActive();
    },
    handleClick:function(e){
        var index = parseInt($(e.target).index()) - 1;
        var level = $(e.target).parent().index();
        this.props.callBackFilterSelect(index,level);
    },
    search:function(){
        this.props.callBackFilter();
    }

});

module.exports = filter;
