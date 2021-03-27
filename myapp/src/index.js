import { Component } from "react";
import ReactDOM from 'react-dom'
import context, {Provider} from './context'
import './css/index1.css'


class Message extends Component {
  static contextType = context
  render() {
    const {removeMessage} = this.context
    const {msg} = this.props
    return <li>
      <h3>{msg.title}</h3>
      <p>{msg.content}</p>
      <a onClick={()=>{
        removeMessage(msg)
      }}>删除</a>
    </li>
  }
}

class MessageList extends Component{
  static contextType = context
  render() {
    const {messageList} = this.context
    console.log(messageList);
    return <ul className="messageList">
      {messageList.map((msg,index) => {
        return <Message msg={msg} key={index}/>
      })}
    </ul>
  }
}

class AddMessage extends Component{
  state = {
    title: '',
    content: ''
  }
  static contextType = context
  render() {
    const {addMessage} = this.context
    const {title, content} = this.state
    return  <div className="addMessage">
      <input value={title} onChange={({target})=>{
        this.setState({
          title: target.value
        })
      }} type="text" placeholder="请输入昵称" />
      <textarea value={content} onChange={({target})=>{
        this.setState({
          content: target.value
        })
      }} placeholder="请输入留言"></textarea>
      <button onClick={()=>{
        addMessage(this.state)
        this.setState({
          title: '',
          content: ''
        })
      }}>提交留言</button>
    </div>
  }
}

class App extends Component{
  state = {
    messageList: []
  }
  addMessage = (msg) => {
    const {messageList} = this.state
    this.setState({
      messageList: [
        ...messageList,
        msg
      ]
    })
  }
  removeMessage = (msg) => {
    const {messageList} = this.state
    this.setState({
      messageList: messageList.filter(msgItem => msgItem !== msg)
    })
  }
  render() {
    const {messageList} = this.state
    return <Provider value={
      {
        messageList: messageList,
        addMessage: this.addMessage,
        removeMessage: this.removeMessage
      }
    }>
      <section className="wrap">
        <h2 className="title">留言板</h2>
        <AddMessage />
        <MessageList />
      </section>
    </Provider>
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
)