import { Grid } from '@mui/material'
import React from 'react'
import FormControl from '../../../components/FormControl/FormControl'
import { Button, UploadImageButton } from '../../../components/UI/Button/button'
import * as SharedStyles from '../../../components/UI/DashboardShared/dashboardShared'
import imageFrame from '../../../assets/icons/imageFrame.png'
import useFormControl from '../../../Hooks/FormControl'

function CustomNft() {
    const { value: tokenNameValue, handleChange: handleTokenNameChange } = useFormControl()
    const { value: unitValue, handleChange: handleUnitChange } = useFormControl()
    const { value: totalSupplyValue, handleChange: handleTotalSupplyChange } = useFormControl()
    const { value: decimalValue, handleChange: handleDecimalChange } = useFormControl()
    const { value: assetUrlValue, handleChange: handleAssetUrlChange } = useFormControl()
    const { value: metadataHashValue, handleChange: handleMetadataHashChange } = useFormControl()
    const { value: managerAddressValue, handleChange: handleManagerAddressChange } = useFormControl()
    const { value: freezeAddressValue, handleChange: handleFreezeAddressChange } = useFormControl()
    const { value: clawbackAddressValue, handleChange: handleClawbackAddressChange } = useFormControl()
    const { value: noteValue, handleChange: handleNoteChange } = useFormControl()

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
                            label="Token Name"
                            type="text"
                            value={tokenNameValue}
                            handleChange={handleTokenNameChange}
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
                            label="Asset URL"
                            type="text"
                            value={assetUrlValue}
                            handleChange={handleAssetUrlChange}
                        />
                        <FormControl 
                            label="Metadata Hash"
                            type="text"
                            value={metadataHashValue}
                            handleChange={handleMetadataHashChange}
                        />
                        <FormControl 
                            label="Manager Address"
                            type="text"
                            value={managerAddressValue}
                            handleChange={handleManagerAddressChange}
                        />
                        <FormControl 
                            label="Freeze Address"
                            type="text"
                            value={freezeAddressValue}
                            handleChange={handleFreezeAddressChange}
                        />
                        <FormControl 
                            label="Clawback Address"
                            type="text"
                            value={clawbackAddressValue}
                            handleChange={handleClawbackAddressChange}
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

export default CustomNft
