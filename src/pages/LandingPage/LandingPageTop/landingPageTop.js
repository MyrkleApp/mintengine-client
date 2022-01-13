import styled, { keyframes } from 'styled-components'

export const LandingTopRoot = styled.section`
    min-height: calc(100vh - 100px);
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

    & .buttonsContainer {
        margin-bottom: 50px;
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

    /* 0%   { top: 10px; left: -10px;}
    5%  { top: -5px; left: 5px;}
    10%  { top: -13px; left: 25px;}
    15%  { top: -13px; left: 45px;}
    20%  { top: -17px; left: 65px;}
    25%  { top: -17px; left: 85px;}
    30%  { top: -13px; left: 105px;}
    35%  { top: -7px; left: 125px;}
    40%  { top: 10px; left: 150px;}
    45%  { top: 10px; left: -10px;}
    50% { top: 10px; left: -10px;}
    55%  { top: 10px; left: -10px;}
    60%  { top: 10px; left: 150px;}
    65%  { top: -7px; left: 125px;}
    70%  { top: -13px; left: 105px;}
    75%  { top: -17px; left: 85px;}
    80%  { top: -17px; left: 65px;}
    85%  { top: -13px; left: 45px;}
    90%  { top: -13px; left: 25px;}
    95%  { top: -5px; left: 5px;}
    100%   { top: 10px; left: -10px;} */
`

export const Arrow = styled.div`
    border-top: 3px solid red;
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
        border-top: 2px solid red;
        border-right: 4px solid red;
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