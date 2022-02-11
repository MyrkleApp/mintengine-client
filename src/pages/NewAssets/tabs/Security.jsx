import { Grid } from '@mui/material'
import React from 'react'
import FormControl from '../../../components/FormControl/FormControl'
import { Button, UploadImageButton } from '../../../components/UI/Button/button'
import * as SharedStyles from '../../../components/UI/DashboardShared/dashboardShared'
import imageFrame from '../../../assets/icons/imageFrame.png'
import useFormControl from '../../../Hooks/FormControl'

function Security() {
    const { value: assetNameValue, handleChange: handleAssetNameChange } = useFormControl()
    const { value: unitValue, handleChange: handleUnitChange } = useFormControl()
    const { value: totalSupplyValue, handleChange: handleTotalSupplyChange } = useFormControl()
    const { value: decimalValue, handleChange: handleDecimalChange } = useFormControl()
    const { value: nftUrlValue, handleChange: handleNftUrlChange } = useFormControl()
    const { value: metadataHashValue, handleChange: handleMetadataHashChange } = useFormControl()
    const { value: noteValue, handleChange: handleNoteChange } = useFormControl()

    return (
        <SharedStyles.BoxContainer>
            <div className="container">
                <Grid container columnSpacing={3}>
                    <Grid item xs={12} md={5}>
                        <SharedStyles.Title>Security</SharedStyles.Title>
                        <SharedStyles.Description>
                            Create and manage algorithmically backed digital representations of tradable financial instruments on the Algorand blockchain with Mint Engine. This is a proof of concept derived from the custom Fungible token template.
                        </SharedStyles.Description>
                    </Grid>

                    <Grid item xs={12} md={7}>
                        <FormControl 
                            label="Asset Name"
                            type="text"
                            value={assetNameValue}
                            handleChange={handleAssetNameChange}
                        />
                        <SharedStyles.UploadImageBox>
                            <img src={imageFrame} alt="" />
                            <UploadImageButton>Upload Image</UploadImageButton>
                        </SharedStyles.UploadImageBox>
                        <FormControl 
                            label="Unit"
                            type="text"
                            value={unitValue}
                            handleChange={handleUnitChange}
                        />
                        <FormControl 
                            label="Total Suppy"
                            type="text"
                            value={totalSupplyValue}
                            handleChange={handleTotalSupplyChange}
                        />
                        <FormControl 
                            label="Decimal"
                            type="text"
                            value={decimalValue}
                            handleChange={handleDecimalChange}
                        />
                        <FormControl 
                            label="NFT URL"
                            type="text"
                            value={nftUrlValue}
                            handleChange={handleNftUrlChange}
                        />
                        <FormControl 
                            label="Metadata Hash"
                            type="text"
                            value={metadataHashValue}
                            handleChange={handleMetadataHashChange}
                        />
                        <FormControl 
                            textArea
                            label="Note"
                            value={noteValue}
                            handleChange={handleNoteChange}
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
