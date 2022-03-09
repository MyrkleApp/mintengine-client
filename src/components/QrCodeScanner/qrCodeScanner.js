import styled from 'styled-components'

export const ScannerContainer = styled.div`
    padding: 120px 0 170px 0;
    height: calc(100vh - 350px);
    width: 450px;
    top: 50%;
    left: 50%;
    z-index: 2000;
    position: fixed;
    background-color: white;
    box-shadow: 0 0 22px gray;
    margin-top: -300px;
    margin-left: -225px;
    border-radius: 20px;
    overflow: hidden;

    @media(max-width: 600px) {
        width: 100%;
        left: 0;
        margin-left: 0;
        height: calc(100% - 500px);
        padding: 70px 0 170px 0;
    }

    & button {
        background-color: #0EB56F;
        color: white;
        text-transform: uppercase;
        margin-bottom: 30px;
        padding: 15px 15px;
        box-shadow: 0 0 5px gray;
        font-size: 16px;
        font-weight: bold;
        border-radius: 12px;
        border: none;
        cursor: pointer;
    }

    & a {
        color: black;
        font-weight: bold;
    }
`