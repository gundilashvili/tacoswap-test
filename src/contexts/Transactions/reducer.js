
const ADD_TRANSACTION = 'ADD_TRANSACTION'
const RECEIVE_TX_RECEIPT = 'RECEIVE_TX_RECEIPT'
const SET_TRANSACTIONS = 'SET_TRANSACTIONS'




export const addTransaction = (transaction) => ({
  type: ADD_TRANSACTION,
  transaction,
})

export const receiveTxReceipt = (txHash, receipt) => ({
  type: RECEIVE_TX_RECEIPT,
  txHash,
  receipt,
})

export const setTransactions = (transactions) => ({
  type: SET_TRANSACTIONS,
  transactions,
})

export const initialState = {
  initialized: false,
  transactions: {}
}

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: {
          ...state.transactions,
          [action.transaction.hash]: action.transaction,
        }
      }
    case RECEIVE_TX_RECEIPT:
      return {
        ...state,
        transactions: {
          ...state.transactions,
          [action.txHash]: {
            ...state.transactions[action.txHash],
            receipt: action.receipt,
          }
        }
      }
    case SET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.transactions,
        initialized: true,
      }
    default:
      return state
  }
}

export default reducer