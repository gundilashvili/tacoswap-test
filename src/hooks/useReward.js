import { useCallback } from 'react'

import useTaco from './useTaco'
import { useWallet } from 'use-wallet'

import { harvest, getMasterChefContract } from '../taco/utils'

const useReward = (pid) => {
  const { account } = useWallet()
  const taco = useTaco()
  const masterChefContract = getMasterChefContract(taco)

  const handleReward = useCallback(async () => {
    const txHash = await harvest(masterChefContract, pid, account)
    return txHash
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, pid, taco])

  return { onReward: handleReward }
}

export default useReward
