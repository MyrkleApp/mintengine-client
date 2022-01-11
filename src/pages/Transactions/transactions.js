import styled from 'styled-components'

const Box = styled.div`
    box-shadow: 0px 8px 8px rgba(14, 181, 111, 0.06);
    background-color: white;
`

export const Transactions = styled(Box)`
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

export const TableBox = styled(Box)`
    border-radius: 0 0 20px 20px;
    margin-bottom: 40px;
    min-height: 600px;
    overflow-x: auto;
`