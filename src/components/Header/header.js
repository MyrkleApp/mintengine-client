import styled from 'styled-components'

export const Root = styled.header`
  height: 85px;
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
    font-size: 24px;
    text-decoration: none;
  }

  & .right a {
    color: white;
    font-size: 20px;
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
