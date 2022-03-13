import styled from 'styled-components'

const Box = styled.div`
    box-shadow: 0px 8px 8px rgba(14, 181, 111, 0.06);
    background-color: white;
`

export const ManageAssets = styled(Box)`
    padding: 20px 20px 35px 20px;
    margin: 150px auto 20px auto;
    border-radius: 20px;
    & > h2 {
        color: #043923;
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 40px;
    }
`

export const Title = styled.h2`
    color: #043923;
    font-size: 20px;
    font-weight: 600;
    margin-top: 40px;
`

export const TableBox = styled(Box)`
    /* border-radius: 0 0 20px 20px; */
    margin-bottom: 40px;
    min-height: 600px;
    max-height: 800px;
    overflow-x: auto;
    overflow-y: scroll;
`

export const ModalTitle = styled.h2`
    color: #043923;
    font-size: 20px;
    font-weight: 600;
    text-transform: uppercase;
`

export const ButtonContainer = styled.div`
    margin: 30px auto 30px auto;
    width: calc(100% - 100px);
`