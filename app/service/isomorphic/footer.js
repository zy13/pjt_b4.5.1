/*
 * @Author: dser.wei
 * @Date:   2016-06-28 15:02:55
 * @Last Modified by:   sihuicao
 * @Last Modified time: 2016-08-25 10:28:32
 */

'use strict';

var React = require('react');
var ReactDomServer = require('react-dom/server');

require('node-jsx').install({ extension: '.jsx' });

var Footer = require('../../../static/app/src/components/footer/index');
var logger = require('../../core/logger');
var consoler = require('consoler');
module.exports = function() {

    try {
        var footerFactory = React.createFactory(Footer);

        var footer = footerFactory();

        return ReactDomServer.renderToString(footer);
    } catch(e) {
        logger.error('isomorphic error, component is located in [/static/app/src/components/footer/index]\r\n');
        consoler.error('Error:not valid component');

        return;
    }

}
