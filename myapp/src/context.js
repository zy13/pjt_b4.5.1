import {createContext} from 'react'
const context = createContext()
const {Provider, Consumer} = context

console.log(context);
console.log(Provider);
console.log(Consumer);

export {
  Provider, Consumer
}
export default context