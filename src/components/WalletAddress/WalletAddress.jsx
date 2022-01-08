import { Grid } from '@mui/material'
import React from 'react'
import * as Styles from './walletAddress'
import qrCode from '../../assets/icons/qrCode.svg'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';

function WalletAddress() {

    return (
        <Styles.Root>
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
                    </Grid>
                </Grid>
            </div>
        </Styles.Root>
    )
}

export default WalletAddress
