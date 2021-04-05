import React, { useCallback, useEffect, useReducer } from 'react'

import Context from './context'
import reducer, {
  initialState,
  setTransactions,
  addTransaction,
} from './reducer'


const TransactionsProvider = ({ children }) => {
  const [{ initialized, transactions }, dispatch] = useReducer(reducer, initialState)

  const handleAddTransaction = useCallback((tx) => {
    dispatch(addTransaction(tx))
  }, [dispatch])

  const fetchTransactions = useCallback(async () => {
    try {
      const txsRaw = localStorage.getItem('transactions')
      const txs = JSON.parse(txsRaw) || {}
      dispatch(setTransactions(txs))
    } catch (e) {
      console.error(e)
    }
  }, [dispatch])

  useEffect(() => {
    if (initialized) {
      localStorage.setItem('transactions', JSON.stringify(transactions))
    }
  }, [initialized, transactions])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <Context.Provider value={{
      transactions,
      onAddTransaction: handleAddTransaction,
    }}>
      {children}
    </Context.Provider>
  )
}

export default TransactionsProvider