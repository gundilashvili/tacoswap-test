import BigNumber from 'bignumber.js/bignumber' 
export const SUBTRACT_GAS_LIMIT = 100000

const ONE_MINUTE_IN_SECONDS = new BigNumber(60)
const ONE_HOUR_IN_SECONDS = ONE_MINUTE_IN_SECONDS.times(60)
const ONE_DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS.times(24)
const ONE_YEAR_IN_SECONDS = ONE_DAY_IN_SECONDS.times(365)

export const INTEGERS = {
  ONE_MINUTE_IN_SECONDS,
  ONE_HOUR_IN_SECONDS,
  ONE_DAY_IN_SECONDS,
  ONE_YEAR_IN_SECONDS,
  ZERO: new BigNumber(0),
  ONE: new BigNumber(1),
  ONES_31: new BigNumber('4294967295'), // 2**32-1
  ONES_127: new BigNumber('340282366920938463463374607431768211455'), // 2**128-1
  ONES_255: new BigNumber(
    '115792089237316195423570985008687907853269984665640564039457584007913129639935',
  ), // 2**256-1
  INTEREST_RATE_BASE: new BigNumber('1e18'),
}

export const addressMap = {
  uniswapFactory: '0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95',
  uniswapFactoryV2: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
  YFI: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e',
  YCRV: '0xdF5e0e81Dff6FAF3A7e52BA697820c5e32D806A8',
  UNIAmpl: '0xc5be99a02c6857f9eac67bbce58df5572498f40c',
  WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  UNIRouter: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
  LINK: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
  MKR: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
  SNX: '0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F',
  COMP: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
  LEND: '0x80fB784B7eD66730e8b1DBd9820aFD29931aab03',
  TACOYCRV: '0x2C7a51A357d5739C5C74Bf3C96816849d2c9F726',
}

export const contractAddresses = {
  taco: {
    1: '0x41C028a4C1F461eBFC3af91619b240004ebAD216',
    3: '0x253E8Aa11D65f91af5b47e87efDAf369E1C1C413',
  },
  masterChef: {
    1: '0x7F7710e0c7C5C0FF043963dd22C3988e8bDb7AcC',
    3: '0xc9B52a983A2115C961700c1cB4fec4F0c43f37F9',
  },
  weth: {
    1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    3: '0xc778417e063141139fce010982780140aa0cd5ab',
  },
}

/*
Taco SLP token Address on mainnet for reference
==========================================
0  USDT 0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852
1  USDC 0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc
2  DAI  0xa478c2975ab1ea89e8196811f51a7b7ade33eb11
3  sUSD 0xf80758ab42c3b07da84053fd88804bcb6baa4b5c
4  COMP 0xcffdded873554f362ac02f8fb1f02e5ada10516f
5  LEND 0xab3f9bf1d81ddb224a2014e98b238638824bcf20
6  SNX  0x43ae24960e5534731fc831386c07755a2dc33d47
7  UMA  0x88d97d199b9ed37c29d846d00d443de980832a22
8  LINK 0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974
9  BAND 0xf421c3f2e695c2d4c0765379ccace8ade4a480d9
10 AMPL 0xc5be99a02c6857f9eac67bbce58df5572498f40c
11 YFI  0x2fdbadf3c4d5a8666bc06645b8358ab803996e28
12 TACO 0xce84867c3c02b05dc570d0135103d3fb9cc19433
*/

