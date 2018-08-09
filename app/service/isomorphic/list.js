/*
* @Author: dser.wei
* @Date:   2016-07-12 16:49:54
* @Last Modified by:   sihuicao
* @Last Modified time: 2016-08-25 10:28:30
*/

'use strict';

var React = require('react');
var ReactDomServer = require('react-dom/server');

require('node-jsx').install({ extension: '.jsx' });

var List = require('../../../static/app/src/components/list/index');
var logger = require('../../core/logger');
var consoler = require('consoler');
module.exports = function(opts) {

    try {
        var listFactory = React.createFactory(List);

        var list = listFactory(opts);

        return ReactDomServer.renderToString(list);
    } catch(e) {
        logger.error('isomorphic error, component is located in [/static/app/src/components/list/index]\r\n');
        consoler.error('Error:not valid component');

        return;
    }
}
