import { Grid } from '@mui/material'
import React from 'react'
import FormControl from '../../../components/FormControl/FormControl'
import { Button } from '../../../components/UI/Button/button'
import * as SharedStyles from '../../../components/UI/DashboardShared/dashboardShared'

function FractionalNft() {

    return (
        <SharedStyles.BoxContainer>
            <div className="container">
                
                <Grid container columnSpacing={3}>
                    <Grid item xs={12} md={5}>
                        <SharedStyles.Title>Fractional Nft</SharedStyles.Title>
                        <SharedStyles.Description>
                            Algorand supports the creation of fractional NFTs and is the only decentralized network that is mathematically proven to be forkless.
                        </SharedStyles.Description>
                    </Grid>

                    <Grid item xs={12} md={7}>
                        <FormControl 
                            icon
                            label="NFT Name"
                        />
                        <FormControl 
                            icon
                            label="Unit"
                        />
                        <FormControl 
                            icon
                            label="Total Suppy"
                        />
                        <FormControl 
                            icon
                            label="Decimal"
                        />
                        <FormControl 
                            icon
                            label="NFT URL"
                        />
                        <Button fullWidth disabled style={{ marginTop: '20px' }}>
                            create asset
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </SharedStyles.BoxContainer>
    )
}

export default FractionalNft
