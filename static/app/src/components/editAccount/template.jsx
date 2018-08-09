var React = require('react');

var render = function() {
    var fieldList = [];
    var self = this;
    var gender = '';
    var href="/accountCenter/index/"+this.props.projectId+'/'+this.props.subProjectId;

    this.state.fields.map(function(val, index) {
        var role = ((val.FieldKey == 'Mobile')
            ? 'tel;longest=20'
            : (val.FieldKey == 'Email')
                ? 'email;longest=60'
                : (val.FieldKey == 'IdentityNum')
                    ? 'isIdCardNo;longest=18'
                    : 'longest=100;notSpecialChar');
        var tip = ((val.FieldKey == 'Mobile' || val.FieldKey == 'Email')
            ? "请输入正确的"+ val.FieldName+'号码'
            : (val.FieldKey == 'IdentityNum'
                ? "请输入正确的"+ val.FieldName : " "));
        var placeholder = val.FieldName.length >= 20
            ? "请输入"+val.FieldName.slice(0,18)+'...'
            : "请输入" + val.FieldName;
        var type = (val.FieldKey == 'Mobile')
            ? 'tel':
            (val.FieldKey == 'Birthday')?'date': 'text';
        var excludeArr = ['Account', 'Password', 'Name'];

        if (excludeArr.indexOf(val.FieldKey) == -1 && val.FieldName != '性别') {
            if(val.FieldType == 'select'){
                var fildResults = [];
                var firo = 'FirstOption_'+val.FieldKey, firstRenderClass='';
                var spanObj = (<span className={firstRenderClass} ref={firo} data-value={val.FieldResult}>{val.FieldResult!=null?val.FieldResult:'--请选择--'}</span>);

                if (val.FieldKey!='Language') {
                    fildResults.push(
                        <option data-key=''>--请选择--</option>
                    )
                }

                val.FieldSelectResult.split(',').map(function(v,i){
                    fildResults.push(
                        <option data-key={v.split('$$')[0]} dangerouslySetInnerHTML={{__html:v.split('$$')[1]}}></option>
                    )
                });

                if(val.FieldResult!=null){
                    firstRenderClass='sel-value';

                    if(val.FieldKey!='Language'){
                        val.FieldSelectResult.split(',').map(function(v,i){
                            if(v.split('$$')[0]==val.FieldResult){
                                spanObj = (<span className={firstRenderClass} ref={firo} dangerouslySetInnerHTML={{__html:v.split('$$')[1]}}></span>)
                            }
                        });
                    }else{
                        if(val.FieldResult==0){
                            firstRenderClass = '';
                            spanObj = (<span className={firstRenderClass} ref={firo}>--请选择--</span>)
                        }else{
                            val.FieldSelectResult.split(',').map(function(v,i){
                                if(v.split('$$')[0]==val.FieldResult){
                                    spanObj = (<span className={firstRenderClass} ref={firo}>{v.split('$$')[1]}</span>)
                                }
                            });
                        }
                    }
                }

                fieldList.push(
                    <li key={index}>
                        <span>{val.FieldName}：</span>
                        <div className="cui-selectBoxContainer" data-rule={role} data-tips={tip}>
                            {spanObj}
                            <select ref={val.FieldKey} onChange={self.handleSelect}>
                                {fildResults}
                            </select>
                        </div>
                    </li>
                )
            }else{
                //出生日期
                if(val.FieldKey == 'Birthday'){
                    fieldList.push(
                        <li key={index}>
                            <span>{val.FieldName}：</span>
                            <div className="cui-datePickerContainer " data-language='zh'>
                                <span className={val.FieldResult!=null?'data-value placeholder':'placeholder'} ref={val.FieldKey}>{val.FieldResult!=null?val.FieldResult:'--请选择--'}</span>
                            </div>
                        </li>
                    )
                }else{
                    var vfname = '';
                    vfname = val.FieldName.length>20 ? val.FieldName.slice(0,18)+'...' : val.FieldName
                    fieldList.push(
                        <li key={index}>
                            <span>{vfname}：</span>
                            <div className="cui-textBoxContainer" data-rule={role}>
                                <input type={type} placeholder={placeholder} defaultValue={val.FieldResult} data-special='<[a-zA-Z]+|<!|<\/|<\\|&#' data-tip='不能输入下列任何字符组合：&#、<加字母、<!、</' ref={val.FieldKey}/>
                            </div>
                        </li>
                    )
                }
            }
        }
        //处理性别
        if (val.FieldName == '性别') {
            gender = (
                <li>
                    <span>性别：</span>
                    <div className="cui-radioGroupContainer" data-rule="">
                        <div className="sel-radio">
                            <label>
                                <input type="radio" name="gender" value='1' onChange={self.handleRadio} checked={self.state.gender==1}/>
                                <span>男</span>
                            </label>
                            <label>
                                <input type="radio" name="gender" value='2' onChange={self.handleRadio} checked={self.state.gender==2}/>
                                <span>女</span>
                            </label>
                        </div>
                    </div>
                </li>
            )
        }
    })
    var sureBtn = !this.state.edit?'vaild':'';

    return (
        <div className="addacount">
            <p className="header">
                您共剩余：
                <span>8888</span>T币可用，当前产品可开通
                <span>888</span>个帐号。
            </p>
            <div className="contain">
                <ul className="form firstul">
                    <li>
                        <span><span className="red-color">*&nbsp;</span>帐号：</span>
                        <span>{this.state.message.Account}</span>
                    </li>
                    <li>
                        <span><span className="red-color">*&nbsp;</span>密码：</span>
                        <div className="cui-textBoxContainer" data-rule="required;notCjk;longest=30;shortest=6;notSpecialChar">
                            <input type="text" placeholder="请输入密码" ref="Password" defaultValue={this.state.message.Password} data-special='<[a-zA-Z]+|<!|<\/|<\\|&#' data-tip='不能输入下列任何字符组合：&#、<加字母、<!、</'/>
                        </div>
                    </li>
                </ul>
                <ul className="form">
                    <li>
                        <span>姓名：</span>
                        <div className="cui-textBoxContainer" data-rule="longest=100;notSpecialChar">
                            <input type="text" placeholder="请输入姓名" ref="Name" defaultValue={this.state.message.Name} data-special='<[a-zA-Z]+|<!|<\/|<\\|&#' data-tip='不能输入下列任何字符组合：&#、<加字母、<!、</'/>
                        </div>
                    </li>
                    {gender}
                    {fieldList}
                </ul>
                <div className="btn">
                    <a href={href}>取消</a>
                    <a href="javascript:void(0);" className={sureBtn} onClick={this.add}>确定</a>
                </div>
            </div>
        </div>
    )
}

module.exports = render;
