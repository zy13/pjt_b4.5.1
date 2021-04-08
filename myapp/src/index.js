import { Component } from "react";
import ReactDOM from 'react-dom'
import './css/index.css'

class Todo extends Component{
  constructor(props) {
    super(props)
    this.state = {
      isEdit: false,
      title2: props.todo.title
    }
  }
  render() {
    const {id, title, done} = this.props.todo
    const {isEdit, title2} = this.state
    console.log(this.props);
    return <li className={isEdit?'editing':''}>
      <div className={`todo ${done?'done':''}`}>
        <div className="display">
          <input className="check" type="checkbox" checked={done} onChange={({target})=>{
            this.props.changeDone(id, target.checked)
          }}/>
          <div className="todo-content" onDoubleClick={()=>{
            this.setState({
              isEdit: true
            })
          }}>{title}</div>
          <span className="todo-destroy" onClick={()=>{
            this.props.removeTodo(id)
          }}></span>
        </div>
        <div className="edit">
          <input className="todo-input" type="text" value={title2} onChange={({target})=>{
            this.setState({
              title2: target.value
            })
          }} onBlur={()=>{
            if(title2.trim()) {
              this.props.editTitle(id, title2)
            } else {
              this.setState({
                title2: title
              })
            }
            this.setState({
              isEdit: false
            })
          }}/>
        </div>
      </div>
    </li>
  }
}

class Todos extends Component{
  render() {
    const {todos} = this.props
    return <ul id="todo-list">
      {
        todos.map(todo => {
          return <Todo {...this.props} todo={todo}  key={todo.id}/>
        })
      }
    </ul>
  }
}
class AddTodo extends Component{
  render() {
    return <div id="create-todo">
      <input id="new-todo" placeholder="What needs to be done?" type="text" onKeyDown={(e)=>{
        const {target, keyCode} = e
        const val = target.value
        if(keyCode === 13) {
          // 回车
          if(val.trim()) {
            this.props.addTodo(val)
            target.value = ''
          } else {
            alert('请输入内容')
            this.focus()
          }          
        }
      }}/>
    </div>
  }
}

class Stats extends Component{
  render() {
    const {todos} = this.props
    const doneLen = todos.filter(item => item.done).length
    const unDoneLen = todos.length - doneLen
    console.log(doneLen, unDoneLen);
    return <div id="todo-stats">
      <span className="todo-count">
        <span className="number">{unDoneLen}</span>
        <span className="word">项待完成</span>
      </span>
      <span className="todo-clear">
        <a>Clear <span>{doneLen}</span> 已完成事项</a>
      </span>
    </div>
  }
}

class App extends Component{
  state = {
    todos: [
      {
        id: 1,
        title: '今晚上王者',
        done: false
      }
    ]
  }
  addTodo = (title) => {
    const {todos} = this.state
    this.setState({
      todos: [
        ...todos,
        {
          id: new Date(),
          done: false,
          title
        }
      ]
    })
  }
  removeTodo = (id) => {
    const {todos} = this.state
    this.setState({
      todos: todos.filter(item => item.id !== id)
    })
  }
  changeDone = (id, done) => {
    console.log(id, done);
    const {todos} = this.state
    this.setState({
      todos: todos.map(item => {
        if(item.id === id) {
          return {
            ...item,
            done
          }
        } else {
          return item
        }
      })
    })
  }
  editTile = (id, title) =>{
    const {todos} = this.state
    this.setState({
      todos: todos.map(item => {
        if(item.id === id) {
          return {
            ...item,
            title
          }
        } else {
          return item
        }
      })
    })
  }
  render() {
    const {todos} = this.state
    return <div id="todoapp">
      <div className="title">
        <h1>todo</h1>
      </div>
      <div className="content">
        <AddTodo addTodo={this.addTodo}/>
        <Todos todos={todos} removeTodo={this.removeTodo} changeDone={this.changeDone} editTitle={this.editTile}/>
        <Stats todos={todos}/>
      </div>
    </div>
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
)

