import { Component } from "react";
import ReactDOM from 'react-dom'

class Count extends Component {
  state = {
    count: 1
  }
  static getDerivedStateFromProps(props, state) {
    // 返回值就是要关联进 state 中的数据
    console.log('getDerivedStateFromProps',props);
    return props
  }
  shouldComponentUpdate() {
    // 判断是否更新 true 组件更新 false 不再继续执行更新 
    console.log('shouldComponentUpdate-是否需要更新');
    return true
  }
  render() {
    // 渲染虚拟DOM到真实DOM上
    const { count } = this.state
    console.log('Coun--render', this.state);
    return <div>
      <div id="count">{count}</div>
      <button onClick={()=>{
        this.setState({
          count: count + 1
        })
      }}>递增</button>
    </div>
  }
  getSnapshotBeforeUpdate(prevProps,prevState){
    // 获取更新前的DOM快照, 
    // 必须有一个返回值，返回值会变成 componentDidUpdate 的 pervDOM 参数
    // 必须和 componentDidUpdate 一块使用
    console.log('getSnapshotBeforeUpdate-获取更新前的DOM快照');
    return document.querySelector("#count").innerHTML;
  }
  componentDidUpdate(prevProps,prevState,pervDOM) {
    // 组件更新完成 处理副作用 异步请求 dom操作
    console.log('componentDidUpdate-组件更新完成 ');
    console.log(prevProps,prevState,pervDOM);
  }
}

class App extends Component{
  state = {
    show: true
  }
  render() {
    const { show } = this.state
    return <div>
      {
        // 触发组件的挂载
        show?<Count show={show}/>:''
      }
      <button onClick={()=>{
        this.setState({
          show: !show
        })
      }}>显示/隐藏</button>
    </div>
  }
}

ReactDOM.render(
  <App/>,
  document.querySelector('#root')
)