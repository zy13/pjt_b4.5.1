/**
 * 公用头部
 */

$ = require('jquery');
var React = require('react');

var render = function() {
    var report = '';
    if (this.props.data) {
        report = this.props.data.Content;
    } else {
        // 应该需要一个无数据情况
    };
    return (
        <div className="pjt-report">this.props.data.Content</div>
    )
}

module.exports = render;