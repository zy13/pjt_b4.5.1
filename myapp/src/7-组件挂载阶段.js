import { Component } from "react";
import ReactDOM from 'react-dom'

class Count extends Component {
  state = {
    count: 1
  }
  constructor(props) {
    super(props)
    console.log('Count初始化');
  }
  static getDerivedStateFromProps(props, state) {
    console.log(this); // undefied
    console.log(props, state);
    // 返回值就是要关联进 state 中的数据
    return props
  }
  render() {
    const { count } = this.state
    console.log('Coun--render', this.state);
    return <div>
      <div>{count}</div>
      <button onClick={()=>{
        this.setState({
          count: count + 1
        })
      }}>递增</button>
    </div>
  }
  componentDidMount() {
    console.log('组件挂载完成，可以请求异步接口获取数据');
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
  <App />,
  document.querySelector('#root')
)