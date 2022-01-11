import styled from 'styled-components'

export const Table = styled.table`
    border-collapse: collapse;
    width: 100%;
    padding-bottom: 50px;

    & tr:first-child {
        background-color: #E7FDF3;
    }

    & th:first-child, td:first-child {
        padding-left: 20px;
    }

    & th:last-child, td:last-child {
        padding-right: 20px;
    }

    & th, td {
        padding: 8px;
        text-align: left;
        min-width: 150px;
    }

    & td {
        border-bottom: 2px solid #E7FDF3;
        height: 55px;
        color: #043923;
        font-size: 18px;
    }

    & th {
        padding-top: 30px;
        padding-bottom: 15px;
        text-transform: uppercase;
        font-size: 20px;
        font-weight: 500;
        color: #3E554B;
    }


`