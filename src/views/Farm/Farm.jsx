import React, { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { ReactComponent as ButtonIcon } from '../../assets/img/logos/Group.svg'
import { ReactComponent as PlusIcon } from '../../assets/img/logos/Subtract.svg'
import { ReactComponent as ButtonIconUnion } from '../../assets/img/logos/Union.svg'
import Button from '../../components/Button'
import { PageHeaderProto } from '../../components/PageHeader/PageHeader'
import Value from '../../components/Value/Value'
import useFarm from '../../hooks/useFarm'
import { BigNumber } from '../../taco'
import { StyledCardFarm } from '../Farms/components/FarmCards'
import MyStakeCard from './components/MyStakeCard'
import TotalStakedCard from './components/TotalStakedCard'
import { StyledIcon } from '../../styled/farm.styled'
import { StyledButtonDiv } from '../../styled/farm.styled'
import { Context as FarmsContext } from '../../contexts/Farms';

const Farm = () => {
  const { farmId } = useParams()
  const {
    lpTokenAddress,
    tokenAddress,
    tokenSymbol,
    quoteTokenSymbol,
    earnToken,
    name,
    icon,
    quoteIcon,
  } = useFarm(farmId) || {
    pid: 0,
    lpTokenAddress: '',
    tokenAddress: '',
    tokenSymbol: '',
    quoteTokenSymbol: '',
    earnToken: '',
    name: '',
    icon: null,
    quoteIcon: null,
  }

  const isLP = lpTokenAddress !== tokenAddress;

  const { stakedValue, farms } = useContext(FarmsContext);

  const BLOCKS_PER_DAY = new BigNumber(6700)
  const BLOCKS_PER_YEAR = BLOCKS_PER_DAY.times(365)
  const TACO_PER_BLOCK = new BigNumber(100)

  const currentFarmIndex = farms.findIndex((farm) => farm.id === farmId)

  const {
    baseTokenAmount = new BigNumber(0),
    quoteTokenAmount = new BigNumber(0),
    baseTokenAmountWholeLP = new BigNumber(0),
    quoteTokenAmountWholeLP = new BigNumber(0),
    poolWeight = new BigNumber(0),
    totalWethValue = new BigNumber(0),
  } = stakedValue?.[currentFarmIndex] || {}

  const tacoIndex = farms.findIndex(
    ({ lpToken }) => lpToken === 'TACO-ETH UNI-V2',
  )

  const usdtIndex = farms.findIndex(
    ({ lpToken }) => lpToken === 'USDT-ETH SLP',
  )

  const price =
    tacoIndex >= 0 && stakedValue[tacoIndex]
      ? stakedValue[tacoIndex].tokenPriceInWeth
      : new BigNumber(0)

  const etherPrice =
    usdtIndex >= 0 && stakedValue[usdtIndex]
      ? new BigNumber(1).div(stakedValue[usdtIndex].tokenPriceInWeth)
      : new BigNumber(0)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const apy = price
    .times(TACO_PER_BLOCK)
    .times(BLOCKS_PER_YEAR)
    .times(poolWeight)
    .div(totalWethValue)
    .times(new BigNumber(100))

  const dailyTACO = BLOCKS_PER_DAY.times(TACO_PER_BLOCK).times(poolWeight)

  let infoLink = `https://info.tacoswap.io/pair/${lpTokenAddress}`;
  if (farmId.indexOf('UNI') !== -1) {
    infoLink = `https://info.uniswap.org/pair/${lpTokenAddress}`;
  }

  let exchangeUrl = `https://exchange.tacoswap.io`;
  if (farmId.indexOf('UNI') !== -1) {
    exchangeUrl = `https://app.uniswap.org`;
  }

  return (
    <>
      <StyledMainHeader>
        <StyledHeader>
          <div>
            <PageHeaderProto
              padding="0"
              flexDirection="row"
              icon={icon}
              subtitle={`Deposit and earn ${earnToken}`}
              title={name}
              fontFamily="'PT Sans', sans-serif"
            />
          </div>
          <StyledButtonDiv>
            <Button
              size="icon-button"
              background="transparent"
              border="1px solid #FDCF89"
              butColor={true}
              borderRadius="50%"
              margin="0 20px 0 0"
              fontSize={14}
              href={infoLink}
            >
              <ButtonIcon />
            </Button>
            <Button
              size="icon-button"
              margin="0 20px 0 0"
              borderRadius="50%"
              href={`${exchangeUrl}/#/swap?outputCurrency=${tokenAddress}`}
              background='transparent'
              border="1px solid #FDCF89"
            >
              <ButtonIconUnion />
            </Button>
            <Button
              size="icon-button"
              background="transparent"
              border="1px solid #FDCF89"
              borderRadius="50%"
              fontSize={25}
              href={`${exchangeUrl}/#/add/ETH/${tokenAddress}`}
            >
              <PlusIcon />
            </Button>
          </StyledButtonDiv>
        </StyledHeader>
      </StyledMainHeader>
      <StyledCardFarm
        width="100%"
        background="#FBFDFF"
        marginTop="48px"
        padding="48px 16px 45px"
        display="block"
        marginBottom="36px"
        mobileMargin="120px"
        mobileWidth="100%"
      >
        {isLP && <StyledCalcDiv>
          <StyledCalcMobile>
            <StyledCalc>
              
              <StyledIcon style={{width:12, height:15}}>{icon}</StyledIcon>
             
              <StyledP>
                <Value size="sm" value={1} symbol={tokenSymbol} decimals={0} />
                &nbsp;<span>=</span>&nbsp;
                {!isNaN(baseTokenAmount.div(quoteTokenAmount).toNumber()) ? (
                  <Value
                    size="sm"
                    value={quoteTokenAmount.div(baseTokenAmount).toNumber()}
                    symbol="Ξ"
                    decimals={6}
                  />
                ) : 0}
              </StyledP>
            </StyledCalc>
            <StyledCalc>
              <StyledIcon>{quoteIcon}</StyledIcon>
              <StyledP>
                <Value value={1} size="sm" decimals={0} />
                &nbsp;<span> = </span>&nbsp;
                {!isNaN(baseTokenAmount.div(quoteTokenAmount).toNumber()) ? (
                  <Value
                    value={baseTokenAmount.div(quoteTokenAmount).toNumber()}
                    size="sm"
                    symbol={tokenSymbol}
                  />
                ) : 0}
              </StyledP>
            </StyledCalc>
          </StyledCalcMobile>
          <StyledMobile>
            <div style={{ display: 'flex', marginRight: '24px' }}>
              <StyledIcon>{icon}</StyledIcon>
              <StyledP>
                <Value
                  value={baseTokenAmountWholeLP.toNumber()}
                  size="sm"
                  symbol={tokenSymbol}
                />
              </StyledP>
            </div>
            <div style={{ display: 'flex' }}>
              <StyledIcon>{quoteIcon}</StyledIcon>
              <StyledP>
                <Value
                  value={quoteTokenAmountWholeLP.toNumber()}
                  size="sm"
                  symbol={quoteTokenSymbol}
                />
              </StyledP>
            </div>
          </StyledMobile>
        </StyledCalcDiv>}

        <StyledApyDiv>
          <StyledFlexDiv>
            <StyledApy>
              <StyledApyP1 color="#614E56">APR</StyledApyP1>
              <StyledApyP2 color="#614E56">
                {!isNaN(apy.toNumber()) ? (
                  <Value
                    size="md"
                    value={apy.toNumber()}
                    symbol="%"
                    fontWeight={700}
                  />
                ) : (
                    'Loading ...'
                  )}
              </StyledApyP2>
            </StyledApy>
            <StyledApy>
              <StyledApyP1 color="#614E56">Daily ROI</StyledApyP1>
              <StyledApyP2 color="#614E56">
                {!isNaN(apy.toNumber()) ? (
                  <Value
                    size="md"
                    value={apy ? apy.div(365).toNumber() : 'Loading ...'}
                    decimals={3}
                    symbol="%"
                    fontWeight={700}
                  />
                ) : (
                    'Loading ...'
                  )}
              </StyledApyP2>
            </StyledApy>
            <StyledApy>
              <StyledApyP1 color="#614E56">Hourly ROI</StyledApyP1>
              <StyledApyP2 color="#614E56">
                {!isNaN(apy.toNumber()) ? (
                  <Value
                    size="md"
                    value={apy ? apy.div(365).div(24).toNumber() : 'Loading ...'}
                    symbol="%"
                    fontWeight={700}
                    decimals={4}
                  />
                ) : (
                    'Loading ...'
                  )}
              </StyledApyP2>
            </StyledApy>
          </StyledFlexDiv>

          <StyledApyProto border="1px solid #FDCF89" paddingRight="0">
            <div style={{ display: 'flex' }}>
              <StyledApyP1 color="#614E56">Pool Supply</StyledApyP1>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingRight: '14px',
              }}
            >
              <StyledApyP2
                before
                background="linear-gradient(270deg,#fabc7e 0%,#FF962D 100%)"
                paddingRight="auto"
                alignItems="flexEnd"
                color="#FDCF89"
                fillColor="transparent"
              >
                <Value fontWeight="bold" color="#FDCF89" size="md" value={dailyTACO.toNumber()} symbol={`${earnToken}/DAY`} />
              </StyledApyP2>
              <div>
                <StyledApyP1 color="#614E56" lineHeight="18px">
                  ≈ &nbsp;
                  <Value
                    size="sm"
                    value={price.times(dailyTACO).toNumber()}
                    symbol="Ξ"
                  />
                </StyledApyP1>
                <StyledApyP1 color="#614E56" lineHeight="20px">
                  ≈ &nbsp;
                  <Value
                    size="sm"
                    value={price.times(dailyTACO).times(etherPrice).toNumber()}
                    symbol="$"
                  />
                </StyledApyP1>
              </div>
            </div>
          </StyledApyProto>
        </StyledApyDiv>
        <StyledCardContainer>
          <TotalStakedCard isLP={isLP} />
          <MyStakeCard isLP={isLP} dailyTACO={dailyTACO} />
        </StyledCardContainer>
      </StyledCardFarm>
    </>
  )
}

