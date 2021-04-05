import React, { useContext } from 'react'
import { Context as FarmsContext } from '../../../contexts/Farms';
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import Button from '../../../components/Button/'
import Card from '../../../components/Card/Card'
import CardContent from '../../../components/CardContent/CardContent'
import Loader from '../../../components/Loader/Loader'
import { Link } from 'react-router-dom'
import Container from "../../../components/Container"
import Value from '../../../components/Value'

const FarmCards = ({
  width,
  homeFarmCards,
  background,
  mobilePadding,
  display,
  marginTop,
  padding,
}) => {
  const { stakedValue, farms } = useContext(FarmsContext);

  const tacoIndex = farms.findIndex(
    ({ tokenSymbol }) => tokenSymbol === 'TacoToken',
  )

  const tacoPrice =
    tacoIndex >= 0 && stakedValue[tacoIndex]
      ? stakedValue[tacoIndex].tokenPriceInWeth
      : new BigNumber(0)


  const BLOCKS_PER_DAY = new BigNumber(6700)
  const BLOCKS_PER_YEAR = BLOCKS_PER_DAY.times(365)
  const TACO_PER_BLOCK = new BigNumber(100)

  const rows = farms.reduce(
    (farmRows, farm, i) => {
      const farmWithStakedValue = {
        ...farm,
        ...stakedValue[i],
        apy: stakedValue[i]
          ? tacoPrice
            .times(TACO_PER_BLOCK)
            .times(BLOCKS_PER_YEAR)
            .times(stakedValue[i].poolWeight)
            .div(stakedValue[i].totalWethValue)
          : null,
        dailyTaco: stakedValue[i] ? BLOCKS_PER_DAY.times(TACO_PER_BLOCK).times(stakedValue[i].poolWeight) : new BigNumber(0),
      }
      const newFarmRows = [...farmRows]
      if (newFarmRows[newFarmRows.length - 1].length === 12) {
        newFarmRows.push([farmWithStakedValue])
      } else {
        newFarmRows[newFarmRows.length - 1].push(farmWithStakedValue)
      }
      return newFarmRows
    },
    [[]],
  )

  return (
    <>
      {homeFarmCards ? (
        <StyledCard
          width={width}
          background={background}
          mobilePadding={mobilePadding}
          padding={padding}
          display={display}
          marginTop={marginTop}
        >
          <StyledHeading>TOP POOLS</StyledHeading>
          {!!rows[0].length ? (
            rows.map((farmRow, i) => (
              <StyledRow marginBottom="0" key={i}>
                {farmRow.map((farm, j) => {
                  // return j <= 2 ? (
                  return farm.pid === 0 || farm.pid === 8 || farm.pid === 10 ? (
                    <React.Fragment key={j}>
                      <FarmCard width='29' key={farm.lpTokenName} farm={farm} />
                    </React.Fragment>
                  ) : null
                })}
              </StyledRow>
            ))
          ) : (
              <StyledLoadingWrapper>
                <Loader text="Cooking the tacos ..." />
              </StyledLoadingWrapper>
            )}
          <StyledLink to="./farms">View All</StyledLink>
        </StyledCard>
      ) : (
          <Container size="lg">
            {!!rows[0].length ? (
              rows.map((farmRow, i) => (
                <StyledRow key={i}>
                  {farmRow.map((farm, j) => (
                    <React.Fragment key={j}>
                      <FarmCard farm={farm} />
                    </React.Fragment>
                  ))}
                </StyledRow>
              ))
            ) : (
                <StyledLoadingWrapper>
                  <Loader text="Cooking the rice ..." />
                </StyledLoadingWrapper>
              )}
          </Container>
        )}
    </>
  )
}


