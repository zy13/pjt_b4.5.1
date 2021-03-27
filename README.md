# 组件通信 & 组件生命周期

## state和setState

 - state中的状态只能通过setState修改
 - 只要调用setState方法都会触发组件更新

### setState的浅拷贝
setState的拷贝与Object.assign一样，都是浅拷贝

### 批量更新机制 - setState同步or异步？

- 正常情况下，一次或者多次调用setState都会触发批量更新，此时setState是异步函数
- 用异步函数封装setState方法的调用时，setState是同步的

## 组件间的通信

### 父子组件间的通信

- **props** 父组件向子组件传递数据
- 父组件向子组件传递方法
  - 给子组件处理业务逻辑
  - 子组件将处理后的数据，通过该方法传给父组件
  - 父组件通过该方法，拿到子组件传过来的数据

### 父组件向后代组件传递数据

react核心库中有一个**createContext**方法，用来创建组件上下文对象<br>
`import {createContext} from 'react' `

**createContext**可以创建一个**context**<br>
`const context = createContext()`

**context**对象包含两个**Provider, Consumer**组件
`const {Provider, Consumer} = context`

- **Provider 组件**
 - 通过**value**属性向子代组件传递数据
 ```js
 <Provider value={{
   data: this.state.data,
   addMsg: this.addMsg
 }}
  <AddMessage></AddMessage>
  <MessageList></MessageList>
 </Provider>
 ```
- **Consumer 组件**
  - 获取祖先组件的数据
  - 该组件提供一个函数，函数的参数为父组件传过来的数据
  ```js
  <Consumer>
    // 解构出data
    {({data})=>{
      <ul>
        {
          data.map((msg) =>{
            <Message msg={msg}>
          })
        }
      </ul>
    }}
  </Consumer>
  ```

- static ContextType

子组件中定义静态属性**ContextType**，并将**context**对象赋值给**ContextType**，就可以通过`this.context`获取祖先组件的数据

## 受控组件和非受控组件

### 受控组件

- 表单中的value值和state中的状态绑定，并且要使用onChange组件进行setState状态修改

### 非受控组件

- 表单value值不与state状态绑定，不调用onChange事件，为只读
- 使用默认值**defaultValue**或者**defaultChecked**可以编辑

## 组件生命周期

### 挂载阶段
  - 组件实例化/初始化
  - 虚拟DOM渲染到真实DOM中
  - 涉及到的钩子，按顺序：
    - constructor(props) - 初始化 
    - static getDerivedStateFromProps(props) - 将props的数据关联到state中
    - render - 渲染虚拟DOM
    - componentDidMount - 挂载完成
### 更新阶段
  - 触发组件更新的机制：
    - 调用setState方法
    - 父组件更新，子组件也会更新
    - 使用强制更新钩子 forceUpdate
  - 相关钩子，按顺序：
    - state getDerivedStateFromProps - 将props的数据关联到state中
    - shouldComponentUpdate(nextProps,nextState) - 判断是否更新
    - render - 渲染虚拟DOM
    - getSnapshotBeforeUpdate(prevProps,prevState) - 获取更新前的DOM快照，其返回值会变成 componentDidUpdate 的 pervDOM 参数
    - componentDidUpdate(prevProps,prevState,pervDOM) - 组件更新完成 异步请求 操作dom

### 卸载阶段
  - 从组件准备卸载，到将组件从真实DOM中删除
   - componentWillUnmount - 组件即将卸载