import styled from 'styled-components'

export const AssetItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    & > .container {
        background-color: #e7fdf3;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 60px;
        width: 60px;
        border-radius: 20px;
        margin-bottom: 15px;
        cursor: pointer;
    }
    & > span {
        color: #043923;
        font-size: 17px;
        text-align: center;
    }
`