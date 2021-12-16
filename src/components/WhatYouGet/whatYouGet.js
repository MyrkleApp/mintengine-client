import styled from 'styled-components'

export const Root = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #043923;

    & .container {
        width: 80%;
        margin: 30px auto;
    }

    & .container > h2 {
        color: white;
        font-size: 28px;
    }

    & .gridContainer  > div {
        @media(max-width: 900px) {
            margin-bottom: 20px;
        }
    }
`

