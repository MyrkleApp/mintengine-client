import styled from 'styled-components'

export const Root = styled.div`
    background-color: white;
    border-radius: 20px;
    padding: 25px 25px 55px 25px;
    box-shadow: 0px 8px 8px rgba(14, 181, 111, 0.06);
    
    & .container {
        width: calc(100% - 30px);
        height: calc(100% - 50px);
        margin: auto;
    }

    & .welcome {
        font-size: 18px;
        font-weight: 500;
        color: #043923;
    }

    & .left {
        overflow-wrap: break-word;
        padding: 20px 20px 0 0;
        color: #043923;
        font-size: 17px;
        line-height: 25px;
        position: relative;

        & .copyIcon {
            position: absolute;
            left: 0;
            bottom: -20px;
            font-size: 28px;
            color: #097246;

            @media(max-width: 900px) {
                bottom: -40px;
            }
        }
    }

    & .center {
        display: flex;
        justify-content: center;
        align-items: center;
        border-left: 1px solid gray;
        border-right: 1px solid gray;

        @media(max-width: 900px) {
            border: none;
            margin-top: 50px;

            & .qrBox {
                padding: 30px 40px;
                border-top: 1px solid gray;
                border-bottom: 1px solid gray;
            }

        }
    }

    & .right {
        padding: 20px 0 0 20px;
        position: relative;
    }

    & .amount, .dollarAmount, .coinName {
        font-size: 20px;
        font-weight: 500;
        color: #043923;
    }

    .coinName {
        color: gray;
    }

    & .dollarAmount {
        margin: 30px auto;
    }
`