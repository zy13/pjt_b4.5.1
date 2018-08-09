/**
 * 公用头部
 */

var React = require('react');
var ListProjectItem = require('../../components/list-project-item/index');

var render = function() {
    var items = [];
    for (var i = 0; i < this.props.list.length; i++) {
        items.push(<ListProjectItem
            domain={this.props.domain}
            type={i ? 0 : 1}
            key={i}
            data={this.props.list[i]}
            accountRight={this.props.accountRight}
            reportRight={this.props.reportRight}
            createRight={this.props.createRight}
            callbackParent={this.onChildChanged}
        />);
    };

    /**
     * 点击加载
     */
    var loading = '';
    if (this.state.remainsCount > 0) {
        switch (this.state.loadingType) {
            case 0:
                loading = <a href="javascript:void(0);" onClick={this.handleLoad}>点击加载更多，剩余{this.state.remainsCount}条</a>;
                break;
            case 1:
                loading = <a href="javascript:void(0);">加载中...</a>;
                break;
            case 2:
                loading = <a href="javascript:void(0);" onClick={this.handleLoad}>加载失败，点击重试</a>;
                break;
        };
    } else {
        loading = <a href="javascript:void(0);">以上为所有数据</a>;
    }

    return (
        <div className="pjt-list-project">
            <div className="list-project-count">
                <span>共{this.state.totalCount}条记录</span>
            </div>
            <div className="list-project">{items}</div>
            <div className="list-project-more">{loading}</div>
            <div className={'list-project-pop' + (this.state.projectId !== '' ? ' list-project-popshow' : '')}>
                <div className="pop-box">
                    <div className="pop-box-close" onClick={this.handlePopClose}><span className="cpf-icon-thin-close"></span></div>
                    <div className="pop-box-qrcode" ref="qrcode"></div>
                    <div className="pop-box-btn">长按二维码保存到本地</div>
                </div>
            </div>
        </div>
    )
}

module.exports = render;
