import { Component } from "react";
import ReactDOM from 'react-dom';

class Count extends Component{
  state = {
    count: 1
  }
  render() {
    const { count } = this.state
    console.log('Coun--render', this.state);
    return <div>
      <div>{count}</div>
      <p id="size">{window.innerWidth}</p>
      <button onClick={()=>{
        this.setState({
          count: count + 1
        })
      }}>递增</button>
    </div>
  }
  componentDidMount() {
    window.onresize = () => {
      let size = document.querySelector('#size')
      size.innerHTML = window.innerWidth
    }
  }
  componentWillUnmount() {
    window.onresize = null;
    console.log('componentWillUnmount- 即将卸载组件');
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