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
                                title="CREATE/MANAGE ACCOUNTS"
                                text="You  can  create  accounts  on multiple  distributed  ledgers  with ease,  you  can  also  import  your wallet  with  a  passphrase  or  seed string."
                            >
                                <AccountBalanceWalletOutlinedIcon fontSize="large" />
                            </HomeCard>
                        </Grid>
                        <Grid item xs={12} style={{ alignSelf: 'flex-end' }} >
                            <HomeCard
                                title="CREATE/MANAGE DIGITAL ASSETS"
                                text="Create  and  manage  digital  assets, either  fungible,  non  fungible  or ledger  objects  on  layer-1  within  few minutes  with  no  code  required."
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
                                title="ASSET MANAGEMENT"
                                text="Hold,  send  and  receive  your  assets all  in  one  place.  You  can  easily transact  coins,  tokens,  NFTs  and ledger  objects  and  review transaction  histories."
                            >
                                <CreateNewFolderOutlinedIcon fontSize="large" />
                            </HomeCard>
                        </Grid>
                        <Grid item xs={12} style={{ alignSelf: 'flex-end' }}>
                            <HomeCard
                                title="DEFI SUITE"
                                text="The  DEFI  suite  offers  DEXs  for  any ledger,  LP  management  support, trading  of  LP  shares;  borrowing, lending  and  staking,  etc."
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
