import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class App extends Component {
  state = {
    obj: {
      count: 1,
      num: 2
    }
  }
  render() {
    const {count, num} = this.state.obj
    return <div>
      <div>{count}--{num}</div>
      <button onClick={()=>{
        // 浅拷贝（浅合并）
        this.setState({
          obj: {
            count: count + 2
          }
        })
      }}>递增</button>
      <button onClick={()=>{
        // 避免浅拷贝（浅合并）
        this.setState({
          obj: {
            ...this.state.obj,
            count: count + 2
          }
        })
      }}>递增1</button>
    </div>
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
)