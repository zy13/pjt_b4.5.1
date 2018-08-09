/**
 * 公用头部
 */

var React = require('react');

var render = function() {
    return (
        <div className="pjt-list-nodata">
            <dl>
                <dt><span className={this.props.typeData[this.props.type][0]}></span></dt>
                <dd>
                    <p>{this.props.typeData[this.props.type][1]}</p>
                </dd>
            </dl>
        </div>
    )
}

module.exports = render;