import BigNumber from 'bignumber.js'
import React, { useEffect, useState, useContext } from 'react'
import CountUp from 'react-countup'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import Label from '../../../components/Label/Label'
import Spacer from '../../../components/Spacer'
import Button from '../../../components/Button/Button'
import Value from '../../../components/Value'
import useAllEarnings from '../../../hooks/useAllEarnings'
import useTacoBalance from '../../../hooks/useTacoBalance'
import useTaco from '../../../hooks/useTaco'
import { getTacoSupply } from '../../../taco/utils'
import { getBalanceNumber } from '../../../utils/formatBalance'
import FarmCards from '../../Farms/components/FarmCards'
import { Context as FarmsContext } from '../../../contexts/Farms';


export const PendingRewards = ({
  accountModalPendingRewards,
}) => {
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)
  const [scale, setScale] = useState(1)

  const allEarnings = useAllEarnings()
  let sumEarning = 0
  for (let earning of allEarnings) {
    sumEarning += new BigNumber(earning)
      .div(new BigNumber(10).pow(18))
      .toNumber()
  }

  console.log(sumEarning);

  useEffect(() => {
    setStart((prev) => prev)
    setEnd(sumEarning)
  }, [sumEarning])

  return (
    <>
      {accountModalPendingRewards ? (
        <StyledAccountPendingRewardsContainer>
          Unclaimed:{' '}
          <CountUp
            start={start}
            end={end}
            decimals={end < 0 ? 4 : end > 1e5 ? 0 : 3}
            duration={1}
            onStart={() => {
              setScale(1.25)
              setTimeout(() => setScale(1), 600)
            }}
            separator=","
          />{' '}
          TACO
        </StyledAccountPendingRewardsContainer>
      ) : (
          <span
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'right bottom',
              transition: 'transform 0.5s',
              display: 'inline-block',
            }}
          >
            <CountUp
              start={start}
              end={end}
              decimals={end < 0 ? 4 : end > 1e5 ? 0 : 3}
              duration={1}
              onStart={() => {
                setScale(1.25)
                setTimeout(() => setScale(1), 600)
              }}
              separator=","
            />
            <small style={{ marginLeft: '4px', opacity: '.5' }}>TACO</small>
          </span>
        )}
    </>
  )
}

