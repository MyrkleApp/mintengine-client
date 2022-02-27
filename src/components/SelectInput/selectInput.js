import styled from 'styled-components'

export const Root = styled.div`
    position: relative;

    & > label {
        font-weight: 500;
        font-size: 18px;
        color: #043923;
        padding-bottom: 7px;
        
    }

    & > .container {
        margin-top: 7px;
        height: 65px;
        border: 2px solid ${props => !props.exchange ? '#043923' : 'transparent'};
        border-radius: 16px;
        font-size: 18px;
        width: 100%;
        margin-bottom: 18px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        overflow: hidden;

        & > .select {
            width: 45%;
            height: 100%;
            box-sizing: border-box;
            padding: 5px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: ${props => !props.exchange ? '#E7FDF3' : 'white'};
            cursor: pointer;

            & > .left {
                display: flex;
                align-items: center;
                & > img {
                    height: 30px;
                    width: 30px;
                    border-radius: 50%;
                    margin: auto 10px auto 10px;
                }
                & > span {
                    font-size: 20px;
                    font-weight: 600;
                }
            }
        }

        & > .rightBox {
            width: 55%;
            height: 100%;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            padding: 0 10px;

            & > input {
                color: gray;
                border: none;
                background-color: transparent;
                font-size: 24px;
                text-align: right;
                max-width: calc(100% - 50px);
                &:focus {
                    outline: none;
                }
            }
        }
    }
`

export const DropdownContainer = styled.div`
    position: absolute;
    background-color: #E7FDF3;
    width: 100%;
    z-index: 2;
    top: 95px;
    border-radius: 8px 8px 20px 20px;
    overflow: hidden;
    display: ${props => props.show ? 'block' : 'none'};
`

export const DropdownItem = styled.div`
    background-color: ${props => props.selected ? '#097246' : 'transparent'};
    box-sizing: border-box;
    padding: 10px;
    cursor: pointer;
    display: flex;
    border-radius: 10px;
    color: ${props => props.selected ? 'white' : 'black'};

    &:hover {
        background-color: #097246;
        transition: 300ms linear all;  
        color: white;
    }

    & > .left {
        width: 40%;
        & > .leftTop {
            display: flex;
            align-items: center;
            & > img {
                height: 20px;
                width: 20px;
                border-radius: 50%;
                margin-right: 5px;
            }
            & > span {
                font-size: 20px;
                font-weight: 600;
            }
        }

        & > .leftBottom {
            & > span {
                margin: 10px auto auto 25px;
                font-size: 18px;
            }
        }
    }

    & > .right {
        width: 60%;
        
        & .rightTop, .rightBottom {
            display: flex;
            justify-content: flex-end;
            flex-wrap: wrap;
            
            & > span {
                font-size: 20px;
            }

            & > span:last-child {
                padding-left: 5px;
            }
        }
    }
`

export const LoaderContainer = styled.div`
    box-sizing: border-box;
    padding: 10px 20px;
`