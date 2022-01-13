import styled, { keyframes } from 'styled-components'

export const Root = styled.div`
    min-height: 150px;
    padding-top: 200px;
    padding-bottom: 200px;
    & .leftGrid {
        @media(max-width: 900px) {
            margin-bottom: 250px;
            transform: translateX(-30px);
        }
    }

    & .rightGrid {
        @media(max-width: 900px) {
            transform: translateX(-30px);
        }
    }
`
export const Box = styled.div`
    /* border: 1px solid #F95454; */
    display: flex;
    position: relative;
`

export const Hoop = styled.div`
    height: 130px;
    width: 60px;
    border-radius: 40px/80px; 
    border: 3px solid #0EB56F;
`

const moveDisk = keyframes`
    0%   {left: 0px;}
    50%  {left: 350px; transform: scale(0.4); background-color: #0EB56F;}
    100% {left: 0px;}
`

export const Disk = styled.div`
    height: 100px;
    width: 100px;
    border-radius: 50%;
    background-color: #F95454;
    margin-top: 15px;
    margin-right: -30px;
    z-index: 2;
    position: relative;
    animation: ${moveDisk} 2s infinite;
`

export const WhiteDiv = styled.div`
    height: 25px;
    width: 25px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
    z-index: 3;
    top: 52px;
    left: -30px;
`

const moveRightBox = keyframes`
    0%   {top: 0px;}
    50%  {top: -100px;}
    100% {top: 0px;}
`

export const RightBox = styled(Box)`
    transform: rotate(90deg);
    top: 0px;
    animation: ${moveRightBox} 2s infinite;
`

const moveRightCircle = keyframes`
    0%   {top: -100px;}
    50%  {top: 50px; border-color: #F95454;}
    100% {top: -100px;}
`

const moveRightInnerCircle = keyframes`
    0%   {background-color: #0EB56F;}
    50%  {top: 50px; background-color: #F95454;}
    100% {background-color: #0EB56F;}
`

export const RightCircle = styled.div`
    height: 80px;
    width: 80px;
    border-radius: 50%;
    border: 3px solid #0EB56F;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 110px;
    top: -100px;
    animation: ${moveRightCircle} 2s infinite;
`

export const RightInnerCircle = styled.div`
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background-color: #0EB56F;
    animation: ${moveRightInnerCircle} 2s infinite;
`