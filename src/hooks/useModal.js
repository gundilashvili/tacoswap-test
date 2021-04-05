import { useCallback, useContext } from 'react'
import { Context } from '../contexts/Modals'
import {useScrollingElement} from "./useScrollingElement";

const useModal = (modal, key) => {
  const { onDismiss, onPresent, isOpen } = useContext(Context)

  const handlePresent = useCallback(() => {
    onPresent(modal, key)
  }, [key, modal, onPresent])
  useScrollingElement(isOpen)
  return [handlePresent, onDismiss]
}

export default useModal
