/*
* @Author: dser.wei
* @Date:   2016-06-22 11:23:19
* @Last Modified by:   dser.wei
* @Last Modified time: 2016-06-23 16:25:12
*/

'use strict';

/*
    jade上面可以直接调用的方法
 */

var path = require('path');
var fileHelper = require('../../tools/fileHelper');
var moment = require('moment');
var _ = require('lodash');

var getModuleStat = function() {
    var statJSON = fileHelper.readJSON(path.join(__dirname, '../../', 'assets.json'));
    return statJSON;
};

module.exports = {

    setScript: function(moduleName) {
        var statJSON = getModuleStat();
        if (moduleName && statJSON[moduleName] && statJSON[moduleName].js) {
            var scriptName = typeof(statJSON[moduleName]) == 'string' ? statJSON[moduleName] : statJSON[moduleName].js;
            return scriptName;
        } else {
            return '';
        }

    },

    setStyle: function(moduleName) {
        var statJSON = getModuleStat();
        if (moduleName && statJSON[moduleName] && statJSON[moduleName].css) {
            var cssName = typeof(statJSON[moduleName]) == 'string' ? statJSON[moduleName] : statJSON[moduleName].css;
            return cssName;
        } else {
            return '';
        }

    },

    getConfData: function(fileName) {
        var filePath = path.join(__dirname, '../dataSet', fileName + '.json');
        var res = fileHelper.readJSON(filePath, {});
        return res;
    },

    isDev: function() {
        //判断是否开发环境
        return !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
    },

    querySet: function(queryObj, currQueryObj) {
        var queryArray = [];
        var qObj = _.extend(currQueryObj || {}, queryObj || {});
        Object.keys(qObj).forEach(function(v) {
            if (qObj[v] || queryArray[v] != '') {
                queryArray.push(v + '=' + encodeURIComponent(qObj[v])); // 阻止IE浏览器自动解码
            }
        });
        var queryString = queryArray.join('&');
        return queryString.length > 0 ? ('?' + queryString) : '';
    },

    setPageImgPath: function(imgPath) {
        if (this.isDev()) {
            return imgPath;
        } else {
            var sc = global.staticConfig || {};
            if (sc) {
                return sc.staticDomain + imgPath;
            }
            return '';
        }
    },

    date: {
        isToday: function(date) {
            try {
                return mement().isSame(date, 'day');
            } catch (e) {
                return false;
            }
        },
        format: function(dateString, format) {
            //设置语言
            moment.locale('zh-cn');
            return moment(dateString).format(format);
        },
        getweek: function(dateString) {
            return moment(dateString).format('dddd').replace(/星期/, '周');
        }
    },

    formatter: {
        escape: function(value) {
            return String(value)
                .replace(/&/g, '&amp;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
        },
        nl2br: function(value) {
            return String(value || '')
                .replace(/<[^>]+>/g, '')
                .replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br/>' + '$2');
        },
        toText: function(value) {
            return String(value || '').replace(/<[^>]+>/g, '');
        },
        strCut: function(str, maxLength, tail) {
            //文字裁剪
            if (maxLength == null) {
                maxLength = 80;
            }
            if (tail == null) {
                tail = '...';
            }
            str = str || '';
            if (str.length > maxLength) {
                return str.slice(0, maxLength - tail.length) + tail;
            }
            return str;
        }
    },

    f2int: {
        ceil: function(float) {
            return Math.ceil(float);
        },
        floor: function(float) {
            return Math.floor(float);
        },
        parse: function(float) {
            return parseInt(float, 10);
        }
    }

};
