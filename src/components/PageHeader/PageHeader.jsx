import React from 'react'
import styled from 'styled-components'

import Container from '../Container'
import { ContainerProto } from '../Container/Container'


const PageHeader = ({ icon, subtitle, title, padding, fontFamily}) => {
  return (
    <Container size="md">
      <StyledPageHeader padding={padding}  fontFamily={fontFamily}>
        <StyledHeader>
          {icon && <StyledIcon>{icon}</StyledIcon>}
          <div style={{display:"flex",flexDirection:"column"}}>
            {title && <StyledTitle>{title}</StyledTitle>}
            {subtitle && <StyledSubtitle>{subtitle}</StyledSubtitle>}
          </div>
        </StyledHeader>
      </StyledPageHeader>
    </Container>
  )
}

export const PageHeaderProto = ({ icon, subtitle, title, padding, fontFamily }) => {
  return (
    <ContainerProto size="md">
      <StyledPageHeader padding={padding} fontFamily={fontFamily}>
        <StyledHeader>
          {icon && <StyledIcon>{icon}</StyledIcon>}
          {/* <Spacer size="lg" /> */}
          <div style={{display:"flex",flexDirection:"column"}}>
            {title && <StyledTitle fontFamily={fontFamily}>{title}</StyledTitle>}
            <StyledSubtitle fontFamily={fontFamily}>{subtitle}</StyledSubtitle>
          </div>
        </StyledHeader>
      </StyledPageHeader>
    </ContainerProto>
  )
}


const StyledPageHeader = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  flex-direction: ${({flexDirection}) => flexDirection ? flexDirection : "column"};
  padding: ${({padding}) => padding ? padding : "48px 0"};
  h1 {
    font-family: ${({fontFamily}) => fontFamily ? fontFamily : 'PT Sans'};
  }
  margin: 0 auto;
`

const StyledIcon = styled.div`
  margin-right: 24px;
  line-height: 72px;
  text-align: center;
  font-size: 72px;
  img {
    width:45px;
  }
`


const StyledHeader = styled.div`
  display: flex;
`

const StyledTitle = styled.h1`
  color: ${(props) => props.theme.color.grey[600]};
  font-size: 36px;
  font-weight: 700;
  line-height: 30px;
  font-family: ${({fontFamily}) => fontFamily ? fontFamily : 'PT Sans'};
  margin: 0;
  padding: 0;
  @media (max-width: 800px) {
    font-size: 24px;
  }  
  @media (max-width: 355px) {
    font-size: 20px;
  }
`

const StyledSubtitle = styled.h3`
  color: ${(props) => props.theme.color.grey[400]};
  font-size: 24px;
  font-style: normal;
  font-weight: normal;
  margin: 10px 0 0 0;
  padding: 0;
  text-align: left;
  font-family: ${({fontFamily}) => fontFamily ? fontFamily : '"PT Sans", sans-serif'};
  @media screen and (max-width: 800px) {
    font-size: 18px;
  }
  @media (max-width: 355px) {
    font-size: 15px;
  }
`

export const StyledSubtitleProto = styled(StyledSubtitle)`
  background-color:#9ddb97;
  font-size: 14px;
  padding: 15px 70px; 
  text-align: center;
  margin-top: 25px;
  margin-bottom: 25px;
  @media (max-width: 678px) {
    padding-top: 110px;
  }
`

export default PageHeader
