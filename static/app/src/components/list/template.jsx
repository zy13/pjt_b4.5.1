/**
 * 公用头部
 */

var React = require('react');
var ListProject = require('../list-project/index');
var ListError = require('../list-error/index');

var render = function() {
    var list;
    switch (this.props.type) {
        case 'list':
            list = <ListProject 
                domain={this.props.domain} 
                list={this.state.list} 
                totalCount={this.state.totalCount} 
                remainsCount={this.state.remainsCount} 
                pageIndex={this.state.pageIndex} 
                accountRight={this.state.accountRight} 
                reportRight={this.state.reportRight} 
                createRight={this.state.createRight} 
                callbackState={this.callbackState} 
            />;
            break;
        case 'error':
            list = <ListError type="error" />;
            break;
        case 'error-nodata':
            list = <ListError type="error-nodata" />;
            break;
        default:
            break;
    };
    return (
        <div className="pjt-list">{list}</div>
    )
}

module.exports = render;