const StyledMainHeader = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  max-width: 1024px;
  padding: 56px 48px 0 48px;
  margin-top: 50px;
  @media screen and (max-width: 678px) {
    margin-top: 120px;
  }
  @media screen and (max-width: 460px) {
    padding: 56px 16px 0 16px;
  }
`

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 28px;
  @media (max-width: 700px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`

const StyledCalcMobile = styled.div`
  width: 62%;
  display: flex;
  margin-right: 23px;
  @media (max-width: 890px) {
    width: 100%;
    margin-right: 0;
    justify-content: space-between;
  }
  @media (max-width: 608px) {
    flex-direction: column;
    width: 100%;
    margin-right: 0;
  }
`

const StyledMobile = styled.div`
  display: flex;
  @media (max-width: 890px) {
    width: 100%;
    margin-top: 17px;
    justify-content: space-around;
  }
  @media (max-width: 500px) {
    width: 100%;
    justify-content: left;
    & > div {
      padding-right: 45px;
    }
  }
  @media (max-width: 370px) {
    & > div {
      padding-right: 0;
    }
  }
`

const StyledFlexDiv = styled.div`
  width: 57%;
  display: flex;
  justify-content: space-between;
  @media (max-width: 895px) {
    width: 100%;
  }
`

const StyledP = styled.div`
  display: flex;
  font-size: 14px;
  margin: 0;
  color: #614E56;
`

