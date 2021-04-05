import React from 'react'
import styled from 'styled-components'

import Spacer from '../Spacer'

const ModalActions = ({ children, flex, padding }) => {
  const l = React.Children.toArray(children).length
  return (
    <StyledModalActions padding={padding}>
      {React.Children.map(children, (child, i) => (
        <>
          <StyledModalAction flex={flex}>
            {child}
          </StyledModalAction>
          {i < l - 1 && <Spacer />}
        </>
      ))}
    </StyledModalActions>
  )
}

const StyledModalActions = styled.div`
  align-items: center;
  background-color: ${props => props.theme.color.grey[100]}00;
  display: flex;
  margin: 0;
  justify-content: center;
  padding: ${({theme, padding}) => padding ? padding : `${theme.spacing[4]}px`};
`

const StyledModalAction = styled.div`
  flex:${({flex}) => flex ? flex : 1};
`

export default ModalActions