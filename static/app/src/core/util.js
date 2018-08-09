/*
* @Author: dser.wei
* @Date:   2016-06-27 15:53:26
* @Last Modified by:   dser.wei
* @Last Modified time: 2016-06-27 15:54:27
*/

'use strict';

var $ = require('jquery');

module.exports = {
    /*
     * 返回ie版本
     * @return {Number}
     */
    ie: (function() {
        /*var undef,
            v = 3,
            div = document.createElement('div'),
            all = div.getElementsByTagName('i');
        div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->'

        while (all[0]) {
            div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->';
            continue;
        }

        var ieV = v > 4 ? v : undef;
        if (ieV === undef) {
            var ua = navigator.userAgent.toLowerCase();
            var s;
            (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? ieV = s[1] : (s = ua.match(/msie ([\d.]+)/)) ? ieV = s[1] : undef;

        }*/
        var ua = navigator.userAgent.toLowerCase();
        var s, ieV;
        (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? ieV = s[1] : (s = ua.match(/msie ([\d.]+)/)) ? ieV = s[1] : null;

        return ieV;
    }()),

    /*
     * [urlContext 获取url参数]
     * @return {[object]}
     */
    urlContext: function() {
        var urlContext = {};
        var hashReg = /#\/.*\?.*$/;
        var href = location.href;
        var _hash = href.match(hashReg);
        if (_hash) {
            var _paras = _hash[0].split('?');
            if (_paras.length > 1) {
                var _parArray = _paras[1].split('&');
                $(_parArray).each(function(k, v) {
                    var _par = v.split('=');
                    urlContext[_par[0].toString().toLowerCase()] = _par[1] || ''
                })
            }
        } else {
            var _locationSearch = location.search;
            if (_locationSearch) {
                _locationSearch = _locationSearch.replace('?', '');
                _paras = _locationSearch.split('&');
                if (_paras.length > 0) {
                    $(_paras).each(function(k, v) {
                        var _par = v.split('=');
                        urlContext[_par[0].toString().toLowerCase()] = _par[1] || ''
                    })
                }
            }
        }
        return urlContext;
    }
};
