import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class App extends Component {
  state = {
    count: 1,
    num: 2
  }
  render() {
    const {count, num} = this.state
    console.log('render');
    return <div>
      <div>{count}--{num}</div>
      <button onClick={()=>{
        // setState异步 - 触发了批量更新机制
        this.setState({
          num: num + 5
        })
        console.log('222', this.state.num)
         // 每个异步函数都会触发render
        setTimeout(()=>{
          // setState同步
          this.setState({
            count: num + 5
          })
          console.log('333', this.state.count)
        })
      }}>点击</button>
      <button onClick={()=>{
        // 同一个操作中，批量的setState操作，只触发一次render()
        // 触发了批量更新机制，setState为异步
        this.setState({
          count: count + 2
        })
        console.log(this.state.count)
        this.setState({
          count: count + 2
        })
        console.log(this.state.count)
        this.setState({
          num: num + 5
        })
        console.log(this.state.num)
        this.setState({
          num: num + 5
        })
        console.log(this.state.num)
      }}>count递增</button>
    </div>
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
)