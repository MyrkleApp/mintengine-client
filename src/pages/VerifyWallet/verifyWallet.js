import styled from 'styled-components'

export const ModalContent = styled.div`
    color: #043923;

    & > h2 {
        font-weight: 600;
    }

    & > p {
        font-size: 14px;
    }

    & > div {
        display: flex;
        align-items: flex-start;
        & > p {
            margin: 0 0 25px 12px;
        }
    }

    & > h3 {
        text-align: center;
        font-size: 16px;
        margin: 15px auto 30px auto;
        cursor: pointer;
    }
`