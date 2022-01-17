import { Grid } from '@mui/material'
import React from 'react'
import HomeCard from '../../../components/HomeCard/HomeCard'
import * as Styles from './whatYouGet' 
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

function WhatYouGet() {

    return (
        <Styles.Root>
            <div className="container">
                <h2>What You Get From Mint Engine</h2>
                <Grid container columnSpacing={2} className="gridContainer">
                    <Grid item container xs={12} md={4} rowSpacing={2}>
                        <Grid item xs={12}>
                            <HomeCard
                                title="CREATE/IMPORT WALLET"
                                text="You can create new Algorand Wallet with ease. You can also recover Algorand wallet with a passphrase."
                            >
                                <AccountBalanceWalletOutlinedIcon fontSize="large" />
                            </HomeCard>
                        </Grid>
                        <Grid item xs={12} style={{ alignSelf: 'flex-end' }} >
                            <HomeCard
                                title="ASSETS MANAGEMENT"
                                text="Hold, transact, and manage your assets all in one place. You can easily send and receive ALGOs and review transaction histories."
                            >
                                <MonetizationOnOutlinedIcon fontSize="large" />
                            </HomeCard>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <HomeCard
                            title="NFT MARKETPLACE"
                            text="Connect your wallet, trade rare and unique NFTs Mint Engine NFT Market place. You can also create your collection of NFTs."
                            showImage
                        />
                    </Grid>
                    <Grid item container xs={12} md={4} rowSpacing={2}>
                        <Grid item xs={12}>
                            <HomeCard
                                title="CREATE STANDARD ASSETS"
                                text="Create new tokens, either fungible or non-fungible, on layer-1 within few minutes. There is no contract code required."
                            >
                                <CreateNewFolderOutlinedIcon fontSize="large" />
                            </HomeCard>
                        </Grid>
                        <Grid item xs={12} style={{ alignSelf: 'flex-end' }}>
                            <HomeCard
                                title="MANAGE STANDARD ASSETS"
                                text="Tokenize real-world assets and contribute to the digital revolution. Even a complete novice can benefit from this."
                            >
                                <MenuOutlinedIcon fontSize="large" />
                            </HomeCard>
                        </Grid>
                    </Grid>
                </Grid>
            </div>

        </Styles.Root>
    )
}

export default WhatYouGet
