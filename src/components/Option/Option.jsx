import React from 'react';
import styled, {css} from 'styled-components'
import Loader from "../Loader";

const Option = ({icon, onClick, active, id, color, header, status}) => {
    return (
        <>
            {status === 'connecting' && active ?
                <StyledContainer id={id} onClick={onClick}>
                    <HeaderText color={color}>
                        Initializing...
                    </HeaderText>
                    <StyledIconWrapper>
                        <Loader size='24px'/>
                    </StyledIconWrapper>
                </StyledContainer>
                :
                <StyledContainer id={id} onClick={onClick} active={active}>
                    <HeaderText color={color}>
                        {header}
                    </HeaderText>
                    <StyledIconWrapper>
                        <img src={icon} alt=""/>
                    </StyledIconWrapper>
                </StyledContainer>
            }
        </>
    );
};

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 16px;
  border: 1px solid #F0EFFB;
  padding: 18px 25px;
  cursor: pointer;
  margin-bottom: ${({marginBottom}) => marginBottom ? '' : '14px'};
  transition: all .3s ease;

  &:hover {
     border: ${({active}) => active ? '' : '1px solid #614E56'};
  }
  ${({active}) => active ?
    css`
      background: #614E56;
      p {
        color: #FFFFFF;
      }
    `
    :
    ''
}
`


const HeaderText = styled.p`
  font-size: 16px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-style: normal;
  color: #11142D;
  margin: 0;
`
const StyledIconWrapper = styled.div`
    display: contents;
    img {
      width: 24px;
    }
`

export default Option;