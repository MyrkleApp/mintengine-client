import React from 'react'
import * as Styles from './table'

function Table() {

    return (
        <Styles.Table>
            <tr>
                <th>TRANSACTION ID</th>
                <th>ASSET NAME</th>
                <th>AMOUNT</th>
                <th>TXN TYPE</th>
                <th>DATE</th>
            </tr>
            <tr>
                <td>KGVRGF6PMT6MGK4...</td>
                <td>AKITA INU</td>
                <td>100000000</td>
                <td>Outgoing</td>
                <td>18/11/2021</td>
            </tr>
            <tr>
                <td>KGVRGF6PMT6MGK4...</td>
                <td>AKITA INU</td>
                <td>100000000</td>
                <td>Outgoing</td>
                <td>18/11/2021</td>
            </tr>
            <tr>
                <td>KGVRGF6PMT6MGK4...</td>
                <td>AKITA INU</td>
                <td>100000000</td>
                <td>Outgoing</td>
                <td>18/11/2021</td>
            </tr>
            {/* <tr style={{paddingTop: '100px'}}>
                <div style={{paddingTop: '120px'}}>hello</div>
            </tr> */}
        </Styles.Table>
    )
}

export default Table
