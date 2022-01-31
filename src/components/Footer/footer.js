import styled from 'styled-components'

export const Root = styled.div`
    background-color: #097246;
    display: flex;
    justify-content: center;
    align-items: center;

    & .container {
        width: 80%;
        margin: 50px auto 30px auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        & > p > a {
            color: white;
        }
    }

    & .topContent {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
    }

    & .left {
        color: white;
        margin-right: 100px;
        margin-bottom: 40px;
        display: flex;
        align-items: center;
        & > span {
            font-weight: bold;
            margin-left: 20px;
        }
    }

    & .right {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        @media(max-width: 1100px) {
            margin: 0 auto;
        }
    }

    & p {
        color: white;
        margin-top: 40px;
    }
`

export const SocialLink = styled.div`
    width: 120px;
    border: 1px solid white;
    color: white;
    font-weight: 500;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
    height: 25px;
`