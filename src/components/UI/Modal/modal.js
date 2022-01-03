import styled from 'styled-components'

export const ModalBox = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    background-color: white;
    /* box-shadow: 0px 0px 22px 8px gray; */
    padding: 20px;
    border-radius: 15px;

    @media(max-width: 600px) {
        width: 300px;
    }

    @media(max-width: 400px) {
        width: 250px;
    }
`