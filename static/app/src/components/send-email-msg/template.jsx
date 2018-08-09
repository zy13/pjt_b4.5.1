

/**
 * 邮件或短信发送
 */
$ = require('jquery');
var React = require('react');

var render = function() {
    var self = this;
    var selEmail = {
        className: 'pjt-email-about' + (this.state.isEmailChecked ? '': ' dis')
    };
    var selMsg = {
        className: 'pjt-msg-about' + (this.state.isMsgChecked ? '': ' dis')
    };
    var subBnt1 = {
        className: 'cui-button'+(this.state.canSub?' active': ' disabled')
    }
    var cover = !this.state.canSub ? <div className="btn-cover"></div> : '';
    var modal = this.state.openModal ? <div className="modal"><div className="modal-content"><div className="cont">{this.state.errorMessage}</div><div className="cui-button modal-confirm" onClick={this.handleModal}>确定</div></div></div> : '';

    var fixBottom = {
        className: 'btn-detail'+(this.state.btnClass && !this.state.isIphone? ' fixed-bottom':'')
    };
    var smsTemplate = this.props.PushTemplate.SmsTemplate;
    var isTipShow = this.state.isWarnTip|| this.state.isSuccess || this.state.isError ?'tipWrap show':'tipWrap hide';
    var spanClass = '';

    if(this.state.isWarnTip){
        spanClass = 'cpf-icon-ic_warming';
    }else if(this.state.isSuccess){
        spanClass = 'cpf-icon-ic_ok';
    }else if(this.state.isError){
        spanClass = 'cpf-icon-ic_close';
    }
    /**
     * 邮件数据渲染
     */
    var emailItems = [], smsItems = [];

    this.props.PushTemplate.MailTemplate.map(function(val,index){
        emailItems.push(
            <option data-id={val.MailTemplateId} data-subject={val.MailSubject} data-body={val.MailBody}>{val.TemplateName}</option>
        );
    });

    this.props.PushTemplate.SmsTemplate.map(function(val,index){
        smsItems.push(<option data-id={val.SmsTemplateId} data-content={val.TemplateContent}>{val.TemplateName}</option>);
    });

    return (
        <div className="pjt-send" ref="pjt_send">
            <div className="buy-more">
                <div className="data-detail">
                    <div className="icon-type">
                        <span>
                            <i className="cpf-icon-ic_sent"></i>
                        </span>
                    </div>
                    <div className="data-type">
                        <span className="mar-right">已选帐号数量：&nbsp;&nbsp;<span>{this.state.accountLen}</span><span>&nbsp;个</span></span>
                        <span>短信剩余数量：&nbsp;&nbsp;<span>{this.props.PushTemplate.SMSSurplus}</span><span>&nbsp;条</span></span>
                    </div>
                </div>
            </div>
            <div className="pjt-send-email">
                <div className="sendEmail-container">
                    <div className="tip1">
                        <div className="cui-checkboxContainer inline">
                            <input type="checkbox" onChange={this.handleEmailChecked} />
                            <label><i></i><span>邮件</span></label>
                        </div>
                        <div className='cui-selectBoxContainer'>
                            <span className="placeholder" data-id={this.state.emailData.mailTemplateId}>{this.state.emailData.templateName}</span>
                            <select className={this.state.isEmailChecked ? 'emailt':'dis'} onChange={this.handleSelect}>
                                {emailItems}
                            </select>
                        </div>
                    </div>
                    <div className={selEmail.className}>
                        <div className="pjt-email-title">
                            <p><span>*</span> 邮件标题</p>
                            <div className="cui-textBoxContainer">
                                <input type="text" className="itemTitle" value={this.state.emailData.mailSubject} onChange={this.handleInput}/>
                            </div>
                        </div>
                        <div className="pjt-email-desc">
                            <p>邮件内容</p>
                            <div className='detail' dangerouslySetInnerHTML={{__html:this.state.emailData.mailBody}}></div>
                        </div>
                    </div>
                </div>
                <div className="sendMsg-container">
                    <div className="tip2">
                        <div className="cui-checkboxContainer inline">
                            <input type="checkbox" onChange={this.handleMsgChecked}/>
                            <label><i></i><span>短信</span></label>
                        </div>
                        <div className='cui-selectBoxContainer'>
                            <span className="placeholder" data-id={this.state.smsData.smsTemplateId}>{this.state.smsData.templateName}</span>
                            <select className={this.state.isMsgChecked ? 'smst':'dis'} onChange={this.handleSelect}>
                                {smsItems}
                            </select>
                        </div>
                    </div>
                    <div className={selMsg.className}>
                        <div className="pjt-msg-desc">
                            <p>短信内容</p>
                            <div className='detail' dangerouslySetInnerHTML={{__html:this.state.smsData.templateContent}}></div>
                            <p className='dec-detail'></p>
                        </div>
                    </div>
                </div>
                <div className='btn-event' ref="btn_event">
                    <div className={fixBottom.className} ref="fixBottom">
                        <button id="cancel" className="cui-button" onClick={this.handleCancle}>取消</button>
                        <button  id="confirm" className={subBnt1.className} onClick={this.handleSubmit}>确定</button>
                    </div>
                    {cover}
                </div>
            </div>
            {modal}
        </div>
    );
}

module.exports = render;





















