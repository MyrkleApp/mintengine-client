import styled from 'styled-components'

export const Root = styled.div`
    width: 100%;
    padding-top: 100px;
    display: flex;
    position: relative;
    overflow: hidden;
    height: 700px;

    & > .left { 
        width: 40%;
        z-index: 1;
        
        @media(max-width: 600px) {
            width: 100%;
        }

        & > .navItems {
            margin: 0 0 50px 50px;
            font-size: 20px;
            font-weight: 600;
            color: #3E554B;
            cursor: pointer;
            border: none;
            background-color: transparent;

            @media(max-width: 1000px) {
                margin: 0 0 50px 0;
            }
        }
    }

    & > .right { 
        width: calc(60% - 50px);
        z-index: 2;
        background-color: #f5fefa;
        min-height: 300px;
        
        

        @media(max-width: 600px) {
            width: 100%;
            position: absolute;
            right: ${props => props.open ? 0 : 'calc(-100% - 100px)'};
            transition: 300ms linear all;
        }

        & > .changeDetails > div, .changeDetails > button {
            margin-bottom: 20px;
        }

        & .arrowIcon {
            margin: -40px auto 30px 0;
            cursor: pointer;
            display: none;
            @media(max-width: 600px) {
                display: block;
            }
        }
    }
`