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
    height: 180px;

    @media(max-width: 600px) {
        height: 250px;
    }
`

export const Word = styled.div`
    color: #043923;
    font-size: 14px;
    
    @media(max-width: 600px) {
        width: 50%;
    }
`

export const XrpWordsBox = styled.div`
    overflow-wrap: break-word;
    margin-bottom: 90px;
    color: #043923;
`

export const ButtonsContainer = styled.div`
    margin-top: 30px;
    position: relative;
`


