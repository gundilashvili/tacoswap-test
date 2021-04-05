import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'


const Container = ({ children, size = 'md' }) => {
  const { siteWidth } = useContext(ThemeContext)
  let width
  switch (size) {
    case 'sm':
      width = siteWidth / 2
      break
    case 'md':
      width = siteWidth * 4 / 5
      break
    case 'lg':
    default:
      width = siteWidth
  }
  return (
    <StyledContainer width={width}>
      {children}
    </StyledContainer>
  )
}


const StyledContainer = styled.div`
  box-sizing: border-box;
  margin: 0 auto;
  max-width: ${props => props.width}px;
  width: 100%;
  @media(min-width: 578px) {
    padding: 0 ${props => props.theme.spacing[4]}px;
  }
`

export const ContainerProto = ({ children, size = 'md' }) => {
  const { siteWidth } = useContext(ThemeContext)
  let width
  switch (size) {
    case 'sm':
      width = siteWidth / 2
      break
    case 'md':
      width = siteWidth * 4 / 5
      break
    case 'lg':
    default:
      width = siteWidth
  }
  return (
    <StyledContainerProto width={width}>
      {children}
    </StyledContainerProto>
  )
}

const StyledContainerProto = styled(StyledContainer)`
  padding: 0;
`

export default Container
