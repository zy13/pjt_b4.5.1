/*
* @Author: sihuicao
* @Date:   2016-08-04 16:40:14
* @Last modified by:   Jet.Chan
* @Last modified time: 2016-09-07T14:58:31+08:00
*/

'use strict';

var React = require('react');
var ReactDomServer = require('react-dom/server');
var logger = require('../../core/logger');
var consoler = require('consoler');

require('node-jsx').install({extension: '.jsx'});

var accountCenter = require('../../../static/app/src/components/accountCenter/index');

module.exports = function(opts) {
    try {
        var accountFactory = React.createFactory(accountCenter);
        var componentAccount = accountFactory(opts);
        return ReactDomServer.renderToString(componentAccount);
    } catch (e) {
        logger.error('isomorphic error, component is located in [/static/app/src/components/accountCenter/index]\r\n' + e.stack);
        consoler.error('Error:not valid component');
        return;
    }
}
