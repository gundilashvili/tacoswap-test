import React from 'react'
import styled from 'styled-components'


const CardContent = ({
    children,
    flexDirection,
    justifyContent,
    alignItems,
    padding,
    borderBottom
}) => (
    <StyledCardContent
        flexDirection={flexDirection}
        justifyContent={justifyContent}
        alignItems={alignItems}
        borderBottom={borderBottom}
        padding={padding}
    >
        {children}
    </StyledCardContent>
)

const StyledCardContent = styled.div`
  flex-direction:${({ flexDirection }) => flexDirection ? flexDirection : ' column'};
  justify-content: ${({ justifyContent }) => justifyContent};
  display: flex;
  align-items: ${({ alignItems }) => alignItems};
  border-bottom: ${({ borderBottom }) => borderBottom};
  flex: 1;
  padding: ${({ theme, padding }) => padding ? padding : theme.spacing[3]}px;
`

export default CardContent
