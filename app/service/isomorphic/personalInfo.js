/*
 * @Author: yongquan.wu
 * @Date:   2016-07-25 16:49:54
 * @Last Modified by:   sihuicao
 * @Last Modified time: 2016-08-25 10:28:28
 */

'use strict';

var React = require('react');
var ReactDomServer = require('react-dom/server');

require('node-jsx').install({ extension: '.jsx' });


var List = require('../../../static/app/src/components/personal-info/index');
var logger = require('../../core/logger');
var consoler = require('consoler');

module.exports = function(opts) {
    try {
        var personalInfoFactory = React.createFactory(List);

        var personalInfo = personalInfoFactory(opts);

        return ReactDomServer.renderToString(personalInfo);
    } catch(e) {
        logger.error('isomorphic error, component is located in [/static/app/src/components/personal-info/index]\r\n');
        consoler.error('Error:not valid component');

        return;
    }
}
