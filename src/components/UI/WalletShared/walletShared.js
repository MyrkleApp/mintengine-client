import styled from 'styled-components'

export const Container = styled.div`
    width: calc(100% - 30px);
    min-height: 300px;
    padding: 20px 15px;
    background-color: white;
    box-shadow: 0px 8px 8px rgba(14, 181, 111, 0.06);
    border-radius: 12px;
    margin-bottom: 20px;
`

export const WordsBox = styled.div`
    display: flex;
    flex-flow: column wrap;
    width: 100%;
    height: ${props => props.import ? '350px' : '320px'};

    @media(max-width: 600px) {
        height: 530px;
    }
`

export const Word = styled.div`
    color: #043923;
    font-size: 16px;
    margin-bottom: 13px;
    width: 33%;
    
    @media(max-width: 600px) {
        width: 50%;
    }
`

export const WordInput = styled.div`
    display: flex;
    width: 100%;
    align-items: baseline;

    color: #043923;
    font-size: 17px;
    margin-bottom: 13px;
    width: 33%;

    @media(max-width: 600px) {
        width: 50%;
    }

    & > input {
        width: calc(100% - 35px);
        border: none;
        font-size: 17px;
        border-bottom: 1px dashed #043923;
        color: #043923;
        padding-left: 5px;
        &:focus {
            outline: none;
        }
    }
`

export const XrpWordsBox = styled.div`
    overflow-wrap: break-word;
    margin-bottom: 90px;
    color: #043923;

    & > textarea {
        height: 60px;
        border: none;
        width: 100%;
        border-bottom: 1px dashed #043923;
        overflow-wrap: break-word;
        &:focus {
            outline: none;
        }
    }
`

export const ButtonsContainer = styled.div`
    margin-top: 30px;
    position: relative;
`

export const ModalContent = styled.div`
    color: #043923;

    & > h2.disclaimerTitle {
        font-weight: 600;
    }

    & > p {
        font-size: 14px;
    }

    & > div.disclaimer {
        display: flex;
        align-items: flex-start;
        & > p {
            margin: 0 0 25px 12px;
            font-size: 14px;
        }
    }

    & > h3 {
        text-align: center;
        font-size: 16px;
        margin: 15px auto 30px auto;
        cursor: pointer;
    }

    & > h2.success {
        text-align: center;
    }

    & > div.success {
        display: flex;
        justify-content: center;
        padding-top: 70px;
    }

    & > p.success {
        text-align: center;
    }

    & > .error {
        text-align: center;
    }

    & > h2.error {
        margin-top: 70px;
        color: red;
    }

    & > p.error {
        margin-bottom: 70px;
    }
`