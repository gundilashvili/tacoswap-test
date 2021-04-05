import React, { useState, useEffect, useRef } from 'react'
import CountUp from 'react-countup'

import styled, { css } from 'styled-components'

function usePrevious(value) {
  const ref = useRef(0);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const Value = ({ value, decimals, symbol, size, fontWeight, color, fontFamily, linearBg, smallFontSize }) => {
  const [start, updateStart] = useState(0)
  const [end, updateEnd] = useState(0)

  const previousAmount = usePrevious(value);

  useEffect(() => {
    if (typeof value === 'number') {
      updateStart(() => Number(previousAmount) || 0)
      updateEnd(() => value)
    }
    // eslint-disable-next-line
  }, [value])

  return (
    <StyledValue
      fontFamily={fontFamily}
      color={color}
      fontWeight={fontWeight}
      fontSize={(size === 'sm' ? 14 : size === 'md' ? 24 : size === "lg" ? 34 : 12)}
      linearBg={linearBg}
      smallFontSize={smallFontSize}
    >
      {typeof value == 'string' ? (
        value
      ) : (
          <>
            { symbol && symbol.includes('$') ? <span style={{ marginRight: '4px' }}>{symbol}</span> : null}
            <CountUp
              start={start}
              end={end}
              decimals={
                decimals !== undefined ? decimals : end < 1 ? 8 : end > 1e5 ? 0 : 2
              }
              duration={1}
              separator=","
            />
            { symbol && !symbol.includes('$') ? <small style={{ marginLeft: '4px' }}>{symbol}</small> : null}
          </>
        )}
    </StyledValue>
  )
}


const StyledValue = styled.div`
  font-family: ${({ fontFamily }) => fontFamily ? fontFamily : "'PT Sans', sans-serif "};
  color: ${(props) => props.color ? props.color : props.theme.color.grey[600]};
  font-size: ${(props) => Math.max(12, props.fontSize * .75)}px; 
  font-weight:${({ fontWeight }) => fontWeight ? fontWeight : "normal"};
  
  ${({ linearBg }) => linearBg ?
    css`
      background: -webkit-linear-gradient(270deg, #FEFEFF 0%, #FFF5EA 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    `
    :
    ''
  };
  
  @media (min-width: 1200px) {
    font-size: ${(props) => props.fontSize}px;
  }

  small {
    font-size: ${({ smallFontSize }) => smallFontSize};
    font-weight: bold;
  }
`

export default Value
