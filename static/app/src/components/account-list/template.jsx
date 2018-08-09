var React = require('react');
var Item = require('../account-item/index');
var ListFunc = require('../list-select/index');
var ListError = require('../list-error/index');

var render = function() {
    var self = this;
    //万分注意此处的this已被修改，要用self!
    var items = this.props.list.map(function(val, index, array) {
        return (<Item
            key={index}
            ivalue={val}
            projectId={self.props.projectId}
            subProjectId={self.props.subProjectId}
            clearStatus={self.clearStatus}
            callbackSilde={self.callbackSilde}
            callbackSelect={self.callbackSelect}
            handleSingleSend={self.handleSingleSend}
            SendEmailRight={self.props.SendEmailRight}
        />);
    });

    /**
     * 点击加载
     */
    var loading = '';
    if (this.props.remainCount > 0) {                            //剩余结果不为空
        switch (this.props.loadingType) {
            case 0:                                              //默认状态
                loading = <a href="javascript:void(0);" onClick={this.handleLoad}>点击加载更多，剩余{this.props.remainCount}条</a>;
                break;
            case 1:                                              //点击加载更多
                loading = <a href="javascript:void(0);" >加载中...</a>;
                break;
            case 2:                                              //因外部原因导致加载失败
                loading = <a href="javascript:void(0);" onClick={this.handleLoad}>加载失败，点击重试</a>;
                break;
        };
    } else {                                                    //数据已全部显示
        loading = <a href="javascript:void(0);">以上为所有数据</a>;
    }

    var list;
    switch (this.props.type) {
        case 'list':                                         //数据列表不为空
            list = (
                <div className="list-contain">
                    <div className="total">
                        <i></i>
                        <span>共{this.props.total}条记录</span>
                    </div>
                    <ul>{items}</ul>
                    {loading}
                </div>
            )
            break;
        case 'error-noData':                                        //数据列表为空
            list = <ListError type="error-noData" />;
            break;
        case 'error-nodata':                                   //搜索结果为空
            list = <ListError type="error-nodata" />;
            break;
        case 'load':                                   //搜索中
            list = <ListError type="load" />;
            break;
        case 'search-error':                                   //出错
            list = <ListError type="search-error" />;
            break;

        default:
            break;
    };

    var isTipShow = this.state.isWarnTip ?'tipWrap show':'tipWrap hide';

    return (
        <div className="list">
            <ListFunc
                urgentMes={this.state.urgentMes}
                examMes={this.state.examMes}
                sendStatus={this.state.sendStatus}
                select={this.state.selectAll}
                clearStatus={self.clearStatus}
                callbackSelectAll={self.callbackSelectAll}
                callbackUrgentMes={this.callbackUrgentMes}
                callbackExamMes={this.callbackExamMes}
                projectId={this.props.projectId}
                subProjectId={this.props.subProjectId}
                examCount={this.state.examCount}
                IsNullEmailCnt={this.props.IsNullEmailCnt}
                IsNullMobileCnt={this.props.IsNullMobileCnt}
                BatchRight={this.props.BatchRight}
            />
            <div>{list}</div>
        </div>
    )
}

module.exports = render;
