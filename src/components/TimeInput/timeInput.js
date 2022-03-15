import styled from 'styled-components'

export const Root = styled.div`
    &   /* Chrome, Safari, Edge, Opera */
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    &   /* Firefox */
        input[type=number] {
        -moz-appearance: textfield;
    }

    & > label {
        font-weight: 500;
        font-size: 18px;
        color: #043923;
        padding-bottom: 7px;
    }

    & > .container {
        margin-top: 7px;
        height: 65px;
        border: 2px solid #043923;
        border-radius: 16px;
        font-size: 18px;
        width: 100%;
        margin-bottom: 30px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;

        @media(max-width: 800px) {
            height: 47px;
        }

        & > input {
            width: 27%;
            height: 70%;
            border-radius: 16px;
            border: 1px solid gray;
            padding: 0 5px;
            text-align: center;
            font-size: 16px;

            @media(max-width: 800px) {
                border-radius: 12px;
            }

            &:focus {
                outline: none;
            }
        }
    }

    
`