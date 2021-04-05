import React from "react";
import styled from "styled-components"
import Container from "../../components/Container";
import Page from "../../components/Page";
import PageHeader from "../../components/PageHeader";
import Spacer from "../../components/Spacer";
import Balances from "./components/Balances";

const Home = () => {
  return (
    <>
      <Spacer size="lg" />
      <Page>
        <PageHeader
          padding="48px 0 48px 48px"
          title="Claim your very own TACOs"
          subtitle="Stake UNI V2 LP and TACO LP tokens"
        />
        <Spacer />
        <Container size="md">
          <Balances />
        </Container>
        <Spacer size="lg" />
        <StyledDiv>
          <Container maxWidth="750px">
            <Spacer />
            <StyledInfo>No ETH? Buy with credit card!</StyledInfo>
            <Spacer />
            <iframe
              style={{maxWidth:"750px", border: '0' }}
              title="Coinify"
              src="https://trade-ui.coinify.com/widget?partnerId=159&primaryColor=blue&fontColor=gray&cryptoCurrencies=BTC,ETH,XLM,USDT&defaultCryptoCurrency=ETH"
              width="100%"
              height="450px"
              allow="camera"
            />
          </Container>
        </StyledDiv>
      </Page>
    </>
  );
}

const StyledDiv = styled.div`
  width: 100%;
  max-width: 750px;
  margin-bottom: 50px;
`

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.grey[500]};
  font-size: 30px;
  font-family: 'Fira Sans', serif;
  margin: 0;
  padding: 0;
  text-align: center;

  > b {
    color: ${(props) => props.theme.color.grey[600]};
  }
`

export default Home;
