import styled from 'styled-components'

export const Root = styled.div `
    display: flex;
    flex-direction: column;
    position: relative;

    & > label {
        font-size: 15px;
        color: #043923;
        padding-bottom: 7px;
    }

    & > span {
        margin-top: 5px;
        margin-bottom: 5px;
        color: red;
        font-size: 12px;
    }

    & .icon {
        color: #0EB56F;
        position: absolute;
        cursor: pointer;
        right: 10px;
        top: 38px;
    }

`

export const CustomInput = styled.input`
    height: 45px;
    padding-left: 15px;
    padding-right: 40px;
    /* margin: 10px 0px 20px 0px; */
    border: 1px solid ${props => !props.error ? '#043923' : 'red'};
    border-radius: 12px;
    /* background-color: red; */

    &:focus {
        outline: none;
        border: 1px solid #0EB56F;
    }
`