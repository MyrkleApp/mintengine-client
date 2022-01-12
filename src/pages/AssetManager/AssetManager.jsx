import { Grid } from '@mui/material'
import React from 'react'
import { AssetItem } from '../../components/AssetItem/AssetItem'
import DashboardWrapper from '../../components/Wrappers/DashboardWrapper/DashboardWrapper'
import * as Styles from './assetManager'
import newAssetIcon from '../../assets/assetIcons/newAsset.png'
import optInIcon from  '../../assets/assetIcons/optIn.png'
import optOutIcon from  '../../assets/assetIcons/optOut.png'
import freezeIcon from  '../../assets/assetIcons/freeze.png'
import unfreezeIcon from  '../../assets/assetIcons/unfreeze.png'
import clawbackIcon from  '../../assets/assetIcons/clawback.png'
import modifyIcon from  '../../assets/assetIcons/modify.png'
import destroyIcon from  '../../assets/assetIcons/destroy.png'
import Table from '../../components/Table/Table'


function AssetManager() {

    return (
        <DashboardWrapper>
            <Styles.ManageAssets>
                <h2>MANAGE ASSETS</h2>
                <Grid container rowSpacing={3}>
                    <Grid item xs={6} md={4} lg={2}>
                        <AssetItem color="#e7fdf3">
                            <div className="container">
                                <img src={newAssetIcon} alt="" />
                            </div>
                            <span>New Asset</span>
                        </AssetItem>
                    </Grid>
                    <Grid item xs={6} md={4} lg={2}>
                        <AssetItem color="#e5f2ff">
                            <div className="container">
                                <img src={optInIcon} alt="" />
                            </div>
                            <span>Opt-In</span>
                        </AssetItem>
                    </Grid>
                    <Grid item xs={6} md={4} lg={2}>
                        <AssetItem color="#ffe5e6">
                            <div className="container">
                                <img src={optOutIcon} alt="" />
                            </div>
                            <span>Opt-Out</span>
                        </AssetItem>
                    </Grid>
                    <Grid item xs={6} md={4} lg={2}>
                        <AssetItem color="#f3f2f3">
                            <div className="container">
                                <img src={freezeIcon} alt="" />
                            </div>
                            <span>Freeze</span>
                        </AssetItem>
                    </Grid>
                    <Grid item xs={6} md={4} lg={2}>
                        <AssetItem color="#e5e9ff">
                            <div className="container">
                                <img src={unfreezeIcon} alt="" />
                            </div>
                            <span>Unfreeze</span>
                        </AssetItem>
                    </Grid>
                    <Grid item xs={6} md={4} lg={2}>
                        <AssetItem color="#f3e9fb">
                            <div className="container">
                                <img src={clawbackIcon} alt="" />
                            </div>
                            <span>Clawback</span>
                        </AssetItem>
                    </Grid>
                    <Grid item xs={6} md={4} lg={2}>
                        <AssetItem color="#e9ecfc">
                            <div className="container">
                                <img src={modifyIcon} alt="" />
                            </div>
                            <span>Modify</span>
                        </AssetItem>
                    </Grid>
                    <Grid item xs={6} md={4} lg={2}>
                        <AssetItem color="#ffe5e6">
                            <div className="container">
                                <img src={destroyIcon} alt="" />
                            </div>
                            <span>Destroy</span>
                        </AssetItem>
                    </Grid>
                </Grid>
            </Styles.ManageAssets>
            <Styles.Title>CREATED ASSETS</Styles.Title>
            <Styles.TableBox>
                <Table />
            </Styles.TableBox>
        </DashboardWrapper>
    )
}

export default AssetManager
