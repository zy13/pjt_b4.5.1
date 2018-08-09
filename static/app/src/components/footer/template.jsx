/**
 * 公用头部
 */

var React = require('react');

var render = function() {
    var getNowYear = new Date().getFullYear();

    return (
        <div className='pjt-footer'>
            <p className="cp2">&copy;2003-{getNowYear} &nbsp;TaleBase. All Rights Reserved.</p>
            <p className="cp2">倍智版权所有</p>
        </div>
    )
}

module.exports = render;