const FarmCard = ({ farm, width }) => {

  const isLP = farm.lpTokenAddress !== farm.tokenAddress; 
  let infoLink = `https://app.sushi.com/pair/${farm.lpTokenAddress}`;
  if (farm.id.indexOf('UNI') !== -1) {
    infoLink = `https://info.uniswap.org/pair/${farm.lpTokenAddress}`;
  }
  if (!isLP) {
    infoLink = `https://info.uniswap.org/token/${farm.lpTokenAddress}`;
  }
  if(farm.pid === 0){
    infoLink = `https://exchange.sushi.com/#/swap?outputCurrency=${farm.lpTokenAddress}`
  }
 
 
  return (
    <StyledCardWrapper width={width}>
      <Card>
        <StyledUpper>
          <StyledPercentage>{Math.round( farm.poolWeight * 100)}%</StyledPercentage>
          <div
            style={{
              fontSize: '12px',
              padding: '10px 16px 0 0',
              mixBlendMode: 'normal',
              opacity: '0.6px',
              color: '#614E56',
            }}
          >
            ≈ {Math.round(farm.dailyTaco).toLocaleString()} TACO per day
            </div>
        </StyledUpper>
        <CardContent>
          <StyledContent>
            <StyledTitleDiv>
              <StyledIconDiv>{farm.icon}</StyledIconDiv>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <StyledTitle>{farm.name}</StyledTitle>
                <div>
                  <StyledParagraph>
                    Deposit {farm.lpToken.toUpperCase()} <br /> Earn{' '}
                    {farm.earnToken.toUpperCase()}
                  </StyledParagraph>
                </div>
              </div>
            </StyledTitleDiv>
            <StyledDetails />
            <StyledInsight>
              <StyledInsightText>
                <span>APR</span>
                <span>
                  {farm.apy
                    ? `${
                      Math.round(parseFloat(farm.apy.times(new BigNumber(100)))).toLocaleString('en-US') 
                      // farm.apy
                      // .times(new BigNumber(100))
                      // .toNumber()
                      // .toLocaleString('en-US')
                    }%`
                    : 'Loading ...'}
                </span>
              </StyledInsightText>
            </StyledInsight>
            <StyledParagraphDiv>
              <StyledParagraph>Total Staked</StyledParagraph>
            </StyledParagraphDiv>
            <StyledLower>
              <StyledStakedContainer>
                {farm.baseTokenAmount?.toNumber() ? <StyledStakedContent>{farm.tokenSymbol}</StyledStakedContent> : null}
                {farm.baseTokenAmount?.toNumber() ? <StyledStakedContent textAlign="end" fontWeight="600">
                  <Value
                    size="sm"
                    value={farm.baseTokenAmount.toNumber()}
                    decimals={0}
                  />
                </StyledStakedContent> : null}
                {farm.quoteTokenAmount?.toNumber() ? <StyledStakedContent>{farm.quoteTokenSymbol}</StyledStakedContent> : null}
                {farm.quoteTokenAmount?.toNumber() ? <StyledStakedContent textAlign="end" fontWeight="600">
                  <Value
                    size="sm"
                    value={farm.quoteTokenAmount.toNumber()}
                    decimals={2}
                  />
                </StyledStakedContent> : null}
              </StyledStakedContainer>
            </StyledLower>
            {!farm.quoteTokenAmount?.toNumber() ? <div style={{ marginTop: "30px" }} /> : null}
            <StyledStakedContainer margin="20px 0 0 0">
              <StyledFlexItem width="50%">
                <Button
                  size="sm"
                  text="Select"
                  to={`/farms/${farm.id}`}
                />
              </StyledFlexItem>
              <StyledFlexItem width="50%">
                <Button
                  butColor={true}
                  size="sm"
                  background="transparent"
                  href={infoLink}
                  text={isLP ? "Get LP" : `Get ${farm.lpToken}`}
                />
              </StyledFlexItem>
            </StyledStakedContainer>
          </StyledContent>
        </CardContent>
      </Card>
    </StyledCardWrapper>
  )
}

const StyledUpper = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledStakedContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: ${({ margin }) => margin};
  flex-wrap: wrap;
`

const StyledHeading = styled.h2`
  font-size: 30px;
  color: #614E56;
  margin-bottom: 46px;
  margin-top: 24px;
  font-style: normal;
  font-weight: bold;
  font-family: 'Fira Sans', serif;
`

const StyledFlexItem = styled.div`
  width: ${({ width }) => width};
  display: flex;
  align-items: center;
`
const StyledStakedContent = styled.div`
  margin: 0;
  width: 50%;
  text-align: ${({ textAlign }) => textAlign};
  font-style: normal;
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : 'normal')};
  font-size: 14px;
  line-height: 32px;
  letter-spacing: 0.44px;
  color: #614E56;
  font-family: 'PT Sans', sans-serif;
