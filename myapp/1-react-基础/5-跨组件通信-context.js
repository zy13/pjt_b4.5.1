import {Component} from 'react'
import ReactDOM from 'react-dom'
import context, {Provider, Consumer} from './context'

// 通过 contextType 接收数据
class Name extends Component{
  static contextType = context
  render() {
    const {name} = this.context
    return <>
      <p>{name}</p>
    </>
  }
}

// 通过 Consumer 组件接收数据
class Age extends Component{
  render() {
    return <Consumer>
      {({age})=>{
        return <p>{age}</p>
      }}
    </Consumer>
  }
}

// 父组件通过 Provider 给后代组件传递数据
class Container extends Component{
  render() {
    return <>
      <Name></Name>
      <Age></Age>
    </>
  }
}

class App extends Component{
  render() {
    return <Provider value={
          {
            name: 'zy',
            age: 18
          }
        }>
      <Container/>
    </Provider>
  }
}

ReactDOM.render(
  <App/>,
  document.querySelector('#root')
)