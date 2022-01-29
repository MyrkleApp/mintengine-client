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
                        <SharedStyles.Title>Custom Nft</SharedStyles.Title>
                        <SharedStyles.Description>
                            When creating custom assets, you must specify how many units of this asset will be created, clawback, freeze, reserve, manager addresses functions as well as metadata fields.
                        </SharedStyles.Description>
                    </Grid>

                    <Grid item xs={12} md={7}>
                        <FormControl 
                            icon
                            label="Asset Name"
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
