import styled from 'styled-components'

export const AssetName = styled.div`
    color: #043923;
    font-weight: 500;
    font-size: 15px;
    width: 100%;
    /* white-space: nowrap; */
    overflow: hidden;
    text-overflow: ellipsis;
`

export const Image = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 30%;
`

export const AssetAmount = styled.span`
    color: #3E554B;
    padding-bottom: 5px;
    font-size: 15px;
`

export const AssetNumber = styled.span`
    color: #097246;
    font-weight: 500;
    font-size: 15px;
    text-decoration: underline;
    overflow-wrap: break-word;
    font-style: italic;
`