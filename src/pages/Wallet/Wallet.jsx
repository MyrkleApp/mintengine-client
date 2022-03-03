import React, { useEffect } from 'react'
import { Grid } from '@mui/material'
import WalletAddress from '../../containers/WalletAddress/WalletAddress'
import DashboardWrapper from '../../containers/DashboardWrapper/DashboardWrapper'
import * as Styles from './wallet'
import WalletAssetItem from '../../components/WalletAssetItem/WalletAssetItem'
import MyTabs from '../../components/MyTabs/MyTabs'
import ChooseNetwork from '../../components/ChooseNetwork/ChooseNetwork'
import { useDispatch, useSelector } from 'react-redux'
import { ALGORAND, networkDataToReturn, RIPPLE } from '../../constants/network'
import useTabs from '../../Hooks/Tabs'
import { NORMAL_TXN, SCHEDULED_TXN } from './constants'
import NormalTxn from './tabs/NormalTxn'
import ScheduledTxn from './tabs/ScheduledTxn'
import Ripple from './ripple/Ripple'
import { getActiveAlgorandWallet, getAlgorandHoldings } from '../../app/algorand/algorandSlice'
import { HTTP_STATUS } from '../../constants/httpStatus'
import { ThreeDots } from 'react-loader-spinner'

const tabs = [NORMAL_TXN, SCHEDULED_TXN]

function Dashboard() {
    const dispatch = useDispatch()
    const network = useSelector(state => state.network.network)
    const { tabValue, handleTabChange } = useTabs(tabs[0])
    const { data: activeWalletData } = useSelector(networkDataToReturn[network.toLowerCase()])

    useEffect(() => {
        if (!activeWalletData) {
            dispatch(getActiveAlgorandWallet())
        }
    }, [network, activeWalletData, dispatch])

    const { status: holdingsStatus, data: holdingsData } = useSelector(state => state.algorand.holdings)

    useEffect(() => {
        if (!holdingsData) {
            dispatch(getAlgorandHoldings())
        }
    }, [holdingsData])

    return (
        <DashboardWrapper>
            <ChooseNetwork />
            <WalletAddress />
            <Grid container spacing={3}>

                <Grid item xs={12} lg={8}>
                    <Styles.Title>SEND ASSET</Styles.Title>
                    <Styles.Box>
                        <div className="container">
                            {
                                network === ALGORAND && (
                                    <div className="tabsContainer">
                                        <MyTabs
                                            tabs={tabs}
                                            tabValue={tabValue}
                                            handleTabChange={handleTabChange}
                                        />
                                    </div>
                                )
                            }
                            <Grid container rowSpacing={2}>
                                {
                                    network === ALGORAND && (
                                        <>
                                            { tabValue === NORMAL_TXN && <NormalTxn /> }
                                            { tabValue === SCHEDULED_TXN && <ScheduledTxn /> }
                                        </>
                                    )
                                }
                                { 
                                    network === RIPPLE && <Ripple />
                                }
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
                                    <Styles.SubTitle>{network === ALGORAND ? 'Asset ID' : 'Issuer Add'}</Styles.SubTitle>
                                </Grid>
                                <Grid item container xs={12} rowSpacing={4}>
                                    {
                                        holdingsStatus === HTTP_STATUS.PENDING ? (
                                            <ThreeDots
                                                height="100"
                                                width="100"
                                                color='gray'
                                                ariaLabel='loading'
                                            />
                                        ) : (
                                            (holdingsData?.assets?.length > 0)
                                            ?
                                            holdingsData?.assets?.map(asset => (
                                                <WalletAssetItem key={asset.id} asset={asset} />
                                            )) 
                                            :
                                            <Styles.NoAssetsFound>No assets found</Styles.NoAssetsFound>
                                        )
                                    }
                                    {/* <WalletAssetItem clawback /> */}
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
