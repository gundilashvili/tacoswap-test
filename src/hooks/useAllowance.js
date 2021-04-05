import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import useTaco from './useTaco'
import { useWallet } from 'use-wallet'
import { getAllowance } from '../utils/erc20'
import { getMasterChefContract } from '../taco/utils'

const useAllowance = (lpContract) => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account } = useWallet()
  const taco = useTaco()
  const masterChefContract = getMasterChefContract(taco)

  const fetchAllowance = useCallback(async () => {
    const allowance = await getAllowance(
      lpContract,
      masterChefContract,
      account,
    )
    setAllowance(new BigNumber(allowance))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, masterChefContract?.options?.address, lpContract?.options?.address])

  useEffect(() => {
    if (account && masterChefContract && lpContract) {
      fetchAllowance()
    }
    let refreshInterval = setInterval(fetchAllowance, 10000)
    return () => clearInterval(refreshInterval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, fetchAllowance, lpContract?.options?.address])

  return allowance
}

export default useAllowance
