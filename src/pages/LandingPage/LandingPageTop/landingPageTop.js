import styled, { keyframes } from 'styled-components'

export const LandingTopRoot = styled.section`
    min-height: calc(100vh - 100px);
    display: flex;
    justify-content: center;
    text-align: center;
    background-color: #F1FEF8;
    overflow: hidden;
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

    & .buttonsContainer {
        margin-bottom: 50px;
    }

    /* & .buttonsContainer > a > button {
        @media(max-width: 600px) {
            padding: 15px 25px;
        }
    } */

    & .buttonsContainer > button {
        @media(max-width: 600px) {
            padding: 15px 25px;
        }
    }

    & .buttonsContainer > a:first-child {
        margin-right: 20px;
    }

    & .arrowBoundary {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
`

const moveBlock = keyframes`
    0% { left: -10px; }
    50% { left: 200px; }
    100% { left: -10px; }
`

export const Arrow = styled.div`
    border-top: 3px solid #F95454;
    width: 170px;
    height: 70px;
    border-radius: 50%;
    margin-top: 50px;
    transform: rotate(10deg);
    position: relative;

    & .point {
        position: absolute;
        bottom: 39px;
        right: -3px;
        transform: rotate(90deg);
        width: 10px;
        height: 10px;
        border-top: 2px solid #F95454;
        border-right: 4px solid #F95454;
    }

    & .block {
        width: 200px;
        height: 70px;
        /* border: 1px solid purple; */
        /* border-radius: 50%; */
        transform: rotate(-10deg);
        position: absolute;
        top: -20px;
        left: -10px;
        z-index: 2;
        background-color: #f1fef8;
        animation: ${moveBlock} 2s infinite;
    }
`



export const LeftArrow = styled(Arrow)`
    margin-top: 0px;
`

export const LeftArrowContainer = styled.div`
    transform: rotate(180deg);
    /* background-color: yellow; */
    /* @media(max-width: 900px) {
        width 400px;
    } */
`