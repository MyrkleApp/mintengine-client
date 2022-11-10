import { Grid } from '@mui/material'
import React, { useState, Suspense } from 'react'
import HomeCard from '../../../components/HomeCard/HomeCard'
import * as Styles from './whatYouGet' 
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CircularProgress from '@mui/material/CircularProgress';

const MyCarousel = React.lazy(() => import('../../../components/Carousel/Carousel'));

function WhatYouGet() {
    const [selectedItem, setSelectedItem] = useState(0);

    const handleClick = i => {
        setSelectedItem(i)
        const carousel = document.getElementById('my-carousel')
        carousel.scrollIntoView()
    }

    return (
        <>
            <Styles.Root>
                <div className="container">
                    <h2>What You Get From Mint Engine</h2>
                    <Grid container columnSpacing={2} className="gridContainer">
                        <Grid item container xs={12} md={4} rowSpacing={2}>
                            <Grid item xs={12}>
                                <HomeCard
                                    title="CREATE/IMPORT WALLET"
                                    text="You can create new Algorand/XRPL Wallet with ease. You can also recover Algorand/XRPL wallet with a passphrase."
                                    handleClick={() => handleClick(0)}
                                >
                                    <AccountBalanceWalletOutlinedIcon fontSize="large" />
                                </HomeCard>
                            </Grid>
                            <Grid item xs={12} style={{ alignSelf: 'flex-end' }} >
                                <HomeCard
                                    title="ASSETS MANAGEMENT"
                                    text="Hold, transact, and manage your assets all in one place. You can easily send and receive ALGOs/XRPs and review transaction histories."
                                    handleClick={() => handleClick(1)}
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
                                    handleClick={() => handleClick(4)}
                                >
                                    <CreateNewFolderOutlinedIcon fontSize="large" />
                                </HomeCard>
                            </Grid>
                            <Grid item xs={12} style={{ alignSelf: 'flex-end' }}>
                                <HomeCard
                                    title="MANAGE STANDARD ASSETS"
                                    text="Tokenize real-world assets and contribute to the digital revolution. Even a complete novice can benefit from this."
                                    handleClick={() => handleClick(3)}
                                >
                                    <MenuOutlinedIcon fontSize="large" />
                                </HomeCard>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </Styles.Root>

            <Styles.CarouselRoot id="my-carousel">
                <Suspense fallback={<CircularProgress />}>
                    <MyCarousel selectedItem={selectedItem} />
                </Suspense>
            </Styles.CarouselRoot>
        </>
    )
}

export default WhatYouGet
