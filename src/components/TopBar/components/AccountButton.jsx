import React, {useCallback} from 'react'
import {useWallet} from 'use-wallet'
import useModal from '../../../hooks/useModal'
import Button from '../../Button'
import WalletProviderModal from '../../WalletProviderModal'
import AccountModal from './AccountModal'
import AccountElement from "./AccountElement";
import styled from "styled-components";
import useTacoBalance from "../../../hooks/useTacoBalance";
import {getBalanceNumber} from "../../../utils/formatBalance";

const StyledAccountButtonWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  width: ${({width}) => width ? `${width}px` : '156px'};
  @media (max-width: 920px) {
    display: ${({display}) => display};
  }
`


const AccountButton = ({display}) => {
    const tacoBalance = useTacoBalance()

    const [onPresentAccountModal] = useModal(<AccountModal tacoBalance={tacoBalance} />, 'Account')
    const [onPresentWalletProviderModal] = useModal(
        <WalletProviderModal/>,
        'provider',
    )
    const { account } = useWallet()
    const handleUnlockClick = useCallback(() => {
        onPresentWalletProviderModal()
    }, [onPresentWalletProviderModal])

    return !account ? (
        <StyledAccountButtonWrapper display={display}>
            <Button onClick={handleUnlockClick} size="sm" text="Unlock Wallet"/>
        </StyledAccountButtonWrapper>
    ) : (
        <StyledAccountButtonWrapper width='272' display={display}>
            <AccountElement cursor width='45%'
                            symbol='TACO'
                            account={account}
                            onClick={onPresentAccountModal}
                            balance={getBalanceNumber(tacoBalance)}
            />
        </StyledAccountButtonWrapper>
    )
}

export default AccountButton
