/*
 * @Author: liexin.chen
 * @Date:   2016-07-05 10:38:54
 * @Last Modified by:   sihuicao
 * @Last Modified time: 2016-08-23 16:44:39
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

var listError = React.createClass({
    getDefaultProps: function() {
        return {
            type: 'error',
            typeData: {
                'error': [
                    'cpf-icon-display',
                    '没有相关项目，请前往电脑版创建'
                ],
                'error-noData': [
                    'cpf-icon-display',
                    '没有相关的帐号，请创建'
                ],
                'error-nodata': [
                    'cpf-icon-ic_preview',
                    '没有找到相关的结果。请尝试搜索其他试试。'
                ],
                'load':[
                    'cpf-icon-ic_preview',
                    '正在搜索...'
                ],
                'search-error':[
                    'cpf-icon-thin-close',
                    '网络异常，请刷新重试'
                ]
            }
        };
    },
    render: template
});

module.exports = listError;