const Balances = () => {
  const [totalSupply, setTotalSupply] = useState(new BigNumber(0))
  const taco = useTaco()
  const tacoBalance = useTacoBalance()
  const { account } = useWallet()

  const { stakedValue, farms } = useContext(FarmsContext);

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

  const liquidityWETH =
    tacoIndex >= 0 && stakedValue[tacoIndex]
      ? stakedValue[tacoIndex].quoteTokenAmountWholeLP
      : new BigNumber(0)

  const liquidityTACO =
    tacoIndex >= 0 && stakedValue[tacoIndex]
      ? stakedValue[tacoIndex].baseTokenAmountWholeLP
      : new BigNumber(0)

  const totalLocked = stakedValue.length ? stakedValue.filter(({ totalWethValue }) => totalWethValue.toNumber()).reduce(
    (t, n) => {
      return t.plus(n.totalWethValue)
    },
    new BigNumber(0),
  ) : new BigNumber(0)

  useEffect(() => {
    let mount = true
    async function fetchTotalSupply() {
      if (mount) {
        const supply = await getTacoSupply(taco).then((n) => n.div(new BigNumber(10).pow(new BigNumber(18))));
        setTotalSupply(supply)
      }
    }

    if (taco) {
      fetchTotalSupply()
    }
    return () => { mount = false }
    // eslint-disable-next-line
  }, [!!taco])

  return (
    <>
      <StyledDivs>
        <StyledWrapper>
          <StyledCardWrapper>
            <StyledCardContent>
              <StyledBalances>
                <StyledBalance>
                  <Spacer size="lg" />
                  <StyledBalanceContent>
                    <div style={{ flex: 1, justifyContent: 'flex-start' }}>
                      <Label color="#ffffff" text="Your Balance" />
                      <Value
                        size="lg"
                        value={
                          !!account ? getBalanceNumber(tacoBalance) : 'Locked'
                        }
                        symbol="TACO"
                        color="#ffffff"
                        decimals={0}
                        ontFamily="'PT Sans', sans-serif"
                        fontWeight='bold'
                        linearBg
                      />
                    </div>
                    <StyledConvertions>
                      <StyledParagraph color="#ffffff">
                        <Value
                          value={
                            !!account
                              ? getBalanceNumber(tacoBalance.times(price))
                              : 'Locked'
                          }
                          symbol="Ξ"
                          size="sm"
                          decimals={2}
                          color="#ffffff"
                        />
                      </StyledParagraph>
                      <StyledParagraph color="#ffffff">
                        <Value
                          value={
                            !!account
                              ? getBalanceNumber(
                                price.times(etherPrice).times(tacoBalance),
                              )
                              : 'Locked'
                          }
                          symbol="$"
                          size="sm"
                          decimals={0}
                          color="#ffffff"
                        />
                      </StyledParagraph>
                    </StyledConvertions>
                  </StyledBalanceContent>
                </StyledBalance>
              </StyledBalances>
              {!!account && (
                <Footnote color="#ffffff" >
                  Unclaimed:&nbsp; &nbsp;
                  <PendingRewards />
                </Footnote>
              )}
            </StyledCardContent>
            <StyledFooter>
              <div style={{ width: '126px' }}>
                <Button
                  background="linear-gradient(270deg, #FEFEFF 0%, #FFF5EA 100%)"
                  color="linear-gradient(270deg, #FFB469 0%, #FFCA79 100)%"
                  butColor
                  text="Earn"
                  size="sm"
                  to="/farms" />
              </div>
            </StyledFooter>
          </StyledCardWrapper>
          <Spacer />
          <StyledCardWrapper>
            <StyledCardContent>
              <StyledBalances>
                <StyledBalance>
                  <Spacer size="lg" />
                  <StyledBalanceContent>
                    <div style={{ flex: 1, justifyContent: 'flex-start' }}>
                      <Label color="#ffffff" text="TACO Price" />
                      <Value
                        size="lg"
                        value={ price.toNumber() }
                        symbol="Ξ"
                        decimals={6}
                        color="#ffffff"
                        fontFamily="'PT Sans', sans-serif"
                        fontWeight='bold'
                        linearBg
                      />
                    </div>
                    <StyledConvertions>
                      <StyledParagraph color="#ffffff">
                        <Value
                          value={ price.times(etherPrice).toNumber() }
                          symbol="$"
                          size="sm"
                          decimals={4}
                          color="#ffffff"
                        />
                      </StyledParagraph>
                    </StyledConvertions>
                  </StyledBalanceContent>
                </StyledBalance>
              </StyledBalances>
              <Footnote color="#ffffff">
                LP: &nbsp;
                  <Value
                  value={ liquidityWETH.toNumber() }
                  symbol="Ξ"
                  decimals={2}
                  size="sm"
                  color="#ffffff"
                />
                  &nbsp;/&nbsp;
                  <Value
                  value={ liquidityTACO.toNumber() }
                  symbol="TACO"
                  decimals={2}
                  size="sm"
                  color="#ffffff"

                />
              </Footnote>
            </StyledCardContent>
            <StyledFooter>
              <StyledButtonDiv>
                <div style={{ width: '96px', marginRight: '17px' }}>
                  <Button
                    background="linear-gradient(270deg, #FEFEFF 0%, #FFF5EA 100%)"
                    color="linear-gradient(270deg, #FFB469 0%, #FFCA79 100%)"
                    butColor
                    text="Buy"
                    size="sm"
                    href="https://app.uniswap.org/#/swap?outputCurrency=0x41C028a4C1F461eBFC3af91619b240004ebAD216"
                  />
                </div>
                <div style={{ width: '96px' }}>
                  <Button
                    secondary={true}
                    text="Analytics"
                    size="sm"
                    href="https://uniswap.info/pair/0xd34361f7830fdf2ca6d7023a32a776db39762ce9"
                  />
                </div>
              </StyledButtonDiv>
            </StyledFooter>
          </StyledCardWrapper>
        </StyledWrapper>

        <Spacer />

        <StyledRight>
          <StyledCardContent background='#FFF7EF' stroke='#FDCF89'>
            <StyledBalanceContent>
              <div>
                <Label text="Total Circulating Supply" />
                <Value
                  size="lg"
                  value={ totalSupply.div(new BigNumber(10).pow(new BigNumber(6))).toNumber() }
                  symbol="M TACO"
                  decimals={0}
                  fontWeight="bold"
                  fontFamily="'PT Sans', sans-serif"
                />
              </div>
              <StyledConvertions>
                <StyledParagraph>
                  <Value
                    value={ totalSupply.times(price).toNumber() }
                    symbol="Ξ"
                    size="sm"
                    decimals={2}
                  />
                </StyledParagraph>
                <StyledParagraph>
                  <Value
                    value={ totalSupply.times(price).times(etherPrice).toNumber() }
                    symbol="$"
                    size="sm"
                    decimals={2}
                    fontFamily="'PT Sans', sans-serif"
                  />
                </StyledParagraph>
              </StyledConvertions>
            </StyledBalanceContent>

            <FootnoteRight>Current emission rate 100 TACO per block</FootnoteRight>
          </StyledCardContent>
          <Spacer />

          <StyledCardContent background='#FFF7EF' stroke='#FDCF89'>
            <StyledBalanceContent>
              <div>
                <Label text="Total Locked Value" />
                <Value
                  size="lg"
                  value={ totalLocked.toNumber() }
                  decimals={2}
                  symbol="Ξ"
                  fontWeight="bold"
                  fontFamily="'PT Sans', sans-serif"
                />
              </div>
              <Spacer size="sm" />
              <StyledConvertions>
                <Value
                  value={ totalLocked.multipliedBy(etherPrice).toNumber() }
                  decimals={2}
                  size="sm"
                  symbol="≈ $"
                  fontFamily="'PT Sans', sans-serif"
                />
              </StyledConvertions>
            </StyledBalanceContent>
          </StyledCardContent>
          {/* </Card> */}
        </StyledRight>
      </StyledDivs>
      <FarmCards
        homeFarmCards={true}
        width="inherit%"
        display="flex"
        padding="0 49px 45px 49px"
        background="#FBFDFF"
        marginTop="125px"
        marginBottom="125px"
        mobilePadding="0 12px 45px 12px"
      />
    </>
  )
}

