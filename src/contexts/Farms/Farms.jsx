import React, { useState } from 'react'

import useTaco from '../../hooks/useTaco'

import { getFarms } from '../../taco/utils'

import useAllStakedValue from '../../hooks/useAllStakedValue'

import Context from './context'

const Farms = ({ children }) => {
  const [unharvested] = useState(0)

  const taco = useTaco()

  const farms = getFarms(taco)

  const orders = farms.map(({ pid }) => pid);

  const stakedValue = useAllStakedValue(taco).sort((a, b) => {
    return orders.indexOf(a.pid) - orders.indexOf(b.pid);
  });

  return (
    <Context.Provider
      value={{
        farms,
        unharvested,
        stakedValue,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Farms