export const supportedPools = [
  {
    pid: 0,
    lpAddresses: {
      1: '0xcAaa93712BDAc37f736C323C93D4D5fDEFCc31CC',
      3: '0xB16789a451F97C1A37EE5c7bfbA86B0ae1cff0e7',
    },
    tokenAddresses: {
      1: '0xcAaa93712BDAc37f736C323C93D4D5fDEFCc31CC',
      3: '0xB16789a451F97C1A37EE5c7bfbA86B0ae1cff0e7',
    },
    name: 'CRD Hodlers',
    symbol: 'CRD',
    tokenSymbol: 'CRD',
    price: 0.0000537472,
    icon: '🥇',
  },
  {
    pid: 1,
    lpAddresses: {
      1: '0x526914CE1611849b9e1133Ff8F8b03A8fAa295Cb',
      3: '0xd35d3560b51273361a5feb0183619a4b53cb683b',
    },
    tokenAddresses: {
      1: '0xcAaa93712BDAc37f736C323C93D4D5fDEFCc31CC',
      3: '0x253e8aa11d65f91af5b47e87efdaf369e1c1c413',
    },
    name: 'CRD-ETH UniSwap',
    symbol: 'CRD-ETH UNI V2 LP',
    tokenSymbol: 'CRD',
    icon: '💧',
  },
  {
    pid: 7,
    lpAddresses: {
      1: '0xD34361F7830FDf2Ca6D7023a32A776Db39762CE9',
    },
    tokenAddresses: {
      1: '0x41C028a4C1F461eBFC3af91619b240004ebAD216',
    },
    name: 'TACO-ETH UniSwap',
    symbol: 'TACO-ETH UNI-V2',
    tokenSymbol: 'TacoToken', 
    icon:  '🌶️'
  },
  {
    pid: 8,
    lpAddresses: {
      1: '0xD3f85d18206829f917929BbBF738C1e0CE9AF7fC',
    },
    tokenAddresses: {
      1: '0xcAaa93712BDAc37f736C323C93D4D5fDEFCc31CC',
    },
    name: 'Community Manager',
    symbol: 'ETH-CRD SLP',
    tokenSymbol: 'CRD',
    icon: '🔐',
  },
  
  {
    pid: 10,
    lpAddresses: {
      1: '0x51c1d5cdf10dda49219054920c22c8d4a23eed89',
    },
    tokenAddresses: {
      1: '0xcf3c8be2e2c42331da80ef210e9b1b307c03d36a',
    },
    name: 'Community BEPRO-ETH Uniswap',
    symbol: 'BEPRO-ETH UNI-V2',
    tokenSymbol: 'BEPRO',
    icon: '⚽'
  },
  {
    pid: 13,
    lpAddresses: {
      1: '0x70a3944215de6fa1463a098ba182634df90bb9f4',
    },
    tokenAddresses: {
      1: '0x69A95185ee2a045CDC4bCd1b1Df10710395e4e23',
    },
    name: 'ETH-POOLZ Uniswap',
    symbol: 'ETH-POOLZ UNISWAP',
    tokenSymbol: 'POOLZ',
    icon: '🕸️'
  },
  
  {
    pid: 12,
    lpAddresses: {
      1: '0x481efdd010433ded1a931b557e4fe63b7b897964',
    },
    tokenAddresses: {
      1: '0xee573a945B01B788B9287CE062A0CFC15bE9fd86',
    },
    name: 'ETH-XED Uniswap',
    symbol: 'ETH-XED UNISWAP',
    tokenSymbol: 'XED',
    icon: '🎮'
  },
  {
    pid: 3,
    lpAddresses: {
      1: '0xc3d03e4f041fd4cd388c549ee2a29a9e5075882f',
    },
    tokenAddresses: {
      1: '0x6b175474e89094c44da98b954eedeac495271d0f',
    },
    name: 'DAI-ETH SushiSwap',
    symbol: 'DAI-ETH SLP',
    tokenSymbol: 'DAI',
    icon: '🦆',
  },
  {
    pid: 4,
    lpAddresses: {
      1: '0x795065dCc9f64b5614C407a6EFDC400DA6221FB0',
    },
    tokenAddresses: {
      1: '0x6b3595068778dd592e39a122f4f5a5cf09c90fe2',
    },
    name: 'SUSHI-ETH SushiSwap',
    symbol: 'SUSHI-ETH SLP',
    tokenSymbol: 'SUSHI',
    icon: '🍣',
  },
  {
    pid: 5,
    lpAddresses: {
      1: '0x06da0fd433c1a5d7a4faa01111c044910a184553',
    },
    tokenAddresses: {
      1: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    },
    name: 'USDT-ETH SushiSwap',
    symbol: 'USDT-ETH SLP',
    tokenSymbol: 'USDT',
    icon: '🦑',
  },
  {
    pid: 14,
    lpAddresses: {
      1: '0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974',
    },
    tokenAddresses: {
      1: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
    },
    name: 'LINK-ETH Uniswap',
    symbol: 'LINK-ETH UNISWAP',
    tokenSymbol: 'LINK',
    icon: '🔗',
  },
  {
    pid: 15,
    lpAddresses: {
      1: '0x70ec2fa6eccf4010eaf572d1c1a7bcbc72dec983',
    },
    tokenAddresses: {
      1: '0xfA5047c9c78B8877af97BDcb85Db743fD7313d4a',
    },
    name: 'ROOK-ETH Uniswap',
    symbol: 'ROOK-ETH UNISWAP',
    tokenSymbol: 'ROOK',
    icon: '♜',
  },
  {
    pid: 16,
    lpAddresses: {
      1: '0x2615b89ad032ccda6d67e1d511f0e4c9e3a5dc13',
    },
    tokenAddresses: {
      1: '0xB62132e35a6c13ee1EE0f84dC5d40bad8d815206',
    },
    name: 'NEXO-ETH Uniswap',
    symbol: 'NEXO-ETH UNISWAP',
    tokenSymbol: 'NEXO',
    icon: '📘',
  },
  
 
 
  // {
  //   pid: 6,
  //   lpAddresses: {
  //     1: '0x088ee5007C98a9677165D78dD2109AE4a3D04d0C',
  //   },
  //   tokenAddresses: {
  //     1: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e',
  //   },
  //   name: 'Closed YEARN-ETH',
  //   symbol: 'YEARN-ETH SLP',
  //   tokenSymbol: 'YEARN',
  //   icon: '🦖',
  // },
  // {
  //   pid: 2,
  //   lpAddresses: {
  //     1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  //   },
  //   tokenAddresses: {
  //     1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  //   },
  //   name: 'Closed ETH pool',
  //   symbol: 'Wrapped ETH',
  //   tokenSymbol: 'ETH',
  //   icon: '🦖',
  // },
]