import { useContext } from 'react'
import { Context } from '../contexts/TacoProvider'

const useBlock = () => {
  const { block } = useContext(Context)
  return block
}

export default useBlock
