/*
 * @Author: dser.wei
 * @Date:   2016-06-29 14:31:01
 * @Last Modified by:   chenliexin
 * @Last Modified time: 2016-07-20 14:59:53
 */

'use strict';

var baseVM = require('../../core/baseViewModel');
var errEnum = require('../../core/errCodeHelper');
var dal = require('../../dal/main');
var qExt = require('../../core/asynRequestHelper');
var _ = require('lodash');


module.exports = function*(opts) {

    // 以下为服务端端api请求示例代码
    /*var demo1Vm = {},
        demo2Vm = {},
        demo3Vm = {};
    var r = yield * qExt.when([dal.demo.getBaseCodeList({}), dal.demo.getSingleVote({}), dal.demo.sendMobileValidateSms({Mobile:'13580515020'})]);

    if(r[0] && r[0].Status) {
        demo1Vm = r[0].Data;
    }

    if(r[1] && r[1].Status) {
        demo2Vm = r[1].Data;
    }

    if(r[2] && r[2].Status) {
        demo3Vm = r[2].Data;
    }*/

    var projectList = yield dal.accessmentMobile.getProjectList(opts),
        projectListVm = {},
        totalCountVm = 0,
        remainsCountVm = 0,
        pageIndexVm = 0,
        accountRightVm = 0,
        reportRightVm = 0,
        createRightVm = 0;

    if (projectList && projectList.Status) {
        projectListVm = projectList.Data;
        totalCountVm = projectList.TotalItemCount;
        remainsCountVm = projectList.SurplusItemCount;
        pageIndexVm = projectList.PageIndex;
        accountRightVm = projectList.AccountRight;
        reportRightVm = projectList.ReportRight;
        createRightVm = projectList.CreateRight;
    }

    var vm = _.extend(baseVM.base, {
        data: {
            projectList: {
                data: projectListVm,
                totalCount: totalCountVm,
                remainsCount: remainsCountVm,
                pageIndex: pageIndexVm,
                accountRight: accountRightVm,
                reportRight: reportRightVm,
                createRight: createRightVm
            }
        }
    });

    return vm;

}