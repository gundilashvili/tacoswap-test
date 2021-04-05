import BigNumber from 'bignumber.js'
import React, { useContext } from 'react'
import { Context as FarmsContext } from '../../../contexts/Farms';
import { useParams } from 'react-router-dom'
import styled, { css } from 'styled-components'
import useFarm from '../../../hooks/useFarm'
import Value from '../../../components/Value/Value'

const TotalStakedCard = ({ isLP }) => {
  const { farmId } = useParams()
  const {
    lpToken,
    tokenSymbol,
    quoteTokenSymbol,
    icon,
    quoteIcon,
  } = useFarm(farmId) || {
    pid: 0,
    lpToken: '',
    lpTokenAddress: '',
    tokenAddress: '',
    tokenSymbol: '',
    quoteTokenSymbol: '',
    earnToken: '',
    name: '',
    icon: '',
    quoteIcon: null,
  }

  const { stakedValue, farms } = useContext(FarmsContext);
  const currentFarmIndex = farms.findIndex((farm) => farm.id === farmId)

  const {
    baseTokenAmount = new BigNumber(0),
    quoteTokenAmount = new BigNumber(0),
    totalWethValue = new BigNumber(0),
    totalLPTokenStaked = new BigNumber(0),
  } = stakedValue?.[currentFarmIndex] || {}

  const usdtIndex = farms.findIndex(
    ({ lpToken }) => lpToken === 'USDT-ETH SLP',
  )

  const etherPrice =
    usdtIndex >= 0 && stakedValue[usdtIndex]
      ? new BigNumber(1).div(stakedValue[usdtIndex].tokenPriceInWeth)
      : new BigNumber(0)

  return (
    <StyledTotalStakedCard>
      <StyledHeader>
        <StyledP color="#614E56" fontSize={'16px'}>Total Staked</StyledP>
      </StyledHeader>
      <StyledContent>
        <StyledP2
          paddingTop="10px"
          background="linear-gradient(270deg,#fabc7e 0%,#FF962D 100%)"
        >
          <Value size="md" value={totalLPTokenStaked.toNumber()} smallFontSize='14px' symbol={lpToken} fontWeight="700" />
        </StyledP2>
        <div style={{ display: 'flex', height: '36px', alignItems: 'center' }}>
          <div style={{ display: 'flex' }}>
            <StyledP
              paddingRight="10px"
              color="#614E56"
              lineHeight="20px"
              before
            >
              <Value
                size="sm"
                value={totalWethValue.toNumber()}
                symbol="Ξ"
              />
            </StyledP>
          </div>
          <div style={{ display: 'flex', marginLeft: "24px" }}>
            {/* <DollarIcon />&nbsp; */}
            <StyledP before color="#614E56" lineHeight="18px">
              <Value
                symbol="$"
                size="sm"
                value={totalWethValue.times(etherPrice).toNumber()}
              />
            </StyledP>
          </div>
        </div>
      </StyledContent>
      <StyledCardDivValues>
        <div style={{ display: 'flex' }}>
          <StyledIcon>{icon}</StyledIcon>
          <StyledP color="#614E56" fontSize="16px">
            {tokenSymbol}
          </StyledP>
        </div>
        <StyledP color="#614E56">
          <Value fontWeight="bold" size="sm" value={baseTokenAmount.toNumber()} />
        </StyledP>
      </StyledCardDivValues>
      {isLP && <StyledCardDivValues>
        <div style={{ display: 'flex' }}>
          <StyledIcon>
            {quoteIcon}
          </StyledIcon>
          <StyledP color="#614E56" fontSize="16px">{quoteTokenSymbol}</StyledP>
        </div>
        <StyledP color="#614E56">
          <Value fontWeight="bold" size="sm" value={quoteTokenAmount.toNumber()} />
        </StyledP>
      </StyledCardDivValues>}
    </StyledTotalStakedCard>
  )
}

export const StyledTotalStakedCard = styled.div`
  background: #FFF7EF;
  border:1px solid #FDCF89;
  border-radius: 8px;
  font-size: 16px;
  padding: 16px 22px;
  width: 325px;
  margin-right: 16px;
  @media (max-width: 595px) {
    width: 100%;
    position: relative;
    margin-right: 0;
    box-sizing: border-box;
    :first-of-type {
      margin-bottom: 29px;
    }
  }
  @media (max-width: 450px) {
    width: 100%;
    left: 0;
    position: static;
  }
`

const StyledHeader = styled.div`
  align-items: center;
  margin-top: 11px;
`

export const StyledP = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin: 0;
  font-family: "PT Sans";
  font-style: normal;
  font-weight: normal;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '14px')};
  color: ${({ color }) => (color ? color : '#fff')};
  padding-right: ${({ paddingRight }) => (paddingRight ? paddingRight : '0')};
  padding-top: ${({ paddingTop }) => (paddingTop ? paddingTop : '0')};
  padding-bottom: ${({ paddingBottom }) => (paddingBottom ? paddingBottom : '0')};
  ${({ before }) =>
    before
      ? css`
          &:before {
            content: '≈';
          }
        `
      : css``};
  span {
    color: ${({ color }) => (color ? color : '#fff')};
  }
  @media (max-width: 370px) {
    font-size: 11px;
  }
`

export const StyledP2 = styled.div`
  display: flex;
  position: relative;
  margin: 0;
  align-items: ${({ alignItems }) =>
    alignItems === 'flexEnd'
      ? 'flex-end'
      : alignItems === 'center'
        ? 'center'
        : 'baseline'};
  font-weight: 700;
  font-size: 19px;
  /* line-height: ${({ lineHeight }) => (lineHeight ? lineHeight : '44px')}; */
  color: ${({ color }) => (color ? color : '#fff')};
  padding-right: ${({ paddingRight }) => (paddingRight ? paddingRight : '0')};
  padding-top: ${({ paddingTop }) => (paddingTop ? paddingTop : '0')};
  background: ${({ background }) => (background ? background : 'white')};
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  ${({ before }) =>
    before
      ? css`
          &:before {
            content: '≈';
          }
        `
      : css``};
  span {
    color: ${({ color }) => (color ? color : '#fff')};
  }
  // @media (max-width: 1199px) {
  //   font-size: 15px;
  // }
  @media (max-width: 324px) {
    font-size: 15px;
  }
`

const StyledContent = styled.div`
  margin-bottom: 32px;
  margin-top: 10px;
`

const StyledCardDivValues = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #FDCF89;
  padding: 16px 0;
`

const StyledIcon = styled.div`
  width: ${({ width }) => (width ? width : '12px')};
  height: ${({ height }) => (height ? height : '20px')};
  margin-right: ${({ marginRight }) => (marginRight ? marginRight : '10px')};
  padding-top: ${({ paddingTop }) => (paddingTop ? paddingTop : '0')};
  padding-left: ${({ paddingLeft }) => (paddingLeft ? paddingLeft : '0')};
  img {
    width: 100%;
  }
`

export default TotalStakedCard
