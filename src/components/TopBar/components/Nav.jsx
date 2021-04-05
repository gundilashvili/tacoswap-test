import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styled, { css } from 'styled-components'
import AccountButton from '../components/AccountButton'
import { useScrollingElement } from "../../../hooks/useScrollingElement";

const Nav = () => {
  const [trigger, setTrigger] = useState(false);
  const openNav = () => {
    setTrigger(prev => !prev);
  };
  useScrollingElement(trigger)
  return (
    <>
      <StyledNav className={`${trigger ? 'active' : ''}`} maxHeight={trigger}>
        <StyledLink exact activeClassName="active" to="/" onClick={() => setTrigger(false)}>
          Home
        </StyledLink>
        <StyledLink exact activeClassName="active" to="/farms" onClick={() => setTrigger(false)}>
          Farm
        </StyledLink>
        <StyledLink exact activeClassName="active" to="/staking" onClick={() => setTrigger(false)}>
          Staking
        </StyledLink>
        <StyledAbsoluteLink href="https://exchange.tacoswap.io/#/swap" target="_blank" onClick={() => setTrigger(false)}>
          Exchange
        </StyledAbsoluteLink>
        <StyledAbsoluteLink href="https://medium.com/@tacoswaps/1b2af61d530f" target="_blank">
          About
          {/* <sup><ArrowIcon /> </sup> */}
        </StyledAbsoluteLink>
        <StyledAbsoluteLink href="https://vote.tacoswap.io/#/" target="_blank">
          Governance
          {/* <sup><ArrowIcon /> </sup> */}
        </StyledAbsoluteLink>
        <StyledButton onClick={() => setTrigger(false)}>
          <AccountButton />
        </StyledButton>
      </StyledNav>

      <StyledBurgerMenuWrapper trigger={trigger} onClick={() => openNav()}>
        <span />
        <span />
        <span />
      </StyledBurgerMenuWrapper>
    </>
  )
}

const StyledButton = styled.div`
  display: block;
  margin: 58px auto 0;
  @media screen and (min-width: 921px) {
    display:none;
  }
`

const StyledBurgerMenuWrapper = styled.div`
  width: 16px;
  height: 16px;
  display: block;
  @media screen and (min-width: 921px) {
    display: none;
  }
  position: relative;
  float: right;
  transform: rotate(0deg);
  transition: .5s ease-in-out;
  cursor: pointer;

  span {
    display: block;
    position: absolute;
    height: 2px;
    width: 16px;
    border-radius: 9px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: .25s ease-in-out;
    background-color: #1D1812;
    }
    ${({ trigger }) => trigger ?
    css`
    span:nth-child(1) {
    top: 7px;
    transform: rotate(135deg);
    }
    span:nth-child(2) {
    opacity: 0;
    }
    span:nth-child(3) {
    top: 7px;
    transform: rotate(-135deg);
    }
    `
    :
    css`
    span:nth-child(1) {
    top: 0px;
    }
    span:nth-child(2) {
    top: 6px;
    }
    span:nth-child(3) {
    top: 12px;
    }
  `};
`

const StyledNav = styled.nav`
  align-items: flex-start;
  display: flex;
  @media (max-width: 920px) {
    position: fixed;
    top: 73px;
    left: 150%;
    right: 0;
    flex-direction: column;
    bottom: 0;
    transition: all 0.5s ease;
    z-index: 100;
    opacity: 0.9;
    background: #FFF0DF;
    &.active {
      left: 0; 
    }
  }
`

const StyledLink = styled(NavLink)`
  color: ${(props) => props.theme.color.grey[400]};
  font-weight: 400;
  font-size: 16px;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  font-family: 'PT Sans', sans-serif;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
  }
  &.active {
    color: #614E56;
    font-weight: 800;
    text-decoration: underline;
  }
  @media screen and (max-width: 920px) {
    float: left;
    display: block;
    text-align: center;
    padding: 24px 47px 0;
  }
`

const StyledAbsoluteLink = styled.a`
  color: ${(props) => props.theme.color.grey[400]};
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  font-weight: 400;
  font-size: 16px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
  }
  &.active {
    color: ${(props) => props.theme.color.primary.main};
  }
  @media (max-width: 400px) {
    padding-left: ${(props) => props.theme.spacing[2]}px;
    padding-right: ${(props) => props.theme.spacing[2]}px;
  }

  sup {
    position: absolute;
    top: 17px;
  }
  @media screen and (max-width: 920px) {
    float: left;
    display: block;
    text-align: center;
    padding: 24px 46px 0;
    sup {
      position: relative;
      top: 0
    }
  }
`

export default Nav
