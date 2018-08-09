/*
* @Author: zyuan
* @Date:   2016-08-03 16:48:23
* @Last Modified by:   sihuicao
* @Last Modified time: 2016-08-25 10:28:25
*/

'use strict';

var React = require('react');
var ReactDomServer = require('react-dom/server');
var logger = require('../../core/logger');
var consoler = require('consoler');
require('node-jsx').install({ extension: '.jsx' });

var Component = require('../../../static/app/src/components/send-email-msg/index');

module.exports = function(opts) {
    try {
        var sendReportEmailFactory = React.createFactory(Component);
        var sendReportEmail = sendReportEmailFactory(opts);
        return ReactDomServer.renderToString(sendReportEmail);
    } catch(e) {
        //logger.error('isomorphic error, component is located in [/static/app/src/components/send-report-email/index]\r\n');
        //consoler.error('Error:not valid component');
        console.log('isomorphic error, component is located in [/static/app/src/components/send-email-msg/index]\r\n');
        console.log(e);

        return;
    }
}
