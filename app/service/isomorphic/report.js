/*
 * @Author: liexin.chen
 * @Date:   2016-07-19 10:10:04
 * @Last Modified by:   sihuicao
 * @Last Modified time: 2016-08-25 10:28:28
 */

'use strict';

var React = require('react');
var ReactDomServer = require('react-dom/server');
var logger = require('../../core/logger');
var consoler = require('consoler');
require('node-jsx').install({
    extension: '.jsx'
});

var report = require('../../../static/app/src/components/report/index');

module.exports = function(opts) {
    try {
        var reportFactory = React.createFactory(report);

        var componentReport = reportFactory(opts);

        return ReactDomServer.renderToString(componentReport);
    } catch (e) {
        logger.error('isomorphic error, component is located in [/static/app/src/components/list-report/index]\r\n');
        consoler.error('Error:not valid component');

        return;
    }
}
