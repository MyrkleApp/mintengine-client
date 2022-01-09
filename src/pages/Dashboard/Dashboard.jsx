import { Grid } from '@mui/material'
import React from 'react'
import FormControl from '../../components/FormControl/FormControl'
import Tab from '../../components/Tab/Tab'
import WalletAddress from '../../components/WalletAddress/WalletAddress'
import DashboardWrapper from '../../components/Wrappers/DashboardWrapper/DashboardWrapper'
import * as Styles from './dashboard'
import scannerIcon from '../../assets/icons/scanner.svg'
import calenderIcon from '../../assets/icons/calendar.svg'
import TripleInput from '../../components/TripleInput/TripleInput'

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
                                <FormControl 
                                    label="Recipient Address"
                                    icon={scannerIcon}
                                    type="text"
                                    center
                                />
                                <FormControl 
                                    label="Date"
                                    icon={calenderIcon}
                                    type="date"
                                    center
                                />
                                <FormControl 
                                    label="Time"
                                    icon
                                    section
                                />
                                <TripleInput />
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
