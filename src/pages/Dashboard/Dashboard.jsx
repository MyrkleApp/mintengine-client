import React from 'react'
import WalletAddress from '../../components/WalletAddress/WalletAddress'
import DashboardWrapper from '../../components/Wrappers/DashboardWrapper/DashboardWrapper'
import * as Styles from './dashboard'

function Dashboard() {

    return (
        <DashboardWrapper>
            <Styles.Container>
                <WalletAddress />
            </Styles.Container>
        </DashboardWrapper>
    )
}

export default Dashboard
