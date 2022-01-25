import { Grid } from '@mui/material'
import React from 'react'
import FormControl from '../../components/FormControl/FormControl'
import Tab from '../../components/Tab/Tab'
import WalletAddress from '../../components/WalletAddress/WalletAddress'
import DashboardWrapper from '../../components/Wrappers/DashboardWrapper/DashboardWrapper'
import * as Styles from './wallet'
import scannerIcon from '../../assets/icons/scanner.svg'
import calenderIcon from '../../assets/icons/calendar.svg'
import TripleInput from '../../components/TripleInput/TripleInput'
import SelectInput from '../../components/SelectInput/SelectInput'
import WalletAsset from '../../components/WalletAsset/WalletAsset'
import MyTabs from '../../components/MyTabs/MyTabs'
import ChooseNetwork from '../../components/ChooseNetwork/ChooseNetwork'


function Dashboard() {

    return (
        <DashboardWrapper>
            <ChooseNetwork />
            <WalletAddress />
            <Grid container spacing={3}>
                
                <Grid item xs={12} lg={8}>
                    <Styles.Title>SEND ASSET</Styles.Title>
                    <Styles.Box>
                        <div className="container">
                            <div className="tabsContainer">
                                <MyTabs tabs={['Normal TXN', 'Multiple TXN', 'Scheduled TXN']} />
                            </div>
                            <Grid container rowSpacing={2}>
                                <SelectInput label="Amount" />
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
                                <TripleInput />
                            </Grid>
                        </div>
                    </Styles.Box>
                </Grid>

                <Grid item xs={12} lg={4}>
                    <Styles.Title>WALLET ASSETS</Styles.Title>
                    <Styles.Box style={{ marginBottom: '50px' }}>
                        <div className="container">
                            <Grid container>
                                <Grid item xs={6}>
                                    <Styles.SubTitle>Asset</Styles.SubTitle>
                                </Grid>
                                <Grid item xs={6}>
                                    <Styles.SubTitle>Asset ID</Styles.SubTitle>
                                </Grid>
                                <Grid item container xs={12} rowSpacing={4}>
                                    <WalletAsset />
                                    <WalletAsset clawback />
                                </Grid>
                            </Grid>
                        </div>
                    </Styles.Box>
                </Grid>
            </Grid>
        </DashboardWrapper>
    )
}

export default Dashboard
