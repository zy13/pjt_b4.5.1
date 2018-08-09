/**
* @Author: Jet.Chan
* @Date:   2016-09-05T10:10:30+08:00
* @Email:  guanjie.chen@talebase.com
* @Last modified by:   Jet.Chan
* @Last modified time: 2016-09-07T10:39:29+08:00
*/



/**
 * 公用头部
 */

$ = require('jquery');
var React = require('react');

var render = function() {
    var canSub = this.state.canSub;
    var isSubmitting = this.state.isSubmitting;
    // 遮罩层 用于实现点击登录按钮后 屏蔽所有操作
    var cover = isSubmitting ? <div className="login-cover"></div> : '';
    // 登录按钮状态
    var subbtn = {
        className: 'login-info-btn' + (canSub && !isSubmitting ? ' btn-sub-able' : ''),
        text: isSubmitting ? '登录中....' : '登  录'
    }
    var mask = isSubmitting ? 'mask active':'mask';
    var start_page = this.state.start?'start-page':'start-page hide';
    return (
        <div className="login-warp">
            <div className={start_page}>
                <img src="../../../img/start-page1.jpg"/>
                <div className="bottom">
                    <img src="../../../img/start-page3.png"/>
                </div>
            </div>
            <div className="pjt-login">
                <div className="login-header">
                    <img src="../../../img/login-bg.jpg"/>
                    <div className="login-title">倍智TAS<sup><i className="web-font">®</i></sup>人才测评系统</div>
                </div>

                <div className="login-info">
                    <div className="login-box">
                        <div className="cui-textBoxContainer" data-rule="required" data-tips={this.props.domain.tip}>
                            <div className={mask}></div>
                            <span className="icon cpf-icon-ic_web"></span>
                            <input className="sub-required" type="text" placeholder={this.props.domain.plh} onKeyUp={this.handleInput} ref="domain" />
                        </div>
                        <div className="cui-textBoxContainer" data-rule="required" data-tips={this.props.user.tip}>
                            <div className={mask}></div>
                            <span className="icon cpf-icon-ic_portrait"></span>
                            <input className="sub-required" type="text" placeholder={this.props.user.plh} onKeyUp={this.handleInput} ref="account" />
                        </div>
                        <div className="cui-textBoxContainer" data-rule="required" data-tips={this.props.pwd.tip}>
                            <div className={mask}></div>
                            <span className="icon cpf-icon-ic_lock"></span>
                            <input className="sub-required" type="password" placeholder={this.props.pwd.plh} onKeyUp={this.handleInput} ref="password" />
                            <i id="btn-pwd-toggel" className="cpf-icon-ic_pwd_hide" onClick={this.handlePwdToggel}></i>
                        </div>
                    </div>
                    <div className={subbtn.className}>
                        <div id="btn-sub" className="cui-button preset-blue" onClick={this.handleSub}><span>{subbtn.text}</span></div>
                    </div>
                </div>
                {cover}
            </div>
        </div>

    )
}

module.exports = render;
