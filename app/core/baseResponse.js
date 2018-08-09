/*
* @Author: dser.wei
* @Date:   2016-06-30 10:46:13
* @Last Modified by:   dser.wei
* @Last Modified time: 2016-06-30 14:49:03
*/

'use strict';

var _ = require('lodash');

module.exports = {

    base: {
        status: true,
        data: {},
        code: 0,
        message: 'success'
    },

    success: function(data, res) {
        var response = res || _.cloneDeep(this.base);

        response.data = data;

        return response;
    },

    error: function(data, code, msg, res) {
        var response = res || _.cloneDeep(this.base);

        response.status = false;
        response.data = data;
        response.code = code;
        response.message = msg;

        return response;
    }

}
