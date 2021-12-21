import styled from 'styled-components'

export const Root = styled.header`
  height: 70px;
  background-color: #0EB56F;
  display: flex;
  justify-content: center;

  & .container {
    width: 75%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    font-weight: bold;
  }

  & .left a {
    color: white;
    text-decoration: none;
  }

  & .right a {
    color: white;
    text-decoration: none;
  }

  & .right.hideRight {
    display: none;
  }
`

export const WhiteStripe = styled.div`
    height: 30px;
    background-color: white;
`
