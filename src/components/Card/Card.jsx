import React from 'react'
import styled from 'styled-components'


const Card = ({ children, paddingBottom, boxShadow,backGround, border }) => <StyledCard border={border} backGround={backGround}paddingBottom={paddingBottom} boxShadow={boxShadow}>{children}</StyledCard>

const StyledCard = styled.div`
  padding-bottom: ${({paddingBottom}) => paddingBottom ? `${paddingBottom}px` : 'auto'};
  background: ${(props)=> (props.backGround ? props.backGround : "linear-gradient(to top , #ffffff , #FFEDD4 100%)"  )} ;
  /* box-shadow: ${({boxShadow}) => boxShadow ? 'none' : `8px 8px 9px 2px rgba(0, 0, 0, 0.3)` }; */
  border-radius: 11px;
  display: flex;
  flex: 1;
  flex-direction: column;
  border: ${(props)=>(props.border ? props.border : "1px solid #FDCF89")};
`

export default Card