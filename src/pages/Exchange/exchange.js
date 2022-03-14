import styled from 'styled-components'
   

export const Root = styled.div`
    margin: 30px auto;
    box-shadow: 0px 8px 8px rgba(14, 181, 111, 0.06);
    background-color: white;
    padding: 20px 0 150px 0;
    border-radius: 20px;

    @media(max-width: 1200px) {
        margin-top: 150px;
    }
`

export const Title = styled.h2`
    font-weight: 500;
    font-size: 22px;
    margin: 0px auto 15px 20px;
    color: #1D0118;
`

export const Text = styled.p`
    color: #50494F;
    margin: 0px auto 20px 20px;
`

export const Line = styled.hr`
    width: 100%;
    border: 1px solid #E7FDF3;
    margin: 20px 0;
`

export const Container = styled.div`
    width: calc(100% - 40px);
    background-color: #F5FEFA;
    border-radius: 20px;
    margin: auto auto 16px auto;
    padding: 20px 0 5px 0;
    position: relative;
    @media (max-width: 800px) {
        width: calc(100% - 10px);
    }
    & > .innerContainer {
        width: calc(100% - 40px);
        margin: auto;

        position: relative;

        & > input.asset-id {
            position: absolute;
            left: 47%;
            top: 30px;
            height: 60px;
            width: 23%;
            border: none;
            background-color: white;
            color: gray;
            font-size: 24px;
            text-align: right;
            &:focus {
                outline: none;
            }

        }

        & > label.asset-id {
            position: absolute;
            left: 47%;
            top: 0px;
            font-weight: 500;
        }

        & > input.asset-amount {
            position: absolute;
            right: 0;
            top: 30px;
            height: 60px;
            width: 23%;
            border: none;
            background-color: white;
            border-radius: 0 10px 10px 0;
            color: gray;
            font-size: 24px;
            text-align: right;
            &:focus {
                outline: none;
            }
        }

        & > label.asset-amount {
            position: absolute;
            left: 77%;
            top: 0px;
            font-weight: 500;
        }
    }

    & > img {
        position: absolute;
        bottom: -37px;
        left: calc(50% - 28px);
        z-index: 1;
    }
`

export const Info = styled.p`
    & strong {
        font-weight: 500;
    }
`

export const ButtonContainer = styled.div`
    margin: 30px auto 30px auto;
    width: calc(100% - 150px);
    @media (max-width: 800px) {
        width: calc(100% - 45px);
    }
`

export const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 0;
    
    & svg {
        margin: -30px 0 -10px 0;
    }
`