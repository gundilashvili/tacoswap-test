import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import formatAddress from "../../../utils/formatAddress";
import CountUp from "react-countup";



const AccountElement = ({account, balance, onClick, height,width, cursor,symbol, fontSize}) => {
    const [start, updateStart] = useState(0)
    const [end, updateEnd] = useState(0)
    useEffect(() => {
        if (typeof balance === 'number') {
            updateStart((prev) => prev)
            updateEnd(balance)
        }
    }, [balance]);
    return (
        <StyledBalanceContainer fontSize={fontSize} balanceCursor={cursor}  height={height} onClick={onClick ? () => onClick() : null}>
            <span>
                <CountUp
                    start={start}
                    end={end}
                    decimals={end < 0 ? 4 : end > 1e5 ? 0 : 3}
                    duration={1}
                    separator=","
                />
                {' '}{symbol}
            </span>
            <StyledAccountContainer fontSize={fontSize} width={width}>
                <span>
                    {formatAddress(account)}
                </span>
            </StyledAccountContainer>
        </StyledBalanceContainer>
    );
};


const StyledBalanceContainer = styled.div`
  width: 100%;
  height: ${({height}) => height}px;
  min-height: 33px;
  background:#FFF7EF;
  border: 1px solid #FDCF89;
  box-sizing: border-box;
  border-radius: 4px;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  cursor: ${({balanceCursor}) => balanceCursor ? 'pointer' : ''};
  >span {
      font-family: 'PT Sans', sans-serif;
      font-style: normal;
      font-size: ${(props)=> (props.fontSize ? props.fontSize : '14px')};
      color: #614E56;
      margin: 0 auto;
      white-space: nowrap;
  }
`

const StyledAccountContainer = styled.div`
  width: ${({width}) => width};
  min-height: 33px;
  height: inherit;
  background: linear-gradient(90deg, #fabc7e 0%,  #FF962D 100%);
  border: 1px solid #FDCF89;
  box-sizing: border-box;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
      font-family: 'PT Sans', sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: ${(props)=> (props.fontSize ? props.fontSize : '14px')};
      letter-spacing: -0.44px;
      color: #FFFFFF;
  }
`

export default AccountElement;