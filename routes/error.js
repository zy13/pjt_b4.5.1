/*
 * @Author: dser.wei
 * @Date:   2016-06-23 11:28:38
 * @Last Modified by:   sihuicao
 * @Last Modified time: 2016-09-01 11:48:35
 */

'use strict';

var router = require('../app/core/baseRouter')({
    prefix: '/error'
});

router.get('/404', function*() {
    this.render('error/404', {
        title: 'TAS人才测评系统',
        headerHtml: require('../app/service/isomorphic/header')({
            title: "",
            type: "0",
            titleType:'1'
        }),
        footerHtml: require('../app/service/isomorphic/footer')()
    });
});

router.get('/timeout', function*() {
    this.render('error/timeout', {
        title: 'TAS人才测评系统',
        headerHtml: require('../app/service/isomorphic/header')({
            title: "",
            type: "0",
            titleType:'1'
        }),
        footerHtml: require('../app/service/isomorphic/footer')()
    });
});

module.exports = router;
