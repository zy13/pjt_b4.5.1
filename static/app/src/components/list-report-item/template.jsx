/**
* @Author: Jet.Chan
* @Date:   2016-09-05T10:10:30+08:00
* @Email:  guanjie.chen@talebase.com
* @Last modified by:   Jet.Chan
* @Last modified time: 2016-09-14T16:28:27+08:00
*/

/**
 * 公用头部
 */

var React = require('react');

var render = function() {
    var data = this.props.data;
    // 数据
    // 第一行，姓名（若无姓名则显示帐号）
    var name = data.Name || data.Account;
    // 第一行，帐号
    var account = data.Account
        ? '（' + data.Account + '）'
        : '';
    // 第一行，总体评价
    //     带匹配度   显示匹配度分值
    //     不带匹配度 显示星级
    var evaluate = [];
    if (data.MatchDegree) {
        evaluate = [
            '匹配度：',
            Math.round(data.MatchDegree),
            '%'
        ].join('');
    } else if (data.TotalAssess){
        var star = parseInt(data.TotalAssess);
        for (var i = 0; i < 5; i++) {
            var evaluateType = 'cpf-icon-ic_collect' + (i < star
                ? ' light'
                : '');
            evaluate.push(
                <i className={evaluateType} key={i}></i>
            );
        };
        evaluate.splice(0, 0, '总体评价：');
    };
    // 第二行
    // 能力（得分）、认知能力/商业推理、心理健康/任职风险、驱动力、性格。
    var infoMap = [
        'Ability,能力',
        'CognitiveAbility,认知',
        'BusinessReasoning,商业推理',
        'MentalHealth,心理健康',
        'PostRisk,任职风险',
        'OccupationForce,驱动力',
        'OccupationCharacter,性格'
    ];
    var info = infoMap.map(function(val, index, array) {
        var key = val.split(',');
        if (data[key[0]]) {
            // 数值加粗处理
            var value = isNaN(data[key[0]])
                ? data[key[0]]
                : <b>{data[key[0]]}</b>;
            return (
                <li key={index}>
                    <i>{key[1]}：</i>
                    <span>{value}</span>
                </li>
            );
        };
    });
    // console.log(info)
    // 用户自定义的值
    // 依次显示手机、邮箱、学校、专业，其他XXXX等其他字段
    // 不显示密码
    var userSet = [];
    var userSetSort = ['Mobile', 'Email', 'School', 'Major'];
    if (data.UserSet) {
        userSetSort.forEach(function(val, index, array) {
            data.UserSet.forEach(function(val2, index2, array2) {
                if (val2.FieldKey === val) {
                    userSet.push(
                        <li key={userSet.length} data-key={val2.FieldKey}>
                            <i>{val2.FieldName}：</i>{val2.FieldResult}</li>
                    );
                };
            });
        });
        data.UserSet.forEach(function(val, index, array) {
            var exist = userSetSort.some(function(val2, index2, array2) {
                return val2 === val.FieldKey;
            });
            if (!exist && val.FieldKey !== 'Password') {
                userSet.push(
                    <li key={userSet.length} data-key={val.FieldKey}>
                        <i>{val.FieldName}：</i>{val.FieldResult}</li>
                );
            };
        });
    };
    var userSetGroup = '';
    // console.log(userSet);
    if (userSet.length > 0) {
        userSetGroup = (
            <ul>{userSet}</ul>
        );
    }
    /*var userSet = data.UserSet.map(function(val, index, array) {
        return (<li key={index}><i>{val.FieldName}：</i>{val.FieldResult}</li>);
    });*/

    // UI
    var resultClass = 'pjt-result-item' + (this.state.isShow
        ? ' result-item-show'
        : '') + (this.props.select
        ? ' select'
        : '');
    var checkClass = 'checkbox float-left' + (this.props.select
        ? ' check'
        : '');
    var check = this.props.select
        ? true
        : false;

    return (
        <div className={resultClass}>
            <div className="result-item-cap">
                <label className={checkClass}>
                    <input type="checkbox" checked={check} onChange={this.handleSelect}/>
                    <i className="cpf-icon-ic_tick"></i>
                    <span>
                        <b>{name}</b>{account}</span>
                </label>
                <span className="evaluate float-left">{evaluate}</span>
                <span className="toggle" onClick={this.handleSlide}>
                    <i className="cpf-icon-center_ic-_arrowdown"></i>
                </span>
            </div>
            <div className="result-item-con">
                <ul>{info}</ul>
            </div>
            <div className="result-item-con result-item-con-hide">
                {userSetGroup}
                <div className="btns">
                    <a href="javascript:void(0)" onClick={this.handleExistReport.bind(this,data.UserExamId)}>查看报告</a>
                    <a href={'/' + this.props.domain + '/reportcenter/sendReportByEmail?ids=' + data.UserExamId}>推送报告</a>
                </div>
            </div>
        </div>
    )
}

module.exports = render;
