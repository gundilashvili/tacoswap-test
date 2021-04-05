import { useCallback } from 'react'
import useTaco from './useTaco'
import { useWallet } from 'use-wallet'
import { approve, getMasterChefContract } from '../taco/utils'

const useApprove = (lpContract) => {
  const { account } = useWallet()
  const taco = useTaco()
  const masterChefContract = getMasterChefContract(taco)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, masterChefContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, masterChefContract])

  return { onApprove: handleApprove }
}

export default useApprove
