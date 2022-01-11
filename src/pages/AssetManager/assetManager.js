import styled from 'styled-components'

const Box = styled.div`
    box-shadow: 0px 8px 8px rgba(14, 181, 111, 0.06);
    background-color: white;
`

export const ManageAssets = styled(Box)`
    padding: 20px 20px 35px 20px;
    margin: 30px auto 20px auto;
    border-radius: 20px;
    & > h2 {
        color: #043923;
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 40px;
    }
`