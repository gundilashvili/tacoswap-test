import React from 'react'
import styled from 'styled-components'


const Icon = ({ children, color, size = 24 }) => (
  <StyledIcon>
    {React.isValidElement(children) && React.cloneElement(children, {
      color,
      size,
    })}
  </StyledIcon>
)

const StyledIcon = styled.div`
`

export default Icon