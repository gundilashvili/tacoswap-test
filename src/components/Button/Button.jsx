import React, { useContext } from 'react'
import styled, { css, ThemeContext } from 'styled-components'

import { Link } from 'react-router-dom'


const Button = ({
  children,
  disabled,
  href,
  onClick,
  size,
  text,
  to,
  variant,
  minWidth,
  borderRadius,
  background,
  border,
  width,
  secondary,
  butColor,
  paddingLeft,
  paddingRight,
  margin,
  fontSize,
  iconColor,
}) => {
  const { color, spacing } = useContext(ThemeContext)

  let fontWeight
  let buttonColor
  switch (variant) {
    case 'secondary':
      buttonColor = color.grey[500]
      break
    case 'default':
    default:
      buttonColor = color.primary.main
  }

  let buttonSize
  let buttonPadding
  switch (size) {
    case 'sm':
      buttonPadding = spacing[3]
      buttonSize = 36
      fontSize = 14

      break
    case 'lg':
      buttonPadding = spacing[4]
      buttonSize = 72
      fontSize = 16
      break
    case 'md':
      buttonPadding = spacing[3]
      fontSize = 14
      buttonSize = 36
      break
    case 'icon-button':
      buttonPadding = 13
      fontSize = 14
      break
    default:
      buttonPadding = spacing[4]
      buttonSize = 56
      fontSize = 16
  }

  if (secondary) {
    background = 'transparent'
    border = '1px solid #ffffff'
  }

  if (butColor) {
    buttonColor = '#FF962D'
    fontWeight = '100'
  }

  const ButtonChild = () => {
    if (to) {
      return (
        <StyledLink to={to}>
          <StyledButton
            boxShadow="none"
            color={buttonColor}
            disabled={disabled}
            fontSize={fontSize}
            onClick={onClick}
            padding={buttonPadding}
            size={buttonSize}
            minWidth={minWidth}
            background={background}
            border={border}
            width={width}
            secondary={secondary}
            paddingLeft={paddingLeft}
            paddingRight={paddingRight}
            margin={margin}
            borderRadius={borderRadius}
            iconColor={iconColor}
            fontWeight={fontWeight}
          >
            {children || text}
          </StyledButton>
        </StyledLink>
      )
    } else if (href) {
      return (
        <StyledExternalLink href={href} target="__blank">
          <StyledButton
            boxShadow="none"
            color={buttonColor}
            disabled={disabled}
            fontSize={fontSize}
            onClick={onClick}
            padding={buttonPadding}
            size={buttonSize}
            minWidth={minWidth}
            background={background}
            border={border}
            width={width}
            secondary={secondary}
            paddingLeft={paddingLeft}
            paddingRight={paddingRight}
            margin={margin}
            borderRadius={borderRadius}
            fontWeight={fontWeight}
            iconColor={iconColor}
          >
            {children || text}
          </StyledButton>
        </StyledExternalLink>
      )
    } else {
      return (
        <StyledButton
          boxShadow="none"
          color={buttonColor}
          disabled={disabled}
          fontSize={fontSize}
          onClick={onClick}
          padding={buttonPadding}
          size={buttonSize}
          minWidth={minWidth}
          background={background}
          border={border}
          width={width}
          secondary={secondary}
          paddingLeft={paddingLeft}
          paddingRight={paddingRight}
          margin={margin}
          borderRadius={borderRadius}
          fontWeight={fontWeight}
          iconColor={iconColor}
        >
          <>{children || text}</>
        </StyledButton>
      )
    }
  }

  return (
    <>
      <ButtonChild />
    </>
  )
}


const StyledButton = styled.button`
  box-sizing: border-box;
  position: relative;
  align-items: center;
  background-size: cover;
  background-position: center left;
  border: ${(props) => (props.border ? props.border : 'none')};
  border-radius: ${({ borderRadius }) =>
    borderRadius ? borderRadius : '24px'};
  background: ${(props) =>
    props.background
      ? props.background
      : `linear-gradient(90deg, #fabc7e  0%, #FF962D 100%)`}; 
  box-shadow: ${(props) => props.boxShadow};
  color: ${(props) => (!props.disabled ? props.color : `${props.color}55`)};
  cursor: pointer;
  display: flex;
  padding: ${({ padding }) => padding}px;
  font-family: 'PT Sans', sans-serif;
  font-size: ${({ fontSize }) => fontSize}px;
  font-weight: ${({ fontWeight }) => fontWeight ? fontWeight : "700"};
  height: ${props => props.size}px;
  justify-content: center;
  outline: none;
  padding-left: ${({ paddingLeft }) => paddingLeft}px;
  padding-right: ${({ paddingRight }) => paddingRight}px;
  position: relative;
  margin: ${({ margin }) => (margin ? margin : '')};
  min-width: ${(props) => props.minWidth}px;
  white-space: nowrap;
  width: ${(props) => (props.width ? `${props.width}px` : '100%')};
  &:hover {
    background:${({ background }) =>
    background ? background : 'linear-gradient(270deg, #fabc7e 0%,  #FF962D 100%)'}; 
    background-position: bottom right;
    transition: background-position 0.3s;
  }
  @media (max-width: 414px) {
    height: inherit;
  }

  svg {
    path {
      fill: ${({ iconColor }) => (iconColor ? iconColor : "#FF962D")};
    }
  }

  ${({ disabled }) => disabled ? css`cursor: not-allowed; opacity: 0.3` : css`opacity: 1`}
`

const StyledLink = styled(Link)`
  align-items: center;
  color: inherit;
  display: flex;
  flex: 1;
  /* height: 56px; */
  justify-content: center;
  text-decoration: none;
`

const StyledExternalLink = styled.a`
  align-items: center;
  color: inherit;
  display: flex;
  flex: 1;
  height: 56px;
  justify-content: center;
  height: 100%;
  width: 100%;
  text-decoration: none;
`

export default Button