`

const StyledPercentage = styled.div`
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 74px;
  height: 30px;
  background: linear-gradient(90deg, #fabc7e 0%,  #FF962D 100%);
  font-family: 'PT Sans', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  border-radius: 8px 0px;
`

const StyledIconDiv = styled.div`
  display: flex;
  align-items: center;
  width: 72px;
  height: 72px;
  font-size: 48px;
  justify-content: center;
`

const StyledTitleDiv = styled.div`
  width: 100%;
  margin: 0 16px;
  padding-bottom: 20px;
  border-bottom: 1px solid #FDCF89;
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
`

const StyledParagraphDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: flex-start;
  padding: 0;
`

const StyledParagraph = styled.p`
  margin: 0 10px;
  mix-blend-mode: normal;
  opacity: 0.5;
  font-size: 12px;
  color: #614E56;
  font-family: 'PT Sans', sans-serif;
`

export const StyledCard = styled.div`
  position: relative;
  max-width: 1440px;
  width: ${({ width }) => (width ? width : '100%')};
  /* display: flex; */
  display: ${({ display }) => (display ? display : 'flex')};
  flex-wrap: wrap;
  justify-content: space-between;
  padding: ${({ padding }) => (padding ? padding : '15px 10px 45px')};
  align-items: center;
  flex-direction: column;
  background: ${({ background }) => (background ? background : '')};
  margin-top: ${({ marginTop }) => (marginTop ? marginTop : '0')};
  margin-bottom: ${({ marginBottom }) => (marginBottom ? marginBottom : '0')};
  box-shadow: 0 0 40px rgba(255, 150, 45, 0.1);
  border: 1px solid rgba(255, 150, 45, 0.2);
  border-radius: 16px;
  color: white;
  box-sizing: border-box;
  @media (max-width: 678px) {
    margin: ${({ mobileMargin }) => mobileMargin};
  }

  @media (max-width: 450px) {
    width: ${({ mobileWidth }) => mobileWidth};
    padding: ${({ mobilePadding }) => mobilePadding};
  }
`

export const StyledCardFarm = styled(StyledCard)`
  max-width: 1024px;
  margin-top: 10px;
  @media (max-width: 1024px) {
    border-radius: 0;
  }
`

const StyledLink = styled(Link)`
  font-family: 'PT Sans', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: #614E56;
  text-decoration: none;
`

const StyledLoadingWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
  max-width: 60px;
  margin-bottom: 40px;
`

const StyledRow = styled.div`
  display: flex;
  margin-bottom: ${({ marginBottom }) =>
  marginBottom ? marginBottom : '52px'};
  flex-flow: row wrap;
  justify-content: space-between;
  @media (max-width: 811px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  margin: 0 20px 49px;
  width: ${({ width }) => width ? `${width}%` : '285px'};
  flex-wrap: wrap;
  box-shadow: 0px 0px 16px rgba(254, 212, 148, 0.2);
  @media (max-width: 1080px) {
    width: 44%;
  }
  @media (max-width: 810px) {
    width: 90%;
  }
  position: relative;
`

const StyledTitle = styled.h4`
  color: ${(props) => props.theme.color.grey[600]};
  font-size: 16px;
  padding: 0;
  margin: 0 0 7px 10px;
  font-family: 'PT Sans', sans-serif;
  font-weight: normal;
`

const StyledContent = styled.div`
  align-items: center;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
`

const StyledDetails = styled.div`
  margin-top: ${(props) => props.theme.spacing[2]}px;
  text-align: center;
`

const StyledInsight = styled.div`
  color: white;
  font-size: 20px;
  text-align: center;
  padding: 0px 12px;
  width: 100%;
  box-sizing: border-box;
  margin-top: 10px;
  line-height: 56px;
  background: #FFEDD4 ;
  border-radius: 4px;
  position: relative;
  margin-bottom: 13px;
`

const StyledInsightText = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-family: PT Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 32px;
  position: relative;
  z-index: 1;
  transform: translateY(-1px);
  padding: 3px 0;
  color: #614E56;
  font-family: 'PT Sans', sans-serif;
`

const StyledLower = styled.div`
  width: 86%;
  display: flex;
  flex-direction: column;
  font-size: 14px;
`

export default FarmCards
