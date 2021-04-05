import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import { getBalanceNumber } from '../../../utils/formatBalance'
import Modal from '../../Modal'
import ModalActions from '../../ModalActions'
import ModalContent from '../../ModalContent'
import ModalTitle from '../../ModalTitle'
import Spacer from '../../Spacer'
import Value from '../../Value'
import jar from '../../../assets/img/taco.png'
import AccountElement from "./AccountElement";
import {PendingRewards} from "../../../views/Home/components/Balances";
import BigNumber from "bignumber.js";


const AccountModal = ({ onDismiss, tacoBalance }) => {
  const { account, reset, balance } = useWallet()

  const handleSignOutClick = useCallback(() => {
    onDismiss()
    reset()
  }, [onDismiss, reset])

  return (
    <Modal>
      <ModalTitle text="MY ACCOUNT" height='auto' onDismiss={onDismiss}/>
      <ModalContent padding='50px 12px 34px 12px'>
        <div style={{ display: 'flex' }}>
          <StyledBalanceWrapper>
            <StyledCardIcon>
              <img src={jar} height="64" alt="Combine.finance" />
            </StyledCardIcon>
            <StyledBalance>
              <StyledLabel>
                TACO Balance
              </StyledLabel>
                <StyledFlexItem>
                   <Value fontWeight="bold" fontFamily="'PT Sans', sans-serif" size="lg" value={getBalanceNumber(tacoBalance)} />
                </StyledFlexItem>
              <PendingRewards accountModalPendingRewards/>
            </StyledBalance>
          </StyledBalanceWrapper>
        </div>
        <Spacer />
          <AccountElement fontSize="20px" width='50%' height='56' account={account} symbol='ETH'  balance={getBalanceNumber(new BigNumber(balance))}/>
      </ModalContent>
      <ModalActions flex='0' padding='24px 12px 40px 12px'>
          <StyledButton onClick={handleSignOutClick}>
              Sign out
          </StyledButton>
      </ModalActions>
    </Modal>
  )
}



const StyledBalance = styled.div`
  align-items: baseline;
  display: flex;
  flex-direction: column;
`

const StyledBalanceWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: row;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
`

const StyledCardIcon = styled.div`
  display: flex;
  width: 72px;
  font-size: 48px;
  justify-content: center;
  margin-right: 24px;
  img {
    height: 100%;
    width: 100%;
  }
`

const StyledLabel = styled.label`
  font-family: 'PT Sans', sans-serif;
  font-size: 16px;
  font-style: normal;
  color:#614E56;
  margin-bottom: 6px;
  
`
const StyledButton = styled.button`
  border: 1px solid #614E56;
  width: 182px;
  padding: 14px 0;
  box-sizing: border-box;
  border-radius: 24px;
  background-color: transparent;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #614E56;
  cursor: pointer;
  &:hover{
      background-color: transparent;
  }
`

const StyledFlexItem = styled.div`
  margin: 5px 0 20px 0;
  font-size: 34px;
`

export default AccountModal
