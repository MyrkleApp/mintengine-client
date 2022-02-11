import React, { useState } from 'react'
import { Grid } from '@mui/material'
import * as Styles from './walletAddress'
import qrCode from '../../assets/icons/qrCode.svg'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import { CopyButton, WalletAddressButton } from '../../components/UI/Button/button';
import { Word } from '../../components/UI/WalletShared/walletShared';
import CopyButtonWithTooltip from '../../components/UI/MyTooltip/MyTooltip'
import { MY_ALGORAND_PASSPHRASE } from '../../constants/passphrase';
import { useSelector } from 'react-redux';
import { ALGORAND, RIPPLE } from '../../constants/network';

function WalletAddress() {
    const [open, setOpen] = useState(false)
    const network = useSelector(state => state.network.network)
    const rippleSeed = 'c6c108b3e923ea40067d129715065d96733528fc4ae5317814f795999f22b88f866a3343237b206daf6537ab593cba0b42a8f51721a6df3c5771cdc9312afc46'
    const textToCopy = network === ALGORAND ? MY_ALGORAND_PASSPHRASE : rippleSeed

    const showPassphrase = () => {
        setOpen(true)
    }

    const hidePassphrase = () => {
        setOpen(false)
    }

    return (
        <Styles.Parent show={open}>
            <Styles.WalletPassphrase show={open}>
                <Grid container className="gridContainer">
                    <Grid item xs={12} md={9} className="wordsBox">
                    {
                        network === ALGORAND && (
                            MY_ALGORAND_PASSPHRASE.map((item, i) => (
                                <Word key={i}>{ `${i + 1}. ${item}` }</Word>
                            ))
                        )
                    }
                    {
                        network === RIPPLE && (
                            <Styles.RippleSeed>
                                { rippleSeed }
                            </Styles.RippleSeed>
                        )
                    }
                    </Grid>
                    <Grid item xs={12} md={3} className="passphraseRight">
                        <CopyButtonWithTooltip 
                            textToCopy={textToCopy} 
                            text="copy" 
                        />
                        {/* <CopyButton outlined>Copy</CopyButton> */}
                        <WalletAddressButton onClick={hidePassphrase}>
                            { network === ALGORAND ? 'Hide Passphrase' : 'Hide Seed' }
                        </WalletAddressButton>
                    </Grid>
                </Grid>
            </Styles.WalletPassphrase>
            <Styles.WalletAddress>
                <div className="container">
                    <span className="welcome">Welcome, Username</span>
                    <Grid container>
                        <Grid item xs={12} md={5} className="left">
                            OFUVYAGG6WTU2ZUS2TQE4CM3HH3QJDISX3I5SLOZHE2Q6QP3IOC3BXPY4A
                            <ContentCopyOutlinedIcon className="copyIcon" />
                        </Grid>

                        <Grid item xs={12} md={3} className="center">
                            <div className="qrBox">
                                <img src={qrCode} alt="" />
                            </div>
                        </Grid>

                        <Grid item xs={12} md={4} className="right">
                            <span className="amount">0.00 </span>
                            <span className="coinName">ALGO</span><br />
                            <div className="dollarAmount">~ $0</div>
                            <WalletAddressButton onClick={showPassphrase}>
                                { network === ALGORAND ? 'Show Passphrase' : 'Show Seed' }
                            </WalletAddressButton>
                        </Grid>
                    </Grid>
                </div>
            </Styles.WalletAddress>
        </Styles.Parent>
    )
}

export default WalletAddress
