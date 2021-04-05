import styled from 'styled-components'

export const StyledButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 865px) {
    margin-top: 30px;
  }
`

export const StyledIcon = styled.div`
  width: ${({ width }) => (width ? width : '12px')};
  height: ${({ height }) => (height ? height : '15px')};
  margin-right: ${({ marginRight }) => (marginRight ? marginRight : '10px')};
  padding-top: ${({ paddingTop }) => (paddingTop ? paddingTop : '0')};
  padding-left: ${({ paddingLeft }) => (paddingLeft ? paddingLeft : '0')};
  display: flex;
  align-items: center;
  img {
    width: 100%;
  }
`