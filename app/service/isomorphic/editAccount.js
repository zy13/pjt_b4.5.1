/*
* @Author: sihuicao
* @Date:   2016-08-10 14:02:05
* @Last Modified by:   sihuicao
* @Last Modified time: 2016-08-23 15:14:53
*/

'use strict';
var React = require('react');
var ReactDomServer = require('react-dom/server');
var logger = require('../../core/logger');
var consoler = require('consoler');

require('node-jsx').install({
    extension: '.jsx'
});

var editAccount = require('../../../static/app/src/components/editAccount/index');

module.exports = function(opts) {
    try {
        var accountFactory = React.createFactory(editAccount);

        var componentAccount = accountFactory(opts);

        return ReactDomServer.renderToString(componentAccount);
    } catch (e) {
        console.log(e);
        console.log(e.stack);
        logger.error('isomorphic error, component is located in [/static/app/src/components/editAccount/index]\r\n');
        consoler.error('Error:not valid component');

        return;
    }
}
