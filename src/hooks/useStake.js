import { useCallback } from 'react'

import useTaco from './useTaco'
import { useWallet } from 'use-wallet'

import { stake, getMasterChefContract } from '../taco/utils'

const useStake = (pid) => {
  const { account } = useWallet()
  const taco = useTaco()

  const handleStake = useCallback(
    async (amount) => {
      const txHash = await stake(
        getMasterChefContract(taco),
        pid,
        amount,
        account,
      )
      console.log(txHash);
    },
    [account, pid, taco],
  )

  return { onStake: handleStake }
}

export default useStake
