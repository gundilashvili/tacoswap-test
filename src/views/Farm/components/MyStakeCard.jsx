import BigNumber from 'bignumber.js'
import React, { useCallback, useEffect, useMemo, useState, useContext } from 'react'
import { Context as FarmsContext } from '../../../contexts/Farms';
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import useFarm from '../../../hooks/useFarm'
import useTokenBalance from '../../../hooks/useTokenBalance'
import { getContract } from '../../../utils/erc20'
import Button from '../../../components/Button'
import Value from '../../../components/Value/Value'
import { StyledTotalStakedCard } from './TotalStakedCard'
import { StyledP } from './TotalStakedCard'
import { StyledP2 } from './TotalStakedCard'
import { StyledButtonDiv } from '../../../styled/farm.styled'
import { StyledIcon } from '../../../styled/farm.styled'
import { getBalanceNumber } from '../../../utils/formatBalance'
import useStakedBalance from '../../../hooks/useStakedBalance'
import Spacer from '../../../components/Spacer'
import useAllowance from '../../../hooks/useAllowance'
import useApprove from '../../../hooks/useApprove'
import useStake from '../../../hooks/useStake'
import useUnstake from '../../../hooks/useUnstake'
import useModal from '../../../hooks/useModal'
import DepositModal from '../../Stake/components/DepositModal'
import WithdrawModal from '../../Stake/components/WithdrawModal'
import useEarnings from '../../../hooks/useEarnings'
import useReward from '../../../hooks/useReward'

