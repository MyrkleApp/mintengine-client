import styled from 'styled-components'

export const ModalContent = styled.div`
    color: #043923;

    & > h2.disclaimerTitle {
        font-weight: 600;
    }

    & > p {
        font-size: 14px;
    }

    & > div.disclaimer {
        display: flex;
        align-items: flex-start;
        & > p {
            margin: 0 0 25px 12px;
            font-size: 14px;
        }
    }

    & > h3 {
        text-align: center;
        font-size: 16px;
        margin: 15px auto 30px auto;
        cursor: pointer;
    }

    & > h2.success {
        text-align: center;
    }

    & > div.success {
        display: flex;
        justify-content: center;
        padding-top: 70px;
    }

    & > p.success {
        text-align: center;
    }

    & > .error {
        text-align: center;
    }

    & > h2.error {
        margin-top: 70px;
        color: red;
    }

    & > p.error {
        margin-bottom: 70px;
    }
`