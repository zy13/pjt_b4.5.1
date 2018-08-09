/**
 * 公用头部
 */

var React = require('react');

var render = function() {
    var self = this;
    // 展开/收起 默认状态
    var type = 'pjt-list-project-item ' + (this.props.type ? this.props.classShow : '');
    // 二维码是否显示
    var qrcode = '';
    if (this.props.createRight && this.props.data.IsEnableScan) {
        qrcode = <div className="btn-qrcode" onClick={this.handleShowQrcode}></div>;
    };
    // 子项目
    var list = [];
    this.props.data.ChildList.forEach(function(val, index, arr) {
        var style = {
            width: val.CompleteCount / val.OpenCount * 100 + '%'
        };
        var linkUser = self.props.accountRight ? <a href={'/accountCenter/index/' + self.props.data.ProjectId + '/' + val.ProjectId}>帐号管理</a> : '';
        var linkResult = self.props.reportRight ? <a href={'/' + self.props.domain + '/reportCenter/items/' + val.ProjectId}>查看结果</a> : '';
        list.push(
            <div key={index} className="item-con-row">
                <div className="btns">{linkUser}{linkResult}</div>
                <div className="info">
                    <h4>{val.ProjectName}</h4>
                    <div className="progress">
                        <div className="progress-bar"><span style={style}></span></div>
                        <div className="progress-pre"><span>{val.CompleteCount}</span> / {val.OpenCount}</div>
                    </div>
                </div>
            </div>
        );
    });
    return (
        <div className={type} ref="list-project-item">
            <div className="item-cap">
                <h3 onClick={this.handleSlide}><span className="cpf-icon-center_ic-_arrowdown"></span>{this.props.data.ProjectName}</h3>
                {qrcode}
            </div>
            <div className="item-con">{list}</div>
        </div>
    )
}

module.exports = render;
