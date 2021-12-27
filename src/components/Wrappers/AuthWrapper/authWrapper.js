import styled from 'styled-components'

export const Root = styled.div`
    display: flex;
    justify-content: center;
    /* background-color: red; */
    /* min-height: calc(100vh - 100px); */
    /* min-height: 600px; */
    height: auto;

    & .container {
        width: 85%;
        min-height: calc(100vh - 150px);
        display: flex;
        background-color: yellow
    }

    & .left {
        background-color: #097246;
        width: 25%;

        @media(max-width: 800px) {
            display: none;
        }
    }

    & .left > p {
        color: white;
        width: 90%;
        margin: 30px auto auto auto;
        line-height: 25px;
    }

    & .right {
        background-color: #F5FEFA;
        width: 75%;
        /* height: 90%;
        min-height: 90%; */

        @media(max-width: 800px) {
            width: 100%;
        }
    }
`


