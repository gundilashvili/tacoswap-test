import React from 'react'
import styled, { css, keyframes } from 'styled-components'


const Modal = ({ children, walletProvider }) => {
  return (
    <StyledResponsiveWrapper walletProvider={walletProvider}>
      <StyledModal walletProvider={walletProvider}>{children}</StyledModal>
    </StyledResponsiveWrapper>
  )
}

const mobileKeyframes = keyframes`
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(-100%);
  }
`

const keyFrame = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`

const StyledResponsiveWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  width: 100%;
  max-width: 512px;
  animation: ${keyFrame} 0.3s forwards ease-out;
  @media (max-width: 576px) {
    ${({ walletProvider }) => walletProvider ?
    css`
            width: 100%;
            position: absolute;
            border-radius: 0;
            top: 0;
            bottom: 0;
          `
    :
    css`
           max-width: 576px;
           flex: 1;
           position: absolute;
           top: 100%;
           right: 0;
           left: 0;
           max-height: calc(100% - ${(props) => props.theme.spacing[4]}px);
           animation: ${mobileKeyframes} 0.3s forwards ease-out;
        `
  } 
  }
`

const StyledModal = styled.div`
  padding: 0 20px;
  background: #FFFFFF;
  border: 1px solid ${(props) => props.theme.color.grey[300]}ff;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  min-height: 0;
  @media (max-width: 576px) {
    ${({ walletProvider }) => walletProvider ?
    css`
          height: 100vh;
          width: 95%;
` :
    css` width: 95%;
    border-radius: 0;`
  }
   
  }
`

export default Modal
