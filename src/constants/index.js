import metaMaskIcon from '../assets/img/logos/meta-mask.svg'
import walletConnectIcon from '../assets/img/logos/wallet-connect.svg'
import coinBaseWalletIcon from '../assets/img/logos/coinbase-wallet.svg'
import fortmaticIcon from '../assets/img/logos/Formatic.svg'
import portisIcon from '../assets/img/logos/portis.svg'

export const SUPPORTED_WALLET = [
    {id:0, name: 'MetaMask', icon: metaMaskIcon, connectorName: 'injected',},
    {id:1, name: 'WalletConnect', icon: walletConnectIcon, connectorName: 'walletconnect',},
    {id:2, name: 'Coinbase Wallet', icon: coinBaseWalletIcon, connectorName: 'walletlink',},
    {id:3, name: 'Fortmatic', icon: fortmaticIcon , connectorName: 'fortmatic',},
    {id:4, name: 'Portis', icon: portisIcon , connectorName: 'portis',},
]