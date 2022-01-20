import React, { useState } from 'react'
import { Grid } from '@mui/material'
import * as Styles from './walletAddress'
import qrCode from '../../assets/icons/qrCode.svg'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import { CopyButton, WalletAddressButton } from '../UI/Button/button';
import { Word } from '../UI/WalletShared/walletShared';
import CopyButtonWithTooltip from '../UI/MyTooltip/MyTooltip'
import { MY_ALGORAND_PASSPHRASE } from '../../constants/passphrase';

function WalletAddress() {
    const [open, setOpen] = useState(false)

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
                        MY_ALGORAND_PASSPHRASE.map((item, i) => (
                            <Word key={i}>{ `${i + 1}. ${item}` }</Word>
                        ))
                    }
                    </Grid>
                    <Grid item xs={12} md={3} className="passphraseRight">
                        <CopyButtonWithTooltip 
                            passPhrase={MY_ALGORAND_PASSPHRASE} 
                            text="copy" 
                        />
                        {/* <CopyButton outlined>Copy</CopyButton> */}
                        <WalletAddressButton onClick={hidePassphrase}>Hide Passphrase</WalletAddressButton>
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
                            <WalletAddressButton onClick={showPassphrase}>Show Passphrase</WalletAddressButton>
                        </Grid>
                    </Grid>
                </div>
            </Styles.WalletAddress>
        </Styles.Parent>
    )
}

export default WalletAddress
