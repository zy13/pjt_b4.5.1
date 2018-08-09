/*
 * @Author: yongquan.wu
 * @Date:   2016-07-25 11:12:15
 * @Last Modified by:   sihuicao
 * @Last Modified time: 2016-08-22 11:37:44
 */

'use strict';
var React = require('react');
var template = require('./template.jsx');

//node环境下不引用
if(process.env.BROWSER){
    require('c-ui/assets/style.css');
    require('./style.less');
}



var personalInfo = React.createClass({

    getInitialState:function(){
        // console.log(this.props);
        return {}
    },
    render:template

});

module.exports = personalInfo;
