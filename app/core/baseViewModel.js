/*
* @Author: dser.wei
* @Date:   2016-06-29 16:30:04
* @Last Modified by:   dser.wei
* @Last Modified time: 2016-06-30 14:49:19
*/

'use strict';

var _ = require('lodash');

module.exports = {

    // Base Vm
    base: {
        data: {},
        statusCode: 0
    },

    // Error Vm
    error: function(code, vm) {
        var errorVm = vm || _.cloneDeep(this.base);

        errorVm.statusCode = code;

        return errorVm;
    }
}
