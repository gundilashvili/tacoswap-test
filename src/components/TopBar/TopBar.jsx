import React from 'react'
import styled from 'styled-components'

import Container from '../Container'
import Logo from '../Logo'

import AccountButton from './components/AccountButton'
import Nav from './components/Nav'


const TopBar = () => {
  return (
    <StyledTopBar>
      <Container size="lg">
        <StyledTopBarInner>
          <StyledLogoWrapper>
            <Logo />
          </StyledLogoWrapper>
          <Nav />
            <AccountButton display='none'/>
        </StyledTopBarInner>
      </Container>
    </StyledTopBar>
  )
}

const StyledLogoWrapper = styled.div`
  @media (max-width: 400px) {
    width: auto;
  }
  @media (max-width: 360px) {
    width: 240px;
  }
`

const StyledTopBar = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #FADDBC;
  height: 72px;
  @media screen and (max-width: 678px) {
    opacity: 0.98;
    position: fixed;
    z-index: 100;
    background: #FFF0DF;
    padding-left: 24px;
    padding-right: 24px;
  }
`

const StyledTopBarInner = styled.div`
  display: flex;
  align-items: center;
  height: ${(props) => props.theme.topBarSize}px;
  justify-content: space-between;
  max-width: ${(props) => props.theme.siteWidth}px;
  width: 100%;
`

export default TopBar
