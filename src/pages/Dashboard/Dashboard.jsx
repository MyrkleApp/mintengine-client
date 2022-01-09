import { Grid } from '@mui/material'
import React from 'react'
import Tab from '../../components/Tab/Tab'
import WalletAddress from '../../components/WalletAddress/WalletAddress'
import DashboardWrapper from '../../components/Wrappers/DashboardWrapper/DashboardWrapper'
import * as Styles from './dashboard'

function Dashboard() {

    return (
        <DashboardWrapper>
            <Styles.Container>
                <WalletAddress />
                <Grid container spacing={3}>
                    
                    <Grid item xs={12} md={8}>
                        <h2 className="title">SEND ASSET</h2>
                        <Styles.SendAsset>
                            <div className="container">
                                <Tab />
                                hi  
                            </div>
                        </Styles.SendAsset>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <h2 className="title">WALLET ASSETS</h2>
                        <Styles.SendAsset>

                        </Styles.SendAsset>
                    </Grid>
                </Grid>
            </Styles.Container>
        </DashboardWrapper>
    )
}

export default Dashboard
