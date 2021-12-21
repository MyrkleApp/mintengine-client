import styled from 'styled-components'

export const Button = styled.button`
    background-color: ${props => props.outlined ? '#F1FEF8' : '#0EB56F'};
    color: ${props => props.outlined ? '#0EB56F' : '#FFFFFF'};
    text-transform: uppercase;
    width: ${props => props.fullWidth ? '100%' : 'auto'};
    padding: 15px 35px;
    font-weight: bold;
    border-radius: 12px;
    border: ${props => props.outlined ? '1px solid #0EB56F' : 'none'};
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    opacity: ${props => props.disabled ? '0.5' : '1.0'};
`