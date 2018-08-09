/**
 * 遮罩层
 */

var React = require('react');

var render = function() {

    return (
        <div className={this.state.blockClass} onClick={this.props.close}></div>
    )
}

module.exports = render;
