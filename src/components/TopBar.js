import React from 'react'
import styled from 'styled-components'

const StyledNavBar = styled.div`
  display: flex;
  margin: 0px;
  background: #eceff4cc;
`
const StyledHeader = styled.h2`
  margin: auto;
  padding: 10px;
  color: rgba(80, 80, 80, 0.8);
  font-size: 1.7em;
  text-shadow: 0px 1px 2px slategray;
  font-weight: normal;
`

const TopBar = () => {
  return (
    <StyledNavBar>
      <StyledHeader>E-commerce site</StyledHeader>
    </StyledNavBar>
  )
}

export default TopBar
