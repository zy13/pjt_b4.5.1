/**
 * 个人信息页
 */

var React = require('react');


var render = function() {
    // console.log('shuju:');
    // console.log(this.props);
    return (
        <div className="pjt-personal-info">
            <div className="personal-info-box">
                <div className="info-item">
                    <span className="txt-name">帐号:</span>
                    <span className="txt-value">{this.props.Account}</span>
                </div>
                <div className="info-item">
                    <span className="txt-name">姓名:</span>
                    <span className="txt-value">{this.props.Name}</span>
                </div>
            </div>
            <div className="personal-info-box">
                <div className="info-item">
                    <span className="txt-name">邮箱:</span>
                    <span className="txt-value">{this.props.Email}</span>
                </div>
                <div className="info-item">
                    <span className="txt-name">角色:</span>
                    <span className="txt-value">{this.props.RoleName}</span>
                </div>
                <div className="info-item">
                    <span className="txt-name">分组:</span>
                    <span className="txt-value">{this.props.GroupName}</span>
                </div>
            </div>
        </div>
    )
}

module.exports = render;
