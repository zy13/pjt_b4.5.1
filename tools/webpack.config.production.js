/**
 * @Author: Jet.Chan
 * @Date:   2016-08-15T15:45:37+08:00
 * @Email:  guanjie.chen@talebase.com
* @Last modified by:   Jet.Chan
* @Last modified time: 2016-08-15T15:49:48+08:00
 */

var makeConf = require('./webpack.makeconf.js');

module.exports = makeConf({
    dev: false,
    debug: false,
    NODE_ENV: 'production'
});
