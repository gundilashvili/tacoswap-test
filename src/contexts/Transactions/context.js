import { createContext } from 'react'



export default createContext({
  transactions: {},
  onAddTransaction: (tx) => {},
})
