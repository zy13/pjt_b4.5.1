var React = require('react');
var Searchbar = require('../searchbar/index');
var List = require('../account-list/index');
var Filter = require('../account-filter/index');

var render = function() {
    var type = this.state.type || this.props.type;
    var remainCount = (this.state.data.SurplusItemCount>0)?(this.state.data.TotalItemCount-this.state.pageIndex*10):0;

    return (
        <div className="contain">
            <Searchbar keyword={this.props.keyword} />
            <List
                SendEmailRight={this.state.data.SendEmailRight}
                BatchRight={this.state.data.BatchRight}
                list={this.state.data.List}
                total={this.state.data.TotalItemCount}
                remainCount={remainCount}
                type={type}
                loadingType={this.state.loadingType}
                callBackLoad={this.callBackLoad}
                projectId={this.props.projectId}
                subProjectId={this.props.subProjectId}
                NoCompleteCnt={this.props.list.Data.NoCompleteCnt}
                IsNullEmailCnt={this.props.list.Data.IsNullEmailCnt}
                IsNullMobileCnt={this.props.list.Data.IsNullMobileCnt}
            />
            <div className="introduce">
                <p className="int-head">
                    <i></i>
                    <span>图标说明</span>
                </p>
                <ul>
                    <li>
                        邮件图标：
                    </li>
                    <li>
                        <i className="cpf-icon-email_sent process"/>
                        <span>待发送</span>
                    </li>
                    <li>
                        <i className="cpf-icon-email_success success"/>
                        <span>成功</span>
                    </li>
                    <li>
                        <i className="cpf-icon-email_fail fail"/>
                        <span>失败</span>
                    </li>
                    <li>
                        短信图标：
                    </li>
                    <li>
                        <i className="cpf-icon-new_sent process"/>
                        <span>待发送</span>
                    </li>
                    <li>
                        <i className="cpf-icon-new_success success"/>
                        <span>成功</span>
                    </li>
                    <li>
                        <i className="cpf-icon-new_fail fail"/>
                        <span>失败</span>
                    </li>
                </ul>
            </div>
            <Filter
                filterclass={this.state.filterclass}
                status={this.state.status}
                callBackFilter={this.callBackFilter}
                callBackFilterSelect={this.callBackFilterSelect}
                callBackFilterActive={this.callBackFilterActive}

            />
        </div>
    )
}

module.exports = render;
