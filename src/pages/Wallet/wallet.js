import styled from 'styled-components'


export const Title = styled.h2`
    color: #043923;
    font-weight: 600;
    font-size: 20px;
    margin: 35px auto 20px 0; 
`

export const Box = styled.div`
    width: 100%;
    height: auto;
    background-color: white;
    border-radius: 25px;
    padding-bottom: 50px;
    margin-bottom: 50px;
    & > .container {
        width: calc(100% - 50px);
        height: calc(100% - 50px);
        padding-top: 40px;
        margin: auto;
        & > .tabsContainer {
            margin-bottom: 50px;
        }
    }
`

export const SubTitle = styled.h3`
    color: #3E554B;
    font-weight: 500;
    font-size: 19px;
    margin: 0 auto 30px 0;
`

export const Label = styled.p`
    font-size: 18px;
    font-weight: 500;
    color: #043923;
    width: 100%;
    padding-bottom: 0px;
`

export const TransactionFee = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    & > img {
        margin-right: 15px;
        height: 30px;
        width: 30px;
        border-radius: 50%;
    }

    & > p {
        font-size: 18px;
        font-weight: 500;
        color: #3E554B;
        margin: 0;
    }
`

export const ButtonContainer = styled.div`
    margin: 30px auto 30px auto;
    width: calc(100% - 150px);
`

export const NoAssetsFound = styled.div`
    width: calc(100% - 30px);
    margin: 30px auto;
    font-weight: 500;
    color: #043923;
    font-size: 20px;
`

export const IconButton = styled.button`
    width: 40px;
    height: 40px;
    border-radius: 8px;
    border: 2px solid #0eb56f;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0eb56f;
    background-color: white;
    cursor: pointer;
    margin: 20px 20px 20px 0;
`