import { Grid } from '@mui/material'
import React from 'react'
import FormControl from '../../../components/FormControl/FormControl'
import { Button } from '../../../components/UI/Button/button'
import * as SharedStyles from '../../../components/UI/DashboardShared/dashboardShared'

function CommonNft() {

    return (
        <SharedStyles.BoxContainer>
            <div className="container">
                
                <Grid container columnSpacing={3}>
                    <Grid item xs={12} md={5}>
                        <SharedStyles.Title>Common Nft</SharedStyles.Title>
                        <SharedStyles.Description>
                            NFTs are are built into the protocol and activated using a special type of transaction. You do not need to write smart contract code, which may be the case on some other blockchains.
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

export default CommonNft
