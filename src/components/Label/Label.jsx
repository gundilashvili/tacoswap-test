import React from 'react'
import styled from 'styled-components'


const Label = ({ text, color, fontFamily }) => (
  <StyledLabel color={color} fontFamily={fontFamily} >{text}</StyledLabel>
)

const StyledLabel = styled.div`
  color: ${(props) =>props.color ? props.color : props.theme.color.grey[400]};
  margin-bottom: 8px;
  font-size: 16px;
  font-style: normal;
  font-weight: normal;
  font-family: ${({fontFamily})=> fontFamily ? fontFamily : "'PT Sans', sans-serif "};
  @media (max-width: 768px) {
    font-size: 14px;
  }
`

export default Label
