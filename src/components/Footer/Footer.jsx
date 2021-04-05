import React from 'react'
import styled from 'styled-components'
import Container from '../Container'


import Nav from './components/Nav'

const Footer = () => (
  <StyledFooter>
      <Container size="lg">
        <StyledFooterInner>
          <Nav />
        </StyledFooterInner>
    </Container>
  </StyledFooter>
)

const StyledFooter = styled.footer`
  border-top:1px solid #FADDBC;
  justify-content: center;
  display: flex;
  align-items: center;
`
const StyledFooterInner = styled.div`
  align-items: center;
  display: flex;
  max-width: ${props => props.theme.siteWidth}px;
  flex-direction: column;
  width: 100%;
`

export default Footer