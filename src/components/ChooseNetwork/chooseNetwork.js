import styled from 'styled-components'

export const Root = styled.div`
    padding: 18px;
    background-color: #097246;
    color: white;
    position: fixed;
    top: 110px;
    right: 50px;
    z-index: 100;
    border-radius: 20px;

    & .main {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    & .left {
        margin-right: 10px;
    }

    & .rightTop {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 500;
        margin-bottom: 10px;
        & > span {
            margin-right: 10px;
        }
    }

    & .rightBottom {
        font-weight: 500;
    }

`

export const Hidden = styled.div`
    display: ${props => props.show ? 'flex' : 'none'};
    align-items: center;
    margin: 20px auto 15px auto;
    padding: 12px 3px;
    border-radius: 15px;
    cursor: pointer;

    &:hover {
        color: #0EB56F;
        background-color: #E7FDF3;
    }
    
    & > img {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        margin-right: 10px;
    }

    & > span {
        font-weight: 600;
    }
`