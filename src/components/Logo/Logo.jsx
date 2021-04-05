import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import jar from '../../assets/img/taco.png'

const Logo = () => {
  return (
    <StyledLogo to="/">
      <img src={jar} alt="TacoSwap" />
      <StyledText>
        TacoSwap <StyledSpan>MasterChief</StyledSpan>
      </StyledText>
    </StyledLogo>
  )
}

const StyledLogo = styled(Link)`
  align-items: center;
  display: flex;
  justify-content: left;
  min-height: 53px;
  min-width: 44px;
  padding: 0;
  text-decoration: none;
  img, svg {
    height: 44px;
    margin-right: 8px;
    @media (max-width: 521px) {
      height: 35px;
    }
  }
`

const StyledText = styled.p`
  margin: 0;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 23px;
  color: #614E56;
  font-family: 'PT Sans', sans-serif;
  @media (max-width: 521px){
    font-size: 15px;
  }
`

const StyledSpan = styled.span`
  font-style: normal;
  font-size: 22px;
  color: #614E56;
  font-family: 'Fira Sans', serif;
  font-weight: bold;
   @media (max-width: 521px){
    font-size: 18px;
  }
`

export default Logo
