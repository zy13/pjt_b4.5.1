/*
* @Author: sihuicao
* @Date:   2016-08-09 17:46:23
* @Last Modified by:   sihuicao
* @Last Modified time: 2016-08-22 14:52:35
*/

'use strict';
var React = require('react');
var ReactDomServer = require('react-dom/server');
var logger = require('../../core/logger');
var consoler = require('consoler');

require('node-jsx').install({
    extension: '.jsx'
});

var AddAccount = require('../../../static/app/src/components/addAccount/index');

module.exports = function(opts) {
    try {
        var accountFactory = React.createFactory(AddAccount);
        var componentAccount = accountFactory(opts);
        return ReactDomServer.renderToString(componentAccount);
    } catch (e) {
        logger.error('isomorphic error, component is located in [/static/app/src/components/addAccount/index1]\r\n');
        consoler.error('Error:not valid component');

        return;
    }

}
