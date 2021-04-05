import React from 'react'
import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import logoEthereum from '../assets/img/logos/logos_ethereum.svg'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

// const GAS_LIMIT = {
//   STAKING: {
//     DEFAULT: 200000,
//     SNX: 850000,
//   },
// }

export const getMasterChefAddress = (taco) => {
  return taco && taco.masterChefAddress
}
export const getTacoAddress = (taco) => {
  return taco && taco.tacoAddress
}
export const getWethContract = (taco) => {
  return taco && taco.contracts && taco.contracts.weth
}

export const getMasterChefContract = (taco) => {
  return taco && taco.contracts && taco.contracts.masterChef
}
export const getTacoContract = (taco) => {
  return taco && taco.contracts && taco.contracts.taco
}

export const getFarms = (taco) => {
  return taco
    ? taco.contracts.pools.map(
      ({
        pid,
        name,
        symbol,
        icon,
        quoteIcon = <img src={logoEthereum} style={{ maxWidth: '100%' }} alt="Tacoswap.io" />,
        tokenAddress,
        quoteTokenAddress,
        tokenSymbol,
        quoteTokenSymbol = 'ETH',
        tokenContract,
        quoteTokenContract,
        lpAddress,
        lpContract,
        active,
        price,
      }) => ({
        pid,
        id: symbol,
        name,
        lpToken: symbol,
        lpTokenAddress: lpAddress,
        lpContract,
        tokenAddress,
        quoteTokenAddress,
        tokenSymbol,
        tokenContract,
        quoteTokenContract,
        quoteTokenSymbol,
        earnToken: 'TACO',
        earnTokenAddress: taco.contracts.taco.options.address,
        icon,
        quoteIcon,
        active,
        price,
      }),
    )
    : []
}

export const getPoolWeight = async (masterChefContract, pid) => {
  const { allocPoint } = await masterChefContract.methods.poolInfo(pid).call()
  const totalAllocPoint = await masterChefContract.methods
    .totalAllocPoint()
    .call()
  return new BigNumber(allocPoint).div(new BigNumber(totalAllocPoint))
}

export const getEarned = async (masterChefContract, pid, account) => {
  return masterChefContract.methods.pendingTaco(pid, account).call()
}

export const getTotalLPWethValue = async (
  masterChefContract,
  lpContract,
  tokenContract,
  quoteTokenContract,
  pid,
  price,
) => {
  const balance = await lpContract.methods
    .balanceOf(masterChefContract.options.address)
    .call().then((n) => new BigNumber(n));

  const notLP = tokenContract.options.address === lpContract.options.address;
  const tokenAmountWholeLP = await tokenContract.methods
    .balanceOf(lpContract.options.address)
    .call();
  const quoteTokenAmountWholeLP = await quoteTokenContract.methods
    .balanceOf(lpContract.options.address)
    .call();
  const tokenDecimals = await tokenContract.methods.decimals().call();
  const quoteTokenDecimals = await quoteTokenContract.methods.decimals().call();
  const totalSupply = await lpContract.methods.totalSupply().call()
    .then((n) => new BigNumber(n));
  const lpContractWeth = await quoteTokenContract.methods
    .balanceOf(lpContract.options.address)
    .call().then((n) => new BigNumber(n));

  // Convert that into the portion of total lpContract = p1
  // Get total weth value for the lpContract = w1
  // Return p1 * w1 * 2
  const portionLp = new BigNumber(balance).div(totalSupply)
  const totalLpWethValue = portionLp.times(lpContractWeth).times(new BigNumber(2))
  // Calculate
  const baseTokenAmount = (notLP ? new BigNumber(await tokenContract.methods
    .balanceOf(masterChefContract.options.address)
    .call()) : new BigNumber(tokenAmountWholeLP).times(portionLp))
    .div(new BigNumber(10).pow(tokenDecimals))

  const quoteTokenAmount = new BigNumber(quoteTokenAmountWholeLP)
    .times(portionLp)
    .div(new BigNumber(10).pow(quoteTokenDecimals))

  return {
    pid,
    baseTokenAmount,
    quoteTokenAmount,
    totalLPTokenStaked: balance.div('1e18'),
    tokenAmountWholeLP: new BigNumber(tokenAmountWholeLP).div('1e18'),
    quoteTokenAmountWholeLP: new BigNumber(quoteTokenAmountWholeLP).div('1e18'),
    lpWethWorth: lpContractWeth.div('1e18'),
    totalWethValue: notLP ? new BigNumber(price).times(baseTokenAmount) : totalLpWethValue.div(new BigNumber(10).pow(18)),
    tokenPriceInWeth: notLP ? new BigNumber(price).times(totalSupply).div(tokenAmountWholeLP) : quoteTokenAmount.div(baseTokenAmount),
    poolWeight: await getPoolWeight(masterChefContract, pid),
  }
}

export const approve = async (lpContract, masterChefContract, account) => {
  return lpContract.methods
    .approve(masterChefContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export const getTacoSupply = async (taco) => {
  const burned = new BigNumber(250);  
  return new BigNumber(await taco.contracts.taco.methods.totalSupply().call()).minus(burned.multipliedBy(new BigNumber(10).pow(18))); 
}

export const stake = async (masterChefContract, pid, amount, account) => {
  return masterChefContract.methods
    .deposit(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const unstake = async (masterChefContract, pid, amount, account) => {
  return masterChefContract.methods
    .withdraw(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}
export const harvest = async (masterChefContract, pid, account) => {
  return masterChefContract.methods
    .deposit(pid, '0')
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const getStaked = async (masterChefContract, pid, account) => {
  try {
    const { amount } = await masterChefContract.methods
      .userInfo(pid, account)
      .call()
    return new BigNumber(amount)
  } catch {
    return new BigNumber(0)
  }
}

export const redeem = async (masterChefContract, account) => {
  return masterChefContract.methods
    .exit()
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    });
}
