import React from 'react'
import styled from 'styled-components'

const ModalContent = ({ children, padding }) => {
  return <StyledModalContent padding={padding}>{children}</StyledModalContent>
}

const StyledModalContent = styled.div`
  padding: ${({theme, padding}) => padding ? padding : `${theme.spacing[4]}px`};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    flex: 1;
    overflow: auto;
  }
`

export default ModalContent