const StyledConvertions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 8px;
`

const StyledButtonDiv = styled.div`
  display: flex;
`

const StyledParagraph = styled.div`
  color: #614E56;
  position: relative;
  font-family: 'PT Sans', sans-serif;

  &:not(:last-child) {
    margin-bottom: 8px;
  }

  &:before {
    content: '≈';
    position: absolute;
    left: -16px;
    top: -2px;
    color: ${(props) => props.color ? props.color : props.theme.color.grey[400]};
  }
`

const Footnote = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  font-size: 12px;
  padding-top: 10px;
  color: ${(props) => props.color ? props.color : props.theme.color.grey[400]};

  @media (min-width: 1200px) {
    font-size: 14px;
  }
`

const StyledFooter = styled.div`
  box-sizing: border-box;
  border-top: 1px solid #FDCF89;
  width: 100%;
  padding-left: 18px;
  padding-bottom: 18px;
  padding-top: 18px;
`

const FootnoteRight = styled.div`
  font-size: 12px;
  margin-top: 11px;
  color: ${(props) => props.theme.color.grey[400]};
`

const StyledWrapper = styled.div`
  align-items: flex-start;
  display: flex;
  height: inherit;
  width: 60%;
  @media (max-width: 992px) {
    flex-flow: row nowrap;
    align-items: stretch;
    margin-right: 10px;
    width: 100%;
    height: 60%;
  }
  @media (max-width: 692px) {
    flex-direction: column;
    width: 100%;
  }
`

const StyledBalances = styled.div`
  display: flex;
  margin-bottom: 12px;
  width: 100%;
`

const StyledBalance = styled.div`
  width: 100%;
  display: flex;
  /* height: 140px; */
  flex-direction: column;
  align-items: flex-start;
  justify-content: left;
  flex: 1;
  flex-direction: column;
`

const StyledBalanceContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const StyledRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: right;
  height: inherit;
  width: 40%;
  @media (max-width: 992px) {
    width: 100%;
  }
`

const StyledCardContent = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: ${(props) => props.theme.spacing[3]}px;
  padding-top: 16px;
  padding-left: 32px;
  background:${({ background }) =>
    background ? background : 'linear-gradient(270deg, #fabc7e 0%,  #FDCF89 100%)'}; 
  border-radius: 11px;
  stroke: ${({ stroke }) =>
    stroke ? stroke : ''} ;
      border: 1px solid #FDCF89;
`

const StyledDivs = styled.div`
  display: flex;
  justify-content: space-between;
  height: 295px;
  @media (max-width: 1250px) {
    /* width: 80%;
    padding-left: 10%; */
  }
  @media (max-width: 992px) {
    width: 80%;
    padding-left: 10%;
    height: auto;
    flex-direction: column;
  }
  @media (max-width: 692px) {
    width: 94%;
    padding-left: 3%;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: flex-start;
  width: 50%;
  height: 100%;
  border-radius: 11px;
  background: linear-gradient(270deg, #fabc7e 0%,  #FDCF89 100%);
  @media (max-width: 692px) {
    width: 100%;
  }
`

const StyledAccountPendingRewardsContainer = styled.span`
  font-family: 'PT Sans', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  letter-spacing: 0.4px;
  color: #614E56;
`

export default Balances
