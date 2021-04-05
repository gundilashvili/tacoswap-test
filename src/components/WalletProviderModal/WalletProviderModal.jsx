import React, { useEffect } from 'react'
import { useWallet } from 'use-wallet'
import Modal from '../Modal'
import ModalContent from '../ModalContent'
import ModalTitle from '../ModalTitle'
import {SUPPORTED_WALLET} from "../../constants";
import Option from "../Option/Option";

const WalletProviderModal = ({ onDismiss }) => {
  const { account, connect, connector, status } = useWallet()

  useEffect(() => {
    if (account) {
      onDismiss()
    }
  }, [account, onDismiss])

  return (
    <Modal walletProvider>
      <ModalTitle text="WALLET PROVIDERS" onDismiss={onDismiss} height='0'/>

      <ModalContent padding='45px 4px 75px 4px'>
        {SUPPORTED_WALLET.map(({id, name, icon, connectorName}) => (
            <Option
                key={id}
                id={id}
                icon={icon}
                header={name}
                onClick={() => connect(connectorName)}
                active={connector === connectorName}
                status={status}
            />
        ))}
      </ModalContent>
    </Modal>
  )
}

export default WalletProviderModal
