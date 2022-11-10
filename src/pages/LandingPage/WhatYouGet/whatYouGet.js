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

export const CarouselRoot = styled.section`
    padding: 50px 0;
    box-sizing: border-box;
    width: 80%;
    margin: auto;
    /* min-height: 400px; */
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: scroll hidden;

    @media(max-width: 600px) {
        width: 95%;
        /* padding: 20px 0; */
    }

    & .dot {
        background-color: black !important;
    }

    & img {
        border-radius: 15px;
    }
`