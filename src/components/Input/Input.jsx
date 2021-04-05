import React from 'react'
import styled from 'styled-components'


const Input = ({
  endAdornment,
  onChange,
  placeholder,
  startAdornment,
  value,
}) => {
  return (
    <StyledInputWrapper>
      {!!startAdornment && startAdornment}
      <StyledInput placeholder={placeholder} value={value} onChange={onChange} />
      {!!endAdornment && endAdornment}
    </StyledInputWrapper>
  )
}

const StyledInputWrapper = styled.div`
  align-items: center;
  background-color: #FFF7EF;
  border-radius: ${props => props.theme.borderRadius}px;
  display: flex;
  height: 72px;
  border: 2px solid transparent;
  padding: 0 ${props => props.theme.spacing[3]}px;
  &:focus-within {
    border: 2px solid #FDCF89;
  }
  transition: all .3s ease;
`

const StyledInput = styled.input`
  background: none;
  border: 0;
  color: ${props => props.theme.color.grey[600]};
  font-size: 18px;
  flex: 1;
  height: 56px;
  margin: 0;
  padding: 0;
  outline: none;
`

export default Input