/*
* @Author: dser.wei
* @Date:   2016-06-27 11:09:37
* @Last Modified by:   dser.wei
* @Last Modified time: 2016-06-27 14:56:35
*/

'use strict';

var fs = require('fs'),
    path = require('path');

module.exports = {

    getEntry: function(cfg) {
        var entryExport = {};
        for (var pathItem in cfg.static.srcPath) {
            var srcPath = path.join(__dirname, '../', cfg.static.srcPath[pathItem]);
            fs.readdirSync(srcPath).forEach(function(v) {
                var tmpSrc = path.join(srcPath, v);
                if (fs.statSync(tmpSrc).isDirectory()) {
                    fs.readdirSync(tmpSrc).forEach(function(jsFile) {
                        var filePath = path.join(tmpSrc, jsFile);
                        if (fs.existsSync(filePath) && jsFile.indexOf('.js') !== -1) {
                            var _pageName = jsFile.replace('.js', '');
                            entryExport[v + '.' + _pageName] = filePath;
                        }
                    });
                }
            });
        }
        return entryExport;
    }

}
