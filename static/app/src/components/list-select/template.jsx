var React = require('react');
var render = function() {
    var examDom = '',urgentDom = '';
    var examClassName=(this.props.sendStatus&&this.props.BatchRight)?'cui-button preset-blue':'cui-button preset-gray';
    var urgentClassName=this.props.BatchRight?'cui-button preset-blue':'cui-button preset-gray';
    var examMes = this.props.examMes?'sendMes active':'sendMes';
    var urgentMes = this.props.urgentMes?'promptMes active':'promptMes';

    var examCountMobile = this.props.examCount.mobile, examCountEmail = this.props.examCount.email;
    var displayNone = (examCountMobile==0 && examCountEmail==0)?'dis': '';
    var displayUrgent = (this.props.IsNullMobileCnt==0&&this.props.IsNullEmailCnt==0)?'dis':'';

    var totalCount = this.props.examCount.total;
    var disConfirm = (examCountMobile == totalCount && examCountEmail == totalCount) ? 'dis':'';
    var canStyle = disConfirm ? 'can-style' : '';
    var isTipShow = this.state.isWarnTip?'tipWrap show':'tipWrap hide';

    if(this.props.BatchRight){
        examDom = (
            <a className={examClassName} onClick={this.handleExamShow} href="javascript:void(0);">
                <span>发送测评</span>
            </a>)
    }
    if(this.props.BatchRight){
        urgentDom = (<a className={urgentClassName} onClick={this.handleUrgent} href="javascript:void(0);">
                <span>一键催促</span>
            </a>
            )
    }

    return (
        <div className="pjt-select">
            <div className="cui-checkboxContainer inline" onClick={this.callbackSelectAll}>
                <input type="checkbox" checked={this.props.select} />
                <label>
                    <i></i>
                    <span>全选</span>
                </label>
            </div>
            <div className='inline exam-count'>({this.props.examCount.total})</div>
            {urgentDom}
            {examDom}
            <a className="cui-button preset-green" href="javascript:void(0);" onClick={this.handleAdd}>
                <span>新建帐号</span>
            </a>
            <div className={examMes}>
                <div className="mask" onClick={this.handleExam}></div>
                <div className="sendMesContain">
                    <div className="tips">
                        <div className={disConfirm}>
                            <p >确定为选中的 {this.props.examCount.total}个帐号发送测评通知信息吗？<span className={displayNone}>其中：{this.props.examCount.mobile}个帐号没有手机号，{this.props.examCount.email} 个帐号没有邮箱。</span></p>
                        </div>
                        <p>
                            <i className="cpf-icon-ic_warm"></i>
                            <span>没有手机号与邮箱的帐号将无法发送信息，如有需要，请前往补充完整再发送测评信息。</span>
                        </p>
                    </div>
                    <div className='btn'>
                        <a href="javascript:void(0);"  className={disConfirm}  onClick={this.handleConfirm}>确定</a>
                        <a href="javascript:void(0);"  className={canStyle} onClick={this.handleExam}>取消</a>
                    </div>
                </div>
            </div>
            <div className={urgentMes}>
                <div className="mask"  onClick={this.handleUrgent}></div>
                <div className="promptMesContain">
                    <div className="tips">
                        <div>
                            <p>确定给未完成的帐号发送催办信息吗？ <span className={displayUrgent}>其中：{this.props.IsNullMobileCnt} 个帐号没有手机号，{this.props.IsNullEmailCnt} 个帐号没有邮箱。</span></p>

                        </div>
                        <p>
                            <i className="cpf-icon-ic_warm"></i>
                            <span>没有手机号与邮箱的帐号将无法发送信息，如有需要，请前往补充完整再发送催办信息。</span>
                        </p>
                    </div>
                    <div className="btn">
                        <a href="javascript:void(0);" onClick={this.handleConfirm}>确定</a>
                        <a href="javascript:void(0);" onClick={this.handleUrgent}>取消</a>
                    </div>
                </div>
            </div>

        </div>
    )
}

module.exports = render;
