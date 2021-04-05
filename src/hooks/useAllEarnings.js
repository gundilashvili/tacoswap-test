import { useCallback, useEffect, useState } from 'react'
import { useWallet } from 'use-wallet'
import { getEarned, getMasterChefContract, getFarms } from '../taco/utils'
import useTaco from './useTaco'
import useBlock from './useBlock'

const useAllEarnings = () => {
  const [balances, setBalance] = useState([])
  const { account } = useWallet()
  const taco = useTaco()
  const farms = getFarms(taco)
  const masterChefContract = getMasterChefContract(taco)
  const block = useBlock()

  const fetchAllBalances = useCallback(async () => {
    const balances = await Promise.all(
      farms.map(({ pid }) =>
        getEarned(masterChefContract, pid, account),
      ),
    )
    setBalance(() => balances)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [masterChefContract?.options?.address, account])

  useEffect(() => {
    if (account && masterChefContract && taco) {
      fetchAllBalances()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [block, fetchAllBalances, !!taco])
  return balances
}

export default useAllEarnings
