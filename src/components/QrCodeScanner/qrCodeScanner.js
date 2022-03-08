import styled from 'styled-components'

export const ScannerContainer = styled.div`
    padding: 120px 0 170px;
    height: calc(100vh - 350px);
    width: 450px;
    top: 50%;
    left: 50%;
    z-index: 2000;
    position: fixed;
    background-color: gray;
    box-shadow: 0 0 15px #424242;
    margin-top: -300px;
    margin-left: -225px;
    border-radius: 20px;

    & button {
        background-color: white;
        color: '#0EB56F';
        text-transform: uppercase;
        margin-bottom: 30px;
        padding: 15px 15px;
        box-shadow: 0 0 5px white;
        font-size: 16px;
        font-weight: bold;
        border-radius: 12px;
        border: none;
        cursor: pointer;
    }

    & a {
        color: white;
        font-weight: bold;
    }
`