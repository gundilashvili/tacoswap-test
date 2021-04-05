import { useContext } from 'react'
import { Context } from '../contexts/TacoProvider'

const useTacoBalance = () => {
  const { tacoBalance } = useContext(Context)
  return tacoBalance
}

export default useTacoBalance
