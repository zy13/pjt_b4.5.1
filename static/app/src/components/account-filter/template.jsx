var React = require('react');
var render = function() {
    var self = this;
    var data=[
        {
            name:'测评状态',
            data:['全部','未开始','答题中','已完成']
        },
        {
            name:'邮件发送状态',
            data:['全部','等待发送','发送成功','发送失败']
        },
        {
            name:'短信发送状态',
            data:['全部','等待发送','发送成功','发送失败']
        }
    ]
    var list=[];
    data.map(function(v,i){
        var item=[];
        v.data.map(function(k,j){
            var classname=(j==self.props.status[i])?'active':'';
            item.push(
                <a key={k} className={classname} href="javascript:void(0);" onClick={self.handleClick}>{k}</a>
            )
        })
        list.push(
            <li key={i}>
                <p className="title">{v.name}</p>
                {item}
            </li>
        )
    })
    var filterclass=this.props.filterclass?'filter active':'filter';
    return (
        <div className="account-filter">
            <div className="fil-header" onClick={this.filterClick}>
                <i className="cpf-icon-screen"/>
                <span>筛选</span>
            </div>
            <div className={filterclass}>
                <div className="mask" onClick={this.filterClick}></div>
                <div className="fil-contain">
                    <div className="head">筛选</div>
                    <ul>{list}</ul>
                    <div className="btn">
                        <a href="javascript:void(0);" onClick={this.filterClick}>取消</a>
                        <a href="javascript:void(0);" onClick={this.search}>确定</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

module.exports = render;
