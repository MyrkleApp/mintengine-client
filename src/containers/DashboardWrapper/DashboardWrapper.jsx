import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar.jsx'
import * as Styles from './dashboardWrapper.js'

function DashboardWrapper({ children }) {
    
    return (
        <Styles.Root>
            <Styles.Left>
                <Sidebar />
            </Styles.Left>

            <Styles.Right>
                <Styles.RightContainer>
                    { children }
                </Styles.RightContainer>
            </Styles.Right>
        </Styles.Root>
    )
}

export default DashboardWrapper
