import styled from 'styled-components'

export const Root = styled.div`
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

        & > .select {
            width: 45%;
            outline: none;
            &:focus {
                outline: none;
            }
        }
`