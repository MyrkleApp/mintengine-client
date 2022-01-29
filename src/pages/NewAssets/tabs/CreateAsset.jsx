import { Grid } from '@mui/material'
import React from 'react'
import FormControl from '../../../components/FormControl/FormControl'
import { Button, UploadImageButton } from '../../../components/UI/Button/button'
import * as SharedStyles from '../../../components/UI/DashboardShared/dashboardShared'
import imageFrame from '../../../assets/icons/imageFrame.png'

function CreateAsset() {

    return (
        <SharedStyles.BoxContainer>
            <div className="container">
                
                <Grid container columnSpacing={3}>
                    <Grid item xs={12} md={5}>
                        <SharedStyles.Title>Create Asset</SharedStyles.Title>
                        <SharedStyles.Description>
                            With sufficient ALGO balance, you can create new assets. A single Algorand account is permitted to create up to 1000 assets.
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

export default CreateAsset
