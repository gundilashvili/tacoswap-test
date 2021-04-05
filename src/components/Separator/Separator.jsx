import React, { useContext, useMemo } from 'react'
import styled, { ThemeContext } from 'styled-components'


const Separator = ({ orientation, stretch }) => {

  const { color } = useContext(ThemeContext)

  let boxShadow = `0 -1px 0px ${color.grey[300]}`
  if (orientation === 'vertical') {
    boxShadow = `-1px 0px 0px ${color.grey[300]}ff`
  }

  const Content = useMemo(() => {
    return <StyledSeparator boxShadow={boxShadow} orientation={orientation} />
  }, [boxShadow, orientation])

  if (stretch) {
    return (
      <div style={{ alignSelf: 'stretch' }}>
        {Content}
      </div>
    )
  }

  return Content
}


const StyledSeparator = styled.div`
  background-color: ${props => props.theme.color.grey[100]};
  box-shadow: ${props => props.boxShadow};
  height: ${props => props.orientation === 'vertical' ? '100%' : '1px'};
  width: ${props => props.orientation === 'vertical' ? '1px' : '100%'};
`

export default Separator