import React from 'react'
import styled from 'styled-components'
import {ReactComponent as CloseIcon} from "../../assets/img/feather_x.svg";

const ModalTitle = ({ text, height, onDismiss }) => (
    <>
      <StyledIconWrapper onClick={onDismiss}>
        <CloseIcon/>
      </StyledIconWrapper>
      <StyledModalTitle height={height}>
        {text}
  </StyledModalTitle>
  </>
)

const StyledModalTitle = styled.div`
  align-items: center;
  color: ${props => props.theme.color.grey[600]};
  display: flex;
  font-size: 20px;
  font-weight: bold;
  height: ${({theme, height}) => height ? height : theme.topBarSize}px;
  justify-content: center;
  font-family: 'PT Sans', sans-serif;
`
const StyledIconWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  cursor: pointer;
  padding-top: 24px;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
      padding: 24px 24px 0 0;
  }
`

export default ModalTitle