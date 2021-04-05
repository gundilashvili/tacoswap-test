import React from 'react'
import styled from 'styled-components'

const CardTitle = ({ text,padding }) => (
  <StyledCardTitle padding={padding}>{text}</StyledCardTitle>
)

const StyledCardTitle = styled.div`
  color: ${(props) => props.theme.color.grey[600]};
  font-size: 24px;
  font-weight: 700;
  padding: ${({theme, padding}) => padding ? padding :`${theme.spacing[4]}px`};
  text-align: center;
  font-family: 'PT Sans', sans-serif;
`

export default CardTitle