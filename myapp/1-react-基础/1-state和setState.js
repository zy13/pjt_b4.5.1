import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class App extends Component {
  state = {
    num: 1
  }
  render() {
    let {num} = this.state
    console.log('render')
    return <div>
      <div>{num}</div>
      <button onClick={()=>{
        // updater - 对象
        this.setState({
          num: num + 2
        })
      }}>递增</button>
      <button onClick={()=>{
        // updater - function
        this.setState(()=>{
          return {
            num: num - 1
          }
        })
      }}>递减</button>
      <button onClick={()=>{
        // callback - 更新后执行回调函数
        // 只要调用setState都会触发组件更新
        this.setState(()=>{
          return {
            num: num
          }
        }, () => {
          console.log('更新完成')
        })
      }}>回调</button>
    </div>
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
)