const MyStakeCard = ({ isLP, dailyTACO }) => {
  const { farmId } = useParams()
  const {
    pid,
    lpToken,
    lpTokenAddress,
    tokenSymbol,
    quoteTokenSymbol,
    earnToken,
    icon,
    quoteIcon,
  } = useFarm(farmId) || {
    pid: 0,
    lpToken: '',
    tokenSymbol: '',
    quoteTokenSymbol: '',
    lpTokenAddress: '',
    tokenAddress: '',
    earnToken: '',
    name: '',
    icon: '',
    quoteIcon: null,
  }

  const stakedBalance = useStakedBalance(pid)
  const earnings = useEarnings(pid)
  const { onReward } = useReward(pid)

  const { stakedValue, farms } = useContext(FarmsContext);
  const currentFarmIndex = farms.findIndex((farm) => farm.id === farmId)

  const [approve, setApprove] = useState(false)
  const [claim, setClaim] = useState(false)

  const usdtIndex = farms.findIndex(
    ({ lpToken }) => lpToken === 'USDT-ETH SLP',
  )

  const etherPrice =
    usdtIndex >= 0 && stakedValue[usdtIndex]
      ? new BigNumber(1).div(stakedValue[usdtIndex].tokenPriceInWeth)
      : new BigNumber(0)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { ethereum } = useWallet()

  const lpContract = useMemo(() => {
    return getContract(ethereum, lpTokenAddress)
  }, [ethereum, lpTokenAddress])

  const allowance = useAllowance(lpContract)
  const { onApprove } = useApprove(lpContract)
  const tokenBalance = useTokenBalance(lpContract.options.address)

  const handleApprove = useCallback(async () => {
    try {
      setApprove(true)
      const txHash = await onApprove()
      setApprove(false)
      console.log(txHash)
      // user rejected tx or didn't go thru
      if (!txHash) {
        console.log(!txHash)
      }
    } catch (e) {
      console.error(e)
      setApprove(false)
    }
  }, [onApprove])
  const { onStake } = useStake(pid)
  const { onUnstake } = useUnstake(pid)

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      onConfirm={onStake}
      tokenName={lpToken}
    />,
  )

  const [onPresentWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={onUnstake}
      tokenName={lpToken}
    />,
  )

  const {
    baseTokenAmount = new BigNumber(0),
    quoteTokenAmount = new BigNumber(0),
    totalLPTokenStaked = new BigNumber(0),
    totalWethValue = new BigNumber(0),
  } = stakedValue?.[currentFarmIndex] || {}

  const userShare = totalLPTokenStaked.toNumber()
    ? stakedBalance.div('1e18').div(totalLPTokenStaked).times(100)
    : new BigNumber(0)

  return (
    <StyledStakeCard>
      <StyledFlex>
        <StyledP color="#614E56" fontSize={'16px'}>My Stake</StyledP>
        <StyledDiv>
          <StyledProfitDivContent
            mobileMargin="12px 0 6px 0"
            style={{ marginRight: '25px' }}
          >
            <StyledP
              color="#614E56"
              paddingRight="4px"
              lineHeight="13px"
              paddingBottom="8px"
            >
              Daily Profit:
            </StyledP>
            <Value
              size="sm"
              value={userShare.times(dailyTACO).div(100).toNumber()}
              symbol="TACO"
              decimals={0}
            />
          </StyledProfitDivContent>
          <StyledProfitDivContent mobileMargin="0 0 20px 0">
            <StyledP
              color="#614E56"
              paddingRight="4px"
              lineHeight="13px"
              paddingBottom="8px"
            >
              Share of Pool:
            </StyledP>
            <Value
              size="sm"
              value={userShare.toNumber()}
              symbol="%"
              decimals={4}
            />
          </StyledProfitDivContent>
        </StyledDiv>
      </StyledFlex>
      <StyledMargins>
        <StyledP2
          lineHeight="21px"
          background="linear-gradient(270deg,#fabc7e 0%,#FF962D 100%)"
        >
          <Value
            value={getBalanceNumber(stakedBalance)}
            size="md"
            fontWeight="700"
            symbol={lpToken}
            smallFontSize='14px'
          />
        </StyledP2>
      </StyledMargins>
      <StyledFlex>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', marginRight: '15px' }}>
            <StyledP before color="#614E56" lineHeight="20px">
              <Value
                size="sm"
                value={
                  totalWethValue.times(userShare).div(100).toNumber()
                }
                symbol="Ξ"
              />
            </StyledP>
          </div>
          <div style={{ display: 'flex', marginLeft: "31px" }}>
            <StyledP before color="#614E56" lineHeight="20px">
              {etherPrice.toNumber() ? <Value
                size="sm"
                symbol="$"
                value={
                  totalWethValue.times(userShare).div(100).times(etherPrice).toNumber()
                }
              /> : 0}
            </StyledP>
          </div>
        </div>
        <StyledButtonDivProto>
          {allowance.toNumber() ? (
            <>
              <Button
                margin="0 12.9px 0 0"
                size="md"
                text="Stake"
                paddingLeft="20px"
                paddingRight="20px"
                width="80"
                onClick={onPresentDeposit}
              />
              <Button
                butColor={true}
                size="md"
                text="Unstake"
                secondary={true}
                width="80"
                onClick={onPresentWithdraw}
              />
            </>
          ) : null}
        </StyledButtonDivProto>
      </StyledFlex>
      <Spacer />
      <StyledStakeValues>
        <div style={{ display: 'flex' }}>
          <StyledIcon>{icon}</StyledIcon>
          <StyledP color="#614E56" fontSize="16px">
            {tokenSymbol}
          </StyledP>
        </div>
        <StyledP color="#614E56">
          <Value
            fontWeight="bold"
            size="sm"
            value={baseTokenAmount.multipliedBy(userShare).div(100).toNumber()}
          />
        </StyledP>
      </StyledStakeValues>
      {isLP && <StyledStakeValues>
        <div style={{ display: 'flex' }}>
          <StyledIcon>{quoteIcon}</StyledIcon>
          <StyledP color="#614E56" fontSize="16px">{quoteTokenSymbol}</StyledP>
        </div>
        <StyledP color="#614E56">
          <Value
            fontWeight="bold"
            size="sm"
            value={quoteTokenAmount.multipliedBy(userShare).div(100).toNumber()}
          />
        </StyledP>
      </StyledStakeValues>}
      <StyledFooter>
        {allowance.toNumber() ? (
          <Button
            width="136"
            text={claim ? 'Claiming...' : 'Claim'}
            size="md"
            disabled={claim}
            onClick={async () => {
              try {
                setClaim(true)
                await onReward()
                setClaim(false)
              } catch (e) {
                setClaim(false)
              }
            }}
          />
        ) : (
            <Button
              width="136"
              text={approve ? 'Approving...' : 'Approve'}
              size="md"
              disabled={approve}
              onClick={handleApprove}
            />
          )}
        <StyledPProto color="#614E56" >
          <Value
            size="sm"
            value={getBalanceNumber(earnings)}
            symbol={earnToken}
            decimals={4}
          />
        </StyledPProto>
      </StyledFooter>
    </StyledStakeCard>
  )
}

const StyledStakeCard = styled(StyledTotalStakedCard)`
  margin-right: 0;
  width: calc(100% - 331px);
  @media (max-width: 592px) {
    width:100%;
  }
  @media (max-width: 449px) {
    width:100%;
  }
`

const StyledFlex = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 865px) {
    flex-direction: column;
  }
`

const StyledDiv = styled.div`
  display: flex;
  @media (max-width: 865px) {
    flex-direction: column;
  }
`

const StyledPProto = styled(StyledP)`
  @media (max-width: 371px) {
    font-size: 14px;
    margin-top: 24px;
    margin-bottom: 15px;
  }
`

const StyledProfitDivContent = styled.div`
  @media (max-width: 865px) {
    display: flex;
    flex-direction: row;
    margin: ${({ mobileMargin }) => mobileMargin};
    :first-child {
    }
  }
`

const StyledMargins = styled.div`
  margin-bottom: 7px;
  margin-top: 6px;
`

const StyledButtonDivProto = styled(StyledButtonDiv)`
  @media (max-width: 865px) {
    padding-right: 114px;
  }
`

const StyledStakeValues = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #FDCF89;
  padding: 16px 0;
`

const StyledFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;
  @media (max-width: 371px) {
    flex-direction: column;
  }
`

export default MyStakeCard
