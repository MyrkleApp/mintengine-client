import { Grid } from '@mui/material'
import React from 'react'
import FormControl from '../../../components/FormControl/FormControl'
import { Button, UploadImageButton } from '../../../components/UI/Button/button'
import * as SharedStyles from '../../../components/UI/DashboardShared/dashboardShared'
import imageFrame from '../../../assets/icons/imageFrame.png'
import useFormControl from '../../../Hooks/FormControl'

function CreateToken() {
    const { value: tokenNameValue, handleChange: handleTokenNameChange } = useFormControl()
    const { value: unitValue, handleChange: handleUnitChange } = useFormControl()
    const { value: totalSupplyValue, handleChange: handleTotalSupplyChange } = useFormControl()
    const { value: decimalValue, handleChange: handleDecimalChange } = useFormControl()
    const { value: assetUrlValue, handleChange: handleAssetUrlChange } = useFormControl()
    const { value: noteValue, handleChange: handleNoteChange } = useFormControl()


    return (
        <SharedStyles.BoxContainer>
            <div className="container">
                
                <Grid container columnSpacing={3}>
                    <Grid item xs={12} md={5}>
                        <SharedStyles.Title>Create Token</SharedStyles.Title>
                        <SharedStyles.Description>
                            Create and manage fungible tokens on the Algorand blockchain with Mint engine.
                        </SharedStyles.Description>
                    </Grid>

                    <Grid item xs={12} md={7}>
                        <FormControl 
                            type="text"
                            label="Token Name"
                            value={tokenNameValue}
                            handleChange={handleTokenNameChange}
                        />
                        <SharedStyles.UploadImageBox>
                            <img src={imageFrame} alt="" />
                            <UploadImageButton>Upload Image</UploadImageButton>
                        </SharedStyles.UploadImageBox>
                        <FormControl 
                            type="text"
                            label="Unit"
                            value={unitValue}
                            handleChange={handleUnitChange}
                        />
                        <FormControl 
                            type="text"
                            label="Total Supply"
                            value={totalSupplyValue}
                            handleChange={handleTotalSupplyChange}
                        />
                        <FormControl 
                            type="text"
                            label="Decimal"
                            value={decimalValue}
                            handleChange={handleDecimalChange}
                        />
                        <FormControl 
                            type="text"
                            label="Asset URL"
                            value={assetUrlValue}
                            handleChange={handleAssetUrlChange}
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

export default CreateToken
