/**
 * 公用头部
 */

$ = require('jquery');
var React = require('react');

var render = function() {
    return (
        <div className="pjt-search">
            <div className="search-box">
                <input type="text" ref="query" value={this.state.value} placeholder="请输入关键字" onChange={this.handleChange} />
                <button className="cpf-icon-ic_search" onClick={this.search}></button>
            </div>
        </div>
    )
}

module.exports = render;
