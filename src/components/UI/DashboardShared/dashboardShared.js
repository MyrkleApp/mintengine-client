import styled from 'styled-components'

const Box = styled.div`
    box-shadow: 0px 8px 8px rgba(14, 181, 111, 0.06);
    background-color: white;
`

export const HeaderBox = styled(Box)`
    padding: 15px 20px 0px 25px;
    margin: 30px auto 20px auto;
    border-radius: 20px 20px 0 0;
    & > h2 {
        color: #043923;
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 40px;
    }
`

export const BoxContainer = styled(Box)`
    width: 100%;
    height: auto;
    border-radius: 25px;
    padding-bottom: 50px;
    margin-bottom: 30px;
    & > .container {
        width: calc(100% - 50px);
        height: calc(100% - 50px);
        padding-top: 20px;
        margin: auto;
    }
`

export const Title = styled.h2`
    color: #043923;
    font-weight: 600;
    font-size: 22px;
    text-transform: uppercase;
`

export const Description = styled.p`
    color: #3E554B;
    line-height: 24px;
    font-size: 16px;

`

export const TableBox = styled(Box)`
    border-radius: 0 0 20px 20px;
    margin-bottom: 40px;
    min-height: 600px;
    overflow-x: auto;
`