import styled from 'styled-components'

export const Root = styled.div`
    width: 100%;
    height: 100%;

    & .container {
        padding-top: 80px;
    }
`

export const NavItem = styled.div`
    display: flex;
    align-items: center;
    color: ${props => props.active ? '#0EB56F' : 'gray'};
    margin: 0px 0 50px 20%;

    & > span {
        font-size: 20px;
        font-weight: 600;
        margin-left: 15px;
    }

    &:hover {
        color: #0EB56F;
    }
`

export const Line = styled.hr`
    margin: 70px auto 50px auto;
    color: #F5FEFA;
    opacity: 0.5;
`