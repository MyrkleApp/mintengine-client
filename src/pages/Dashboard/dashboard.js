import styled from 'styled-components'

export const Container = styled.div`
    width: calc(100% - 50px);
    margin: 0 auto;
`

export const SendAsset = styled.div`
    width: 100%;
    height: 600px;
    background-color: white;
    border-radius: 25px;
    & > .container {
        width: calc(100% - 50px);
        height: calc(100% - 50px);
        padding-top: 40px;
        margin: auto;
    }
`