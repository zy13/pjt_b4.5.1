/**
* @Author: Jet.Chan
* @Date:   2016-06-29T13:39:52+08:00
* @Email:  guanjie.chen@talebase.com
* @Last modified by:   Jet.Chan
* @Last modified time: 2016-09-07T10:46:01+08:00
*/



/**
 * 公用头部
 */

var React = require('react');

var render = function() {
    var iconClass = "cpf-icon-ic_arrowleft pjt-back";
    var logoClass = "pjt-logo";
    var filterClass = "hidden";
    var iconShareClass='cpf-icon-ic-share-solid pjt-share';

    switch (this.props.type) {
        // 没有logo，没有返回
        case '0':
            iconClass = iconClass + ' hidden';
            logoClass = logoClass + ' hidden';
            iconShareClass = iconShareClass + ' hidden';
            break;
            // 带返回
        case '1':
            logoClass = logoClass + ' hidden';
            iconShareClass = iconShareClass + ' hidden';
            break;
            // 带logo
        case '2':
            iconClass = iconClass + ' hidden';
            iconShareClass = iconShareClass + ' hidden';
            break;
            //带返回、分享
        case '3':
            logoClass = logoClass + ' hidden';
            break;

    }

    if (this.props.hasFilter) {
        filterClass = "cpf-icon-ic_arrowdown pjt-filter";
    }
    var title = '';
    if(this.props.title){
        title = <p className="title">{this.props.title}</p>
    }else if(this.props.titleType == '1'){
        title = <p className="main-title">倍智TAS<sup><i className="web-font">®</i></sup>人才测评系统</p>
    }else if(this.props.titleType == '2'){
        title = <p className="main-title">关于倍智TAS<sup><i className="web-font">®</i></sup>人才测评系统</p>
    }
    return (
        <div className='pjt-header'>
            <i onClick={this.back} className={iconClass}></i>
            <img onClick={this.props.showSidebar} className={logoClass} src={this.state.src} />
            {title}
            <i onClick={this.props.showSidebar} className={filterClass}></i>
            <i onClick={this.shareReport} className={iconShareClass}></i>
        </div>
    )
}

module.exports = render;
