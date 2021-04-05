import { createContext } from 'react'

const context = createContext({
  farms: [],
  unharvested: 0,
  stakedValue: [],
})

export default context
