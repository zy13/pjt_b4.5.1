/*
 * @Author: dser.wei
 * @Date:   2016-06-27 18:12:05
 * @Last Modified by:   sihuicao
 * @Last Modified time: 2016-08-25 10:28:31
 */

'use strict';

var React = require('react');
var ReactDomServer = require('react-dom/server');

require('node-jsx').install({ extension: '.jsx' });

var Header = require('../../../static/app/src/components/header/index');
var logger = require('../../core/logger');
var consoler = require('consoler');
module.exports = function(opts) {

    try {
        var headerFactory = React.createFactory(Header);

        var header = headerFactory(opts);

        return ReactDomServer.renderToString(header);
    } catch(e) {
        logger.error('isomorphic error, component is located in [/static/app/src/components/header/index]\r\n');
        consoler.error('Error:not valid component');

        return;
    }
}
