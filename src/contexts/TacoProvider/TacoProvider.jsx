import Web3 from 'web3';
import React, { createContext, useEffect, useState } from 'react';
import { useWallet } from 'use-wallet';
import { Taco } from '../../taco';
import { getTacoAddress } from "../../taco/utils";
import { getBalance } from '../../utils/erc20';
import BigNumber from 'bignumber.js'

export const Context = createContext({
  taco: undefined,
})


const TacoProvider = ({ children }) => {
  const { ethereum, connect, account } = useWallet()
  const [taco, setTaco] = useState()
  const [tacoBalance, setTacoBalance] = useState(new BigNumber(0))
  const [block, setBlock] = useState(0)

  // @ts-ignore
  window.taco = taco
  // @ts-ignore
  window.eth = ethereum

  useEffect(() => {
    connect('injected');
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (account && taco) {
      getBalance(ethereum, getTacoAddress(taco), account).then((res) => {
        setTacoBalance(new BigNumber(res));
      });
    }
    // eslint-disable-next-line
  }, [!!taco, account, block])

  useEffect(() => {
    if (!ethereum) {
      return;
    }
    const web3 = new Web3(ethereum);
    web3.eth.getBlockNumber().then((n) => {
      setBlock(n);
    });
    const subscribtion = web3.eth.subscribe('newBlockHeaders', (err, { number, ...d }) => {
      if (number) {
        setBlock(number)
      }
    });
    return () => subscribtion.unsubscribe();
    // eslint-disable-next-line
  }, [!!ethereum])

  useEffect(() => {
    if (ethereum) {
      const chainId = Number(ethereum.chainId)
      const tacoLib = new Taco(ethereum, chainId, false, {
        defaultAccount: ethereum.selectedAddress,
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: '6000000',
        defaultGasPrice: '1000000000000',
        accounts: [],
        ethereumNodeTimeout: 10000,
      })
      setTaco(tacoLib)
      window.tacosauce = tacoLib
    } else {
      const tacoLib = new Taco(new Web3.providers.WebsocketProvider(
        // 'wss://mainnet.infura.io/ws/v3/7b7eeeff9340414dbacc2a037fe99473'
        //"wss://mainnet.infura.io/ws/v3/6539de7fc7054184bde9ed29cbda79ea"
        "wss://mainnet.infura.io/ws/v3/c998d1fb74e943429d9ea542673cb4f6"
      ), 1, false, {
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: '6000000',
        defaultGasPrice: '1000000000000',
        accounts: [],
        ethereumNodeTimeout: 60000,
      })
      setTaco(() => tacoLib)
      window.tacosauce = tacoLib
    }
    // eslint-disable-next-line
  }, [!!ethereum])

  return <Context.Provider value={{ taco, block, tacoBalance }}>{children}</Context.Provider>
}

export default TacoProvider
