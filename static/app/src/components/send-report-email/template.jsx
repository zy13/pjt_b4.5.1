/**
* @Author: Jet.Chan
* @Date:   2016-09-05T10:10:30+08:00
* @Email:  guanjie.chen@talebase.com
* @Last modified by:   Jet.Chan
* @Last modified time: 2016-09-09T10:14:31+08:00
*/



/**
 * 邮件发送
 */

var React = require('react');

var render = function() {
    // console.log('props:',this.props);
    return (
        <div className="pjt-send-email">
            <div className="sendEmail-container">
                <div className="cui-textBoxContainer" data-rule="required;email" data-tips='请输入正确的邮件地址'>
                    <span className="tip"><span className="requiredTip">*</span>收件人</span>
                    <input type="text" placeholder="请输入邮件地址" ref="ToUser" onKeyUp={this.handleInput} />
                </div>
                <div className="cui-textBoxContainer" data-rule="required" data-tips='主题不能为空'>
                    <span className="tip"><span className="requiredTip">*</span>主题</span>
                    <input type="text" placeholder="请输入邮件主题" defaultValue="推送报告" ref="Title" onKeyUp={this.handleInput} onBlur={this.handleInput} />
                </div>
                <div className="cui-textBoxContainer">
                    <span className="tip">邮件内容</span>
                    <div className="content" id="contentBox" readOnly dangerouslySetInnerHTML={{__html: this.props.Content}} />
                </div>
                <div className="cui-textBoxContainer">
                    <span className="tip">备注</span>
                    <textarea placeholder="请输入邮件备注" ref="Remark" maxLength="200"></textarea>
                </div>
                <div className="cui-textBoxContainer">
                    <button className={this.state.Status=='canSubmit'? 'cui-button preset-blue' : 'cui-button preset-blue disabled'} onClick={this.handleSubmit}>{this.state.submitText}</button>
                </div>

            </div>
        </div>
    );
}

module.exports = render;
