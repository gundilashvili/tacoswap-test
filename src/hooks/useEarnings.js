import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { getEarned, getMasterChefContract } from '../taco/utils'
import useTaco from './useTaco'
import useBlock from './useBlock'

const useEarnings = (pid) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
  } = useWallet()
  const taco = useTaco()
  const masterChefContract = getMasterChefContract(taco)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getEarned(masterChefContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, masterChefContract, pid])

  useEffect(() => {
    if (account && masterChefContract && taco) {
      fetchBalance()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, block, masterChefContract, setBalance, taco])

  return balance
}

export default useEarnings