const StyledCalcDiv = styled.div`
  box-sizing: border-box;
  margin: 20px 0 0 0;
  display: flex;
  align-items: center;
  @media (max-width: 890px) {
    flex-direction: column;
  }
  @media (max-width: 608px) {
    width: 100%;
    align-items: flex-start;
  }
  @media (min-width: 701px) {
    margin-bottom: 32px;
  }
`

const StyledCalc = styled.div`
  width: 50%;
  display: flex;
  border: 1px solid #FDCF89;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 5px 40px 6px 16px;
  @media (max-width: 890px) {
    width: 50%;
  }
  :first-of-type {
    margin-right: 16px;
    @media (max-width: 608px) {
      margin-right: 0;
      margin-bottom: 12px;
    }
  }
  @media (max-width: 608px) {
    width: 100%;
  }
`

const StyledApyDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 22px;
  @media (min-width: 1265px) {
    justify-content: center;
  }
  @media (min-width: 1024px) {
    justify-content: space-between;
  }
  @media (max-width: 895px) {
    flex-direction: column;
  }
  @media (max-width: 700px) {
    width: 100%;
  }
`

const StyledApy = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 33%;
  padding-right: ${({ paddingRight }) =>
    paddingRight ? paddingRight : '49px'};
  padding: 12px 0 10px 32px;
  background: #FFF7EF;
  border: ${({ border }) => (border ? border : '')};
  border-radius: 8px;
  margin-right: 17px;
  @media (max-width: 895px) {
    padding: 12px 90px 10px 32px;
    :last-of-type {
      margin-right: 0;
    }
  }
  @media (max-width: 700px) {
    padding: 12px 0 10px 32px;
    padding-right: ${({ paddingRight }) =>
    paddingRight ? paddingRight : '54px'};
    margin-top: 19px;
  }
  @media (max-width: 545px) {
    padding-left: 23px;
  }
  @media (max-width: 528px) {
    padding-right: 47px;
  }
  @media (max-width: 492px) {
    padding-right: 40px;
  }
  @media (max-width: 471px) {
    padding-right: 38px;
    padding-left: 20px;
  }
  @media (max-width: 460px) {
    margin-right: 10px;
  }
  @media (max-width: 445px) {
    padding-right: 35px;
  }
  @media (max-width: 438px) {
    padding-left: 15px;
    padding-right: 30px;
    margin-right: 15px;
  }
  @media (max-width: 420px) {
    padding-left: 10px;
    padding-right: 23px;
    margin-right: 13px;
  }
`

