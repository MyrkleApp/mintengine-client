import { Grid } from '@mui/material'
import React from 'react'
import FormControl from '../../../components/FormControl/FormControl'
import { Button, UploadImageButton } from '../../../components/UI/Button/button'
import * as SharedStyles from '../../../components/UI/DashboardShared/dashboardShared'
import imageFrame from '../../../assets/icons/imageFrame.png'

function CustomNft() {

    return (
        <SharedStyles.BoxContainer>
            <div className="container">
                
                <Grid container columnSpacing={3}>
                    <Grid item xs={12} md={5}>
                        <SharedStyles.Title>Custom Token</SharedStyles.Title>
                        <SharedStyles.Description>
                            Mint Engine gives you the option to fully interact with the ASA creation layer and explores all the features provided by the smart contract.
                        </SharedStyles.Description>
                    </Grid>

                    <Grid item xs={12} md={7}>
                        <FormControl 
                            icon
                            label="Token Name"
                        />
                        <SharedStyles.UploadImageBox>
                            <img src={imageFrame} alt="" />
                            <UploadImageButton>Upload Image</UploadImageButton>
                        </SharedStyles.UploadImageBox>
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
                            label="Asset URL"
                        />
                        <FormControl 
                            icon
                            label="Metadata Hash"
                        />
                        <FormControl 
                            icon
                            label="Manager Address"
                        />
                        <FormControl 
                            icon
                            label="Freeze Address"
                        />
                        <FormControl 
                            icon
                            label="Clawback Address"
                        />
                        <FormControl 
                            icon
                            textArea
                            label="Note"
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

export default CustomNft
