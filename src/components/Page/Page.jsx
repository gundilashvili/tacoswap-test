import React from 'react'
import styled from 'styled-components'
import Footer from '../Footer'

const Page = ({ children }) => (
  <StyledPage>
    <StyledMain>{children}</StyledMain>
    <Footer />
  </StyledPage>
)

const StyledPage = styled.div`
`

const StyledMain = styled.div`
  align-items: center;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - ${(props) => props.theme.topBarSize * 2}px);
  @media screen and (max-width: 768px) {
    min-height: calc(100vh - ${(props) => props.theme.topBarSize}px);
  }
`

export default Page
