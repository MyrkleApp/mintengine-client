import styled from 'styled-components'

export const Root = styled.div`
    width: 100%;
    height: ${props => !props.showImage ? '300px' : '100%'};
    background-color: ${props => !props.showImage ? '#3A5A4D': '#097246'};
    display: flex;
    border-radius: 8px;
    /* margin: auto; */

    @media(max-width: 1200px) {
        height: ${props => !props.showImage ? '320px' : '100%'};
    }

    @media(max-width: 1120px) {
        height: ${props => !props.showImage ? '350px' : '100%'};
    }

    @media(max-width: 889px) {
        height: auto;
        padding: 10px auto;
    }

    & .container {
        margin: auto;
        height: calc(100% - 50px);
        width: calc(100% - 24px);
    }

    & .iconBox {
        height: 52px;
        width: 52px;
        border-radius: 8px;
        background-color: #0EB56F;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
    }

    & h1 {
        color: white;
        font-size: 20px;
    }

    & p {
        color: white;
        font-size: 15px;
        line-height: 28px;
    }

    & img {
        width: 100%;
        height: auto;
        margin-top: 25px;
    }

`