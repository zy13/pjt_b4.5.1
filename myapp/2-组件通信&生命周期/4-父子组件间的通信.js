import { Component } from "react";
import ReactDOM from 'react-dom'
import datas from './data.js'

import './css/index.css'

class Menu extends Component{
  changeShowName = () => {
     const { name, showName, handleChange } = this.props
     handleChange(name===showName?"":name)
  }
  render() {
    const {data, name, showName} = this.props
    return <dl className={`friend-group ${name===showName?"expanded":''}`}>
      <dt onClick={this.changeShowName}>{data.title}</dt>
      {data.list.map((item,index) => {
        return <dd key={index}>{item.name}</dd>
      })}
    </dl>
  }
}

class App extends Component{
  state = {
    showName: ''
  }
  handleChange = (name) => {
    console.log(name);
    this.setState({
      showName: name
    })
  }
  render() {
    const {showName} = this.state
    return <div className="friend-list">
      {Object.keys(datas).map(key => {
        return <Menu data={datas[key]} showName={showName} handleChange={this.handleChange} name={key} key={key}/>
      })}
    </div>
  }
}

ReactDOM.render(
  <App/>,
  document.querySelector('#root')
)