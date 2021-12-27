import styled from 'styled-components'

export const Title = styled.h1`
    color: #043923;
    text-transform: uppercase;
    margin: 30px auto 10px auto;
    position: relative;

    & > a {
        color: #043923;
        text-decoration: none;
    }

    & .goBackArrow {
        margin: 7px auto auto -50px;
        padding-right: 20px;
        position: absolute;
        cursor: pointer;
    }
`

export const Description = styled.p`
    color: #3E554B;
    font-size: 15px;
    line-height: 22px;
`