/*
* @Author: dser.wei
* @Date:   2016-06-29 17:04:48
* @Last Modified by:   dser.wei
* @Last Modified time: 2016-06-29 17:31:34
*/

'use strict';

var q = require('q');


module.exports = {

    //q allSettled 等待所有promises返回结果，无论fulfilled或rejected
    when: function*(promises) {
        var r = yield q.allSettled(promises);
        var resList = [];

        r.forEach(function(r){
            if(r.state == 'fulfilled') {
                resList.push(r.value);
            } else {
                resList.push(null);
            }
        });

        return resList;
    }

    //可继续封装q的其他方法，如
    //any（当队列中一个promise fulfilled立即返回该promise的fulfilled，全部rejected返回rejected），
    //all（当队列中一个promise rejected立即返回该promise的rejected，全部fulfilled返回fulfilled）

};
