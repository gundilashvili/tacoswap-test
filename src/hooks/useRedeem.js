import { useCallback } from 'react'
import { useWallet } from 'use-wallet'
import { redeem } from '../taco/utils'

const useRedeem = (masterChefContract) => {
  const { account } = useWallet()

  const handleRedeem = useCallback(async () => {
    const txHash = await redeem(masterChefContract, account)
    return txHash
  }, [account, masterChefContract])

  return { onRedeem: handleRedeem }
}

export default useRedeem
