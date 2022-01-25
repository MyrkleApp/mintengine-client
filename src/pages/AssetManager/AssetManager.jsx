import { Grid } from '@mui/material'
import React from 'react'
import DashboardWrapper from '../../components/Wrappers/DashboardWrapper/DashboardWrapper'
import * as Styles from './assetManager'
import Table from '../../components/Table/Table'
import { useSelector } from 'react-redux'
import AssetManagerAlgo from '../../components/AssetManagerAlgo/AssetManagerAlgo'
import { ALGORAND, RIPPLE } from '../../constants/network'
import AssetManagerRipple from '../../components/AssetManagerRipple/AssetManagerRipple'
import ChooseNetwork from '../../components/ChooseNetwork/ChooseNetwork'


function AssetManager() {
    const network = useSelector(state => state.network.network)

    return (
        <DashboardWrapper>
            <ChooseNetwork />
            <Styles.ManageAssets>
                <h2>MANAGE ASSETS</h2>
                <Grid container rowSpacing={3}>
                    {
                        network === ALGORAND && (
                            <AssetManagerAlgo />
                        )
                    }

                    {
                        network === RIPPLE && (
                            <AssetManagerRipple />
                        )
                    }
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
