import React from 'react'
import styled from 'styled-components'
import Container from '../../components/Container'
import PageHeader from '../../components/PageHeader'

const Farm = () => {
  return (
    <Container size="md">
      <PageHeader
        title="Stake Taco Tokens & Earn Fees"
        subtitle="0.01% of all TacoSwap trades will be rewarded to TACO stakers"
      />
      <StyledMain>
        <StyledH2>
          Comin Soon!
        </StyledH2>
      </StyledMain>
    </Container>
  )
}

const StyledMain = styled.div`
  box-sizing: border-box;
  background: #FBFDFF;
  border-radius: 16px;
  margin-top: 42px;
  margin-bottom: 42px;
  padding: 62px 110px 74px;
  display: flex;
  flex-direction: column;
  font-family: PT Sans;
  font-style: normal;
  color: #614E56;
  justify-content: center;
  align-items: center;
  @media (max-width: 850px) {
    /* margin-top: 100px; */
    padding: 62px 54px 74px;
  }
  @media (max-width: 750px) {
    padding: 62px 24px 74px;
  }
  @media (max-width: 678px) {
    width: 100%;
    border-radius: 0;
    margin-top: 150px;
  }
  @media (max-width: 530px) {
    padding: 62px 11px 74px;
  }
`

const StyledH2 = styled.h2`
  font-size: 24px;
  font-weight: 30px;
  font-weight: bold;
`

export default Farm
