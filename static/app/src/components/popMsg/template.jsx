/**
 * 弹出对话框
 */

var React = require('react');
var Block = require('../block/index');

var render = function() {

    return (
        <div>
            <div className={this.state.bodyClass}>
                <div className='popMsg-content'>{this.props.children}</div>
                <div className='popMsg-btns'>
                    <a className="btn confirm" onClick={this.confirm}>确定</a>
                    <a className="btn" onClick={this.cancel}>取消</a>
                </div>
            </div>
            <Block ref='popBlock' close={this.close}></Block>
        </div>
    )
}

module.exports = render;
