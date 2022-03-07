import React, { Fragment } from 'react'
import * as Styles from './table'

function Table({ columnTitles, rows, noDataTitle, noDataText }) {

    return (
        <Fragment>
            <Styles.Table>
                <tr>
                    { columnTitles?.map((item, i) => (
                        <th key={i}>{item}</th>
                    ))}
                </tr>

                { rows }
                
            </Styles.Table>

            {
                (!rows || rows.length === 0) && (
                    <Styles.EmptyTable>
                        <h1>{noDataTitle}</h1>
                        <p>{noDataText}</p>
                    </Styles.EmptyTable>
                )
            }
            
        </Fragment>
    )
}

export default Table
