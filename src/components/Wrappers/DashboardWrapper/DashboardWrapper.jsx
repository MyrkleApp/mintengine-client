import React from 'react'
import Sidebar from '../../Sidebar/Sidebar'
import * as Styles from './dashboardWrapper'

function DashboardWrapper({ children }) {
    
    return (
        <Styles.Root>
            <Styles.Left>
                <Sidebar />
            </Styles.Left>

            <Styles.Right>
                { children }
            </Styles.Right>
        </Styles.Root>
    )
}

export default DashboardWrapper
