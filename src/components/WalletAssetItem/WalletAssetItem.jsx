import { Grid } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import algoIcon from '../../assets/icons/algorandLogo.png'
import clawbackIcon from '../../assets/icons/clawback.png'
import { ALGORAND } from '../../constants/network.js'
import * as Styles from './walletAssetItem.js'
import noAssetImage from '../../assets/icons/noAssetImage.jpeg'
import useCheckImageExists from '../../Hooks/checkImageExists.js'

function WalletAsset({ asset, clawback }) {
    const network = useSelector(state => state.network.network)
    const currentNet = useSelector(state => state.algorand.activeWallet.data?.current_net)
    const { tinyManAssetImage } = useCheckImageExists(asset)

    return (
        <Grid item container columns={16} xs={16} alignItems="center">
            <Grid item xs={4} className="imageContainer">
                <Styles.Image src={ tinyManAssetImage } alt="" />
            </Grid>
            <Grid item xs={4}>
                <Styles.AssetName>{ asset.unit }</Styles.AssetName><br />
                <Styles.AssetAmount>{ asset.amount }</Styles.AssetAmount>
            </Grid>
            <Grid item xs={network === ALGORAND ? 6 : 8}>
                <Styles.AssetNumber>
                    <a href={currentNet === "testnet" ? `https://testnet.explorer.perawallet.app/asset/${asset.id}` : `https://explorer.perawallet.app/asset/${asset.id}`} style={{ color: '#3E554B' }} target="_blank">{asset.id}</a>
                </Styles.AssetNumber>
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
