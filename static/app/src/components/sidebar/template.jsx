/**
 * 侧边栏
 */

var React = require('react');
var Block = require('../block/index');
var PopMsg = require('../popMsg/index');

var render = function() {

    return (
        <div ref='sidebar' onTouchStart={this.touchStart} onTouchMove={this.touchMove} onTouchEnd={this.touchEnd}>
            {
                function() {
                    if (this.props.type == 'left') {
                        return (
                            <div className={this.state.bodyClass}>
                                <div className='sidebar-head'>
                                    <div className='sidebar-head-logo'>
                                        <img src={this.state.logo} />
                                    </div>
                                    <div className='sidebar-head-title'>
                                        <div ref="short-name">未登录</div>
                                        <div className='sub'>有效期至：<span ref="Period-validity"></span></div>
                                    </div>
                                </div>
                                <div className='sidebar-list'>
                                    <ul>
                                        <li>
                                            <a href='/user/personalInfo' onClick={this.close}>
                                                <div className='sidebar-list-logo'>
                                                    <i className='cpf-icon-ic_portrait'></i>
                                                </div>
                                                <div className='sidebar-list-title'>
                                                    <span>个人信息</span>
                                                </div>
                                                <div className='sidebar-list-arrow'>
                                                    <i className='cpf-icon-ic_arrowright'></i>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href='/user/about' onClick={this.close}>
                                                <div className='sidebar-list-logo about'>
                                                    <i className='cpf-icon-about-tas'></i>
                                                </div>
                                                <div className='sidebar-list-title'>
                                                    <span>关于倍智TAS<sup><i className="web-font">®</i></sup>人才测评系统</span>
                                                </div>
                                                <div className='sidebar-list-arrow'>
                                                    <i className='cpf-icon-ic_arrowright'></i>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href='javascript:;' onClick={this.logout}>
                                                <div className='sidebar-list-logo quit'>
                                                    <i className='cpf-icon-quit grey'></i>
                                                </div>
                                                <div className='sidebar-list-title'>
                                                    <span>退出</span>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div className={this.state.bodyClass}></div>
                        )
                    }
                }.call(this)
            }
            <Block ref='sidebarBlock' close={this.close}></Block>
            <PopMsg ref='logoutMsg'>
                <p style={{fontSize:'0.9rem'}}>确定退出当前帐号</p>
            </PopMsg>
        </div>
    )
}

module.exports = render;
