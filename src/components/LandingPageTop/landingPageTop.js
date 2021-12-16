import styled from 'styled-components'

export const LandingTopRoot = styled.section`
    height: calc(100vh - 100px);
    display: flex;
    justify-content: center;
    text-align: center;
    background-color: #F1FEF8;
`

export const Container = styled.div`
    width: 50%;
    overflow-x: hidden;

    @media(max-width: 900px) {
        width: 90%;
    }

    & > h1 {
        color: #0EB56F;
        font-weight: bold;
        font-size: 60px;
        margin-top: 20px;
        margin-bottom: 20px;

        @media(max-width: 475px) {
            font-size: 50px;
        }

        @media(max-width: 400px) {
            font-size: 35px
        }
    }

    & > h2 {
        color:  #043923;
        font-weight: 500;
        font-size: 35px;
        width: 400px;
        margin: 0 auto 30px auto;

        @media(max-width: 475px) {
            width: 350px;
            font-size: 30px;
        }

        @media(max-width: 400px) {
            font-size: 25px
        }
    }

    & p {
        color: #043923;
        font-size: 15px;
        text-align: left;
        width: 200px;
        line-height: 20px;
        margin: auto auto;
    }

    & .gridContainer {
        margin-bottom: 30px;
    }

    & .gridContainer > div:first-child > p {
        color: #043923;

        @media(max-width: 900px) {
            width: 250px;
        }
    }

    & .gridContainer > div:last-child > p {
        width: 250px;
        color: #7C7C7C;
    }

    & .buttonsContainer > button:first-child {
        margin-right: 20px;
    }
    
`