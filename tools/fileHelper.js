/*
 * @Author: dser.wei
 * @Date:   2016-06-23 16:09:30
 * @Last Modified by:   dser.wei
 * @Last Modified time: 2016-06-27 14:08:19
 */

'use strict';

var fs = require('fs'),
    path = require('path');


module.exports = {

    has: function(uri) {
        return fs.existsSync(uri);
    },

    write: function(uri, txt) {
        if (this.has(uri)) {
            fs.chmodSync(uri, '755');
        }
        fs.writeFileSync(uri, txt, 'utf8');
    },

    read: function(uri, def) {
        if (false === this.has(uri)) {
            return def;
        }
        return fs.readFileSync(uri, 'utf8');
    },

    remove: function(uri) {
        if (this.has(uri)) {
            fs.chmodSync(uri, '755');
            fs.unlinkSync(uri);
        }
    },

    readJSON: function(uri, def) {
        var txt = this.read(uri, false);
        if (false === txt) {
            return def;
        }
        txt = String(txt).replace(/[^:]\/\/.*"?[\r\n\r]/g, '');
        // txt = txt.replace(/\/\\*[\\s\\S]*\\*\//g, '');
        // txt = txt.replace(/#.*[\\n|\\r\\n]/g, '');
        return JSON.parse(txt);
    },

    mkDir: function(uri) {
        if (this.has(uri)) {
            return true;
        } else {
            if (this.mkdirSync(path.dirname(uri))) {
                fs.mkdirSync(uri);
                return true;
            }
        }
    }

}
