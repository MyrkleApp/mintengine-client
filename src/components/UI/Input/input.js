import styled from 'styled-components'

export const Root = styled.div `
    display: flex;
    flex-direction: column;
    position: relative;

    & > label {
        font-size: 18px;
        font-weight: 500;
        color: #043923;
        padding-bottom: 7px;
    }

    & .icon {
        color: #0EB56F;
        position: absolute;
        cursor: pointer;
        right: 20px;
        top: 50px;
        transform: scale(1.5);
    }

`

export const CustomInput = styled.input`
    height: 65px;
    padding-left: 15px;
    padding-right: 58px;
    /* margin: 10px 0px 20px 0px; */
    border: 2px solid #043923;
    border-radius: 12px;
    background-color: transparent;
    font-size: 18px;

    &:focus {
        outline: none;
        border: 2px solid #0EB56F;
    }
`

export const HelperText = styled.span`
    margin-top: 5px;
    margin-bottom: 5px;
    color: ${props => !props.error ? '#043923' : 'red'};
    font-size: 15px;
`