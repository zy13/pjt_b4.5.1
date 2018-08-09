/*
 * @Author: yongquan.wu
 * @Date:   2016-07-29 16:49:54
* @Last modified by:   Jet.Chan
* @Last modified time: 2016-09-06T14:34:40+08:00
 */

'use strict';

var React = require('react');
var ReactDomServer = require('react-dom/server');
var logger = require('../../core/logger');
var consoler = require('consoler');
require('node-jsx').install({ extension: '.jsx' });

var Component = require('../../../static/app/src/components/send-report-email/index');

module.exports = function(opts) {
    try {
        var sendReportEmailFactory = React.createFactory(Component);
        var sendReportEmail = sendReportEmailFactory(opts);
        return ReactDomServer.renderToString(sendReportEmail);
    } catch(e) {
        //logger.error('isomorphic error, component is located in [/static/app/src/components/send-report-email/index]\r\n');
        //consoler.error('Error:not valid component');
        console.log('isomorphic error, component is located in [/static/app/src/components/send-report-email/index]\r\n');
        console.log(e);

        return;
    }
}
