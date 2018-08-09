/*
 * @Author: liexin.chen
 * @Date:   2016-07-13 09:22:06
* @Last modified by:   Jet.Chan
* @Last modified time: 2016-09-07T14:58:28+08:00
 */

'use strict';

var React = require('react');
var ReactDomServer = require('react-dom/server');
var logger = require('../../core/logger');
var consoler = require('consoler');
require('node-jsx').install({extension: '.jsx'});

var reportList = require('../../../static/app/src/components/list-report/index');

module.exports = function(opts) {
    try {
        var reportListFactory = React.createFactory(reportList);

        var componentReportList = reportListFactory(opts);

        return ReactDomServer.renderToString(componentReportList);
    } catch (e) {
        logger.error('isomorphic error, component is located in [/static/app/src/components/list-report/index]\r\n' + e.stack);
        consoler.error('Error:not valid component');
        return;
    }
}
