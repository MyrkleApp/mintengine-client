import styled from 'styled-components'

export const Root = styled.div`
    display: flex;
    justify-content: space-around;
    margin-bottom: 30px;
`

export const TabItem = styled.div`
    font-size: 19px;
    font-weight: 500;
    color: ${props => props.active ? '#0EB56F' : 'gray'};
    /* margin-right: 22px; */
    padding-bottom: 15px;
    border-bottom: 2px solid ${props => props.active ? '#0EB56F' : 'transparent'};
    cursor: pointer;
    transition: 200ms linear all;

    &:hover {
        color: #0EB56F;
        border-bottom: 2px solid #0EB56F;
        transition: 200ms linear all;
    }
`