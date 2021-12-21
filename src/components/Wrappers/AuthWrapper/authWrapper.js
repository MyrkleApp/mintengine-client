import styled from 'styled-components'

export const Root = styled.div`
    display: flex;
    justify-content: center;
    /* background-color: red; */
    height: calc(100vh - 100px);

    & .container {
        width: 85%;
        height: 90%;
        display: flex;
        /* background-color: yellow */
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

        @media(max-width: 800px) {
            width: 100%;
        }
    }
`


