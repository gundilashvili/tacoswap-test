import { useEffect, useState } from 'react'
import { BigNumber } from '../taco'

import useBlock from './useBlock'

const useAllStakedValue = (taco) => {
  const [balances, setBalances] = useState([])
  const block = useBlock()

  const fetchAllStakedValue = async () => {
    const d = await fetch('https://api.tacoswap.io/pools').then((r) => r.json()).then(r => r.map((d) => ({
      ...d,
      baseTokenAmount: new BigNumber(d.baseTokenAmount),
      quoteTokenAmount: new BigNumber(d.quoteTokenAmount),
      baseTokenAmountWholeLP: new BigNumber(d.baseTokenAmountWholeLP),
      quoteTokenAmountWholeLP: new BigNumber(d.quoteTokenAmountWholeLP),
      totalLPTokenStaked: new BigNumber(d.totalLPTokenStaked),
      lpWethWorth: new BigNumber(d.lpWethWorth),
      totalWethValue: new BigNumber(d.totalWethValue),
      tokenPriceInWeth: new BigNumber(d.tokenPriceInWeth),
    })));
    setBalances(d);
  }

  useEffect(() => {
    fetchAllStakedValue();
    // eslint-disable-next-line
  }, [block])
  return balances
}

export default useAllStakedValue
