import { Grid } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import algoIcon from '../../assets/icons/algorandLogo.png'
import clawbackIcon from '../../assets/icons/clawback.png'
import { ALGORAND } from '../../constants/network'
import * as Styles from './walletAssetItem'

function WalletAsset({ clawback }) {
    const network = useSelector(state => state.network.network)

    return (
        <Grid item container columns={16} xs={16} alignItems="center">
            <Grid item xs={4}>
                <img src={algoIcon} alt="" />
            </Grid>
            <Grid item xs={4}>
                <Styles.AssetName>ALGO</Styles.AssetName><br/>
                <Styles.AssetAmount>0.00</Styles.AssetAmount>
            </Grid>
            <Grid item xs={network === ALGORAND ? 6 : 8}>
                <Styles.AssetNumber>12345678</Styles.AssetNumber>
            </Grid>
            { network === ALGORAND && (
                <Grid item xs={2}>
                    {
                        clawback && <img src={clawbackIcon} alt=""/>
                    }
                </Grid>
            )}
        </Grid>
    )
}

export default WalletAsset