const StyledApyProto = styled(StyledApy)`
  width: 43%;
  box-sizing: border-box;
  margin-right: 0;
  @media (max-width: 895px) {
    width: 100%;
    margin-top: 19px;
    padding: 10px 15px 4px 12px;
  }
  @media (max-width: 700px) {
    padding: 10px 15px 4px 12px;
  }
  @media (max-width: 373px) {
    div {
      & p:first-child {
        padding-right: 20px;
      }
    }
  }
`

const StyledApyP1 = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin: 0;
  font-family: 'PT Sans', sans-serif;
  font-style: normal;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '14px')};
  color: ${({ color }) => (color ? color : '#fff')};
  padding-right: ${({ paddingRight }) => (paddingRight ? paddingRight : '0')};
  padding-top: ${({ paddingTop }) => (paddingTop ? paddingTop : '0')};
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

const StyledApyP2 = styled.div`
  display: flex;
  position: relative;
  margin: ${({ margin }) => (margin ? margin : '0')};
  align-items: ${({ alignItems }) =>
    alignItems === 'flexEnd'
      ? 'flex-end'
      : alignItems === 'center'
        ? 'center'
        : 'baseline'};
  font-family: 'PT Sans', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 19px;
  line-height: ${({ lineHeight }) => (lineHeight ? lineHeight : '44px')};
  color: ${({ color }) => (color ? color : '#fff')};
  padding-right: ${({ paddingRight }) => (paddingRight ? paddingRight : '0')};
  padding-top: ${({ paddingTop }) => (paddingTop ? paddingTop : '0')};
  background: ${({ background }) => (background ? background : 'white')};
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: ${({ fillColor }) => fillColor ? fillColor : ""};
  span {
    color: ${({ color }) => (color ? color : '#fff')};
    /* &:before {
      content: '≈';
      font-size: 14px;
    } */
  }

  @media (max-width: 380px) {
    font-size: 14px;
  }
`

const StyledCardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 35px;
  @media (max-width: 595px) {
    flex-direction: column;
    align-items: center;
  }
`

export default Farm
