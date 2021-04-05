import { useCallback } from 'react'

import useTaco from './useTaco'
import { useWallet } from 'use-wallet'

import { unstake, getMasterChefContract } from '../taco/utils'

const useUnstake = (pid) => {
  const { account } = useWallet()
  const taco = useTaco()
  const masterChefContract = getMasterChefContract(taco)

  const handleUnstake = useCallback(
    async (amount) => {
      const txHash = await unstake(masterChefContract, pid, amount, account)
      console.log(txHash);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [account, pid, taco, masterChefContract],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
