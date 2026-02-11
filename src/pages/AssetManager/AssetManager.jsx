import { Grid } from '@mui/material'
import React from 'react'
import DashboardWrapper from '../../containers/DashboardWrapper/DashboardWrapper.jsx'
import * as Styles from './assetManager.js'
import Table from '../../components/Table/Table.jsx'
import { useSelector } from 'react-redux'
import AssetManagerAlgo from '../../containers/AssetManagerAlgo/AssetManagerAlgo.jsx'
import { ALGORAND, RIPPLE } from '../../constants/network.js'
import AssetManagerRipple from '../../containers/AssetManagerRipple/AssetManagerRipple.jsx'
import ChooseNetwork from '../../components/ChooseNetwork/ChooseNetwork.jsx'
import CreatedAssetsAlgo from '../../containers/CreatedAssetsAlgo/CreatedAssetsAlgo.jsx'


function AssetManager() {
    const network = useSelector(state => state.network.network)

    return (
        <DashboardWrapper>
            <ChooseNetwork />
            <Styles.ManageAssets>
                <h2>MANAGE ASSETS</h2>
                <Grid container rowSpacing={3}>
                    { network === ALGORAND && <AssetManagerAlgo /> }
                    { network === RIPPLE && <AssetManagerRipple /> }
                </Grid>
            </Styles.ManageAssets>
            <Styles.Title>CREATED ASSETS</Styles.Title>
            <Styles.TableBox>
                { network === ALGORAND && <CreatedAssetsAlgo /> }
            </Styles.TableBox>
        </DashboardWrapper>
    )
}

export default AssetManager
