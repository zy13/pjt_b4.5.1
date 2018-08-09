/*
 * @Author: liexin.chen
 * @Date:   2016-07-11 17:11:48
 * @Last Modified by:   liexin.chen
 * @Last Modified time: 2016-07-13 15:49:46
 */

'use strict';

var ajaxHelper = require('../core/ajaxHelper');

module.exports = {

	QueryResults: function(obj) {
		return ajaxHelper.get({
			url: '/api/report/QueryResults',
			data: {
				CustomerId: obj.CustomerId || 0,
				KeyWord: obj.KeyWord || '',
				PageIndex: obj.PageIndex || 0,
				PageSize: obj.PageSize || 10,
				ProjectId: obj.ProjectId || 0
			}
		});
	},


};