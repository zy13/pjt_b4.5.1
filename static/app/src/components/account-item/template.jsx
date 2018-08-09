/**
* @Author: Jet.Chan
* @Date:   2016-09-05T10:10:30+08:00
* @Email:  guanjie.chen@talebase.com
* @Last modified by:   Jet.Chan
* @Last modified time: 2016-09-06T15:31:25+08:00
*/



var React = require('react');
var render = function() {
    var value = this.props.ivalue;
    var classname = value.isShow?'account-item active':'account-item';
    var emailStatus = '';    //发送邮件状态
    switch (value.MailStatus) {
        case 0:
            emailStatus = 'cpf-icon-email_fail fail';
            break;
        case 1:
            emailStatus = 'cpf-icon-email_success success';
            break;
        case 2:
            emailStatus = 'cpf-icon-email_sent process';
            break;
    }
    var smsStatus = '';       //发送短信状态
    switch (value.SmsStatus) {
        case 0:
            smsStatus = 'cpf-icon-new_fail fail';
            break;
        case 1:
            smsStatus = 'cpf-icon-new_success success';
            break;
        case 2:
            smsStatus = 'cpf-icon-new_sent process';
            break;
    }
    var examStatus = '';                      //测评状态
    switch (value.ExamStatus) {
        case 0:
            examStatus = '未开始';
            break;
        case 1:
            examStatus = '答题中';
            break;
        case 2:
            examStatus = '已完成';
            break;
        case 3:
            examStatus = '超时强制交卷';
            break;
        case 4:
            examStatus = '评项目终止';
            break;
        case 5:
            examStatus = '测评项目过期';
            break;
        case 6:
            examStatus = '测评过期';
            break;
        case 7:
            examStatus = '断线超限';
            break;
        case 8:
            examStatus = '重测超限';
            break;
        case 9:
            examStatus = '测评终止';
            break;
    };
    var detailMes = [],singleSet = [],userSetSet={},userSetArr=[];
    var userSetSort = [     //金字塔字段，依次显示手机、邮箱、学校、专业，其他XXXX等其他字段
        'Mobile',
        'Email',
        'School',
        'Major',
    ];
    var singleSort = [        //单身狗字段
        'Address',
        'PostalCode',
        'IdentityNum'
    ];
    var gender = value.Gender == 1?(<em>（男）</em>):(value.Gender==2?(<em>（女）</em>) : '');

    value.UserSet.map(function(field,index){
        if(userSetSort.indexOf(field.FieldKey)>-1){        //金字塔集合
            userSetSet[field.FieldKey]=(
                    <li key={index}>
                        <span>{field.FieldName}：</span>
                        <span>{field.FieldResult}</span>
                    </li>
                )

        }else if(singleSort.indexOf(field.FieldKey)>-1||field.FieldKey.indexOf('CustomField')>-1){       //单身狗集合
            singleSet.push(
                <li key={index} className="single">
                    <span>{field.FieldName}：</span>
                    <span>{field.FieldResult}</span>
                </li>
            )
        }else{
            if(field.FieldKey=='Language'){
                var LanType = '';
                switch(field.FieldResult){
                    case 1: LanType = '中文(简体)';break;
                    case 2: LanType = '英文';break;
                    case 3: LanType = '中文(繁体)';break;
                    default: LanType = '中文(简体)';
                }
                detailMes.push(                                  //路人甲集合
                    <li key={index}>
                        <span>{field.FieldName}：</span>
                        <span>{LanType}</span>
                    </li>
                )
            }else{
                detailMes.push(                                  //路人甲集合
                    <li key={index}>
                        <span>{field.FieldName}：</span>
                        <span dangerouslySetInnerHTML={{__html:field.FieldResult}}></span>
                    </li>
                )
            }
        }
    });

    userSetSort.map(function(val,index){
        userSetArr.push(userSetSet[val]);
    })
    detailMes=userSetArr.concat(detailMes);
    detailMes=detailMes.concat(singleSet);

    var name = value.Name||value.Account;
    var examClassName = !this.props.SendEmailRight?'vaild':'';
    if(this.props.SendEmailRight){
        var examItem = (<a href="javascript:void(0)" className={examClassName} onClick={this.handleSend}>
                            <i className="cpf-icon-spin_sent" />
                            <span>发送测评</span></a>)
    }else{
        var examItem = '';
    }
    var singleClass = !this.props.SendEmailRight?'singleItem':'';

    var iContent=[];
    if(smsStatus)
      iContent.push(<i className={smsStatus}></i>);
    if(emailStatus)
      iContent.push(<i className={emailStatus}></i>);

    var itemHead=value.select?'item-head bgcolor':'item-head';
    var itemContain=value.select?'item-contain bgcolor':'item-contain';
    var isTipShow = this.state.isWarnTip ?'tipWrap show':'tipWrap hide';

    return (
        <li className={classname}>
            <div className={itemHead}>
                <div className="cui-checkboxContainer inline" onClick={this.handleSelect}>
                    <input type="checkbox" checked={value.select}/>
                    <label>
                        <i></i>
                        <span className="sp1">{name}</span>
                        {gender}
                    </label>
                </div>
                <div className="status" >
                    <i className="cpf-icon-center_ic-_arrowdown arrow" onClick={this.handleSilde} />
                    {iContent}
                    <span className="value">{examStatus}</span>
                    <span className="title">状态：</span>
                </div>
            </div>
            <div className={itemContain}>
                <div className="hide">
                    <ul>
                        <li key="0">
                            <span>帐号：</span>
                            <span>{value.Account}</span>
                        </li>
                        <li key="1">
                            <span>密码：</span>
                            <span>{value.Password}</span>
                        </li>
                    </ul>
                </div>
                <div className="show">
                    <ul>
                        <li key="0">
                            <span>帐号：</span>
                            <span>{value.Account}</span>
                        </li>
                        <li key="1">
                            <span>密码：</span>
                            <span>{value.Password}</span>
                        </li>
                        {detailMes}
                    </ul>
                    <div className="btn">
                        {examItem}
                        <a href="javascript:void(0)" className={singleClass} onClick={this.editAccount}>
                            <i className="cpf-icon-change" />
                            <span>修改</span></a>
                    </div>
                </div>
            </div>
        </li>
    )
}

module.exports = render;
