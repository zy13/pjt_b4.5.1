/**
 * 遮罩层
 */

var React = require('react');

var render = function() {

	return (
		<div className="totop" ref="totop" onClick={this.gototop}><span className="cpf-icon-ic_totop"></span></div>
	)

}

module.exports = render;