import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getStaked, getMasterChefContract } from '../taco/utils'
import useTaco from './useTaco'
import useBlock from './useBlock'

const useStakedBalance = (pid) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account } = useWallet()
  const taco = useTaco()
  const masterChefContract = getMasterChefContract(taco)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getStaked(masterChefContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, pid, masterChefContract])

  useEffect(() => {
    if (account && taco) {
      fetchBalance()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, block, fetchBalance, !!taco])

  return balance
}

export default useStakedBalance
