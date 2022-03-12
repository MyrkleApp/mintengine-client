import styled from 'styled-components'

export const Root = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #043923;
    padding: 7px 0 12px 0;
    border-bottom: 2px solid #E7FDF3;

    & > p {
        width: calc(100% - 50px);
        word-break: break-word;
        font-size: 18px;
        color: ${props => props.active && 'green'};
        cursor: pointer;
    }

    & .iconsContainer {
        color: #097246;
        font-size: 30px;
        display: flex;
        flex-direction: column;
    }
`