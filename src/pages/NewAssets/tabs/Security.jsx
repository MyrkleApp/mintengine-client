import { Grid } from '@mui/material'
import React from 'react'
import FormControl from '../../../components/FormControl/FormControl'
import { Button } from '../../../components/UI/Button/button'
import * as SharedStyles from '../../../components/UI/DashboardShared/dashboardShared'

function Security() {

    return (
        <SharedStyles.BoxContainer>
            <div className="container">
                
                <Grid container columnSpacing={3}>
                    <Grid item xs={12} md={5}>
                        <SharedStyles.Title>Security</SharedStyles.Title>
                        <SharedStyles.Description>
                            Creating security tokens is the same as creating NFTs or FTs, with the extra configuration settings specified.
                        </SharedStyles.Description>
                    </Grid>

                    <Grid item xs={12} md={7}>
                        <FormControl 
                            icon
                            label="Asset Name"
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
                        <FormControl 
                            icon
                            label="Metadata Hash"
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

export default Security
