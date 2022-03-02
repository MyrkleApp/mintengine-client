import { Grid } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import algoIcon from '../../assets/icons/algorandLogo.png'
import clawbackIcon from '../../assets/icons/clawback.png'
import { ALGORAND } from '../../constants/network'
import * as Styles from './walletAssetItem'
import questionMarkImg from '../../assets/icons/questionMark.jpg'

function WalletAsset({ asset, clawback }) {
    const network = useSelector(state => state.network.network)

    return (
        <Grid item container columns={16} xs={16} alignItems="center">
            <Grid item xs={4} className="imageContainer">
                <Styles.Image src={ asset.img || questionMarkImg } alt="" />
            </Grid>
            <Grid item xs={4}>
                <Styles.AssetName>{ asset.name }</Styles.AssetName><br />
                <Styles.AssetAmount>{ asset.amount }</Styles.AssetAmount>
            </Grid>
            <Grid item xs={network === ALGORAND ? 6 : 8}>
                <Styles.AssetNumber>{ asset.id }</Styles.AssetNumber>
            </Grid>
            { network === ALGORAND && (
                <Grid item xs={2}>
                    {
                        clawback && <img src={clawbackIcon} alt="" />
                    }
                </Grid>
            )}
        </Grid>
    )
}

export default WalletAsset
