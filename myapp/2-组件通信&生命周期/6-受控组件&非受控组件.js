import { Component, PureComponent } from "react";
import ReactDOM from  'react-dom'
import context, {Provider} from './context'

class AddTodo extends Component{
  static contextType = context
  state = {
    title: '',
    user: ''
  }
  render() {
    const {addTodo} = this.context
    const {title, user} = this.state
    console.log('add', this.context);
    return <div>
      <input type="text" value={title}  onChange={({target})=>{
        this.setState({
          title: target.value
        })
      }} />
      <input type="text" value={user}  onChange={({target})=>{
        this.setState({
          user: target.value
        })
      }} />
      <button onClick={()=>{
        addTodo(this.state)
        this.setState({
          title: '',
          user: ''
        })
      }}>添加todo</button>
    </div>
  }
}

class Todo extends Component {
  static contextType = context
  render() {
    const {removeTodo} = this.context
    const {todo} = this.props
    return <li>
      {todo.title} -- {todo.user}
      <button onClick={()=>{
        removeTodo(todo)
      }}>删除</button>
    </li>
  }
}

class Todos extends Component {
  static contextType = context
  render() {
    const {todos} = this.context
    console.log(this.context);
    console.log(todos);
    return <ul>
      {todos.map((todo,index) => {
        return <Todo key={index} todo={todo}/>
      })}
    </ul>
  }
}

class App extends Component {
  state = {
    todos: [],
  }
  addTodo = (todo) => {
    let {todos} = this.state
    this.setState({
      todos: [
        ...todos,
        todo
      ]
    })
  }
  removeTodo = (todo) => {
    const {todos} = this.state
    this.setState({
      todos: todos.filter(item => item !== todo)
    })
  }
  render() {
    const {todos} = this.state
    return <Provider value={{
      todos: todos,
      addTodo: this.addTodo,
      removeTodo: this.removeTodo
    }}>
      <AddTodo/>
      <Todos />
    </Provider>
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
)