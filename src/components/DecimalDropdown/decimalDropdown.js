import styled from 'styled-components'

export const Root = styled.div`
    display: ${props => props.displayDropdown ? 'block' : 'none'};
    width: calc(100% - 10px);
    position: absolute;
    top: 105px;
    border-radius: 10px;
    z-index: 1;
    box-shadow: 0px 8px 8px rgba(14, 181, 111, 0.06);
    background-color: #E7FDF3;
    padding: 20px 0;
    & > .container {
        max-height: 300px;
        overflow: scroll;
        background-color: transparent;
    }
`

export const DecimalDropdownItem = styled.div`
    text-align: center;
    height: 50px;
    color: black;
    font-weight: 500;
    font-size: 18px;
    &:hover {
        background-color: #097246;
        color: white;
        transition: 200ms linear all; 
    }
`