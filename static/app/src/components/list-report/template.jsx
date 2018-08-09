/**
 * 公用头部
 */

var React = require('react');
var ReportItem = require('../../components/list-report-item/index');

var render = function() {
    var self = this;
    // 数据
    var reportList = this.state.data;
    //var items = [];
    var items = reportList.List.map(function(val, index, array) {
        return (
            <ReportItem
                domain={self.props.domain}
                key={index}
                index={index}
                data={val}
                type={index ? 0 : 1}
                select={self.state.selectItem[index]}
                callbackSelect={self.callbackSelect}
            />
        );
    });
    // UI
    var checkClass = 'result-filter-check float-left' + (this.state.isSelectAll ? ' check' : '');
    var check = this.state.isSelectAll ? true : false;
    /**
     * 点击加载
     */
    var loading = '';
    if (reportList.SurplusItemCount > 0) {
        switch (this.state.loadingType) {
            case 0:
                loading = <a href="javascript:void(0);" onClick={this.handleLoad}>点击加载更多，剩余{reportList.SurplusItemCount}条</a>;
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

    var selectedCount = 0;
    for (var i = 0; i < self.state.selectItem.length; i++) {
        if (self.state.selectItem[i]) {
            selectedCount++
        }
    };

    return (
        <div className="pjt-result">
            <div className="result-filter">
                <label className={checkClass}>
                    <input type="checkbox" value={this.state.isSelectAll} onChange={this.handleSelectAll} checked={check} />
                    <i className="cpf-icon-ic_tick"></i>
                    <span>全选</span>
                    <span>({selectedCount})</span>
                </label>
                <a href="#" onClick={this.handleSendReportEmail} className={JSON.stringify(this.state.selectItem).indexOf('true')>=0 ? 'cui-button preset-blue float-right' : 'cui-button preset-gray float-right'}>
                    <span>推送报告</span>
                </a>
            </div>
            <div className="pjt-list-project">
                <div className="list-project-count">
                    <span>共{reportList.TotalItemCount}条记录</span>
                </div>
                <div className="list-project">{items}</div>
                <div className="list-project-more">{loading}</div>
            </div>
        </div>
    )
}

module.exports = render;
