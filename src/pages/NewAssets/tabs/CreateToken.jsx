import React, { useRef } from 'react'
import { Grid } from '@mui/material'
import FormControl from '../../../components/FormControl/FormControl'
import { Button, UploadImageButton } from '../../../components/UI/Button/button'
import * as SharedStyles from '../../../components/UI/DashboardShared/dashboardShared'
import imageFrame from '../../../assets/icons/imageFrame.png'
import useFormControl from '../../../Hooks/FormControl'
import HiddenInput from '../../../components/UI/HiddenInput/HiddenInput'
import useImageHandle from '../../../Hooks/ImageHandle'
import { MY_ALGORAND_PASSPHRASE_STRING } from '../../../constants/passphrase'
import useFormValidity from '../../../Hooks/FormValidity'
import useSubmit from '../../../Hooks/Submit'
import { createAlgorandToken } from '../../../app/algorand/algorandSlice'

function CreateToken() {
    const { value: tokenNameValue, handleChange: handleTokenNameChange } = useFormControl()
    const { value: unitValue, handleChange: handleUnitChange } = useFormControl()
    const { value: totalSupplyValue, handleChange: handleTotalSupplyChange } = useFormControl()
    const { value: decimalValue, handleChange: handleDecimalChange } = useFormControl()
    const { value: assetUrlValue, handleChange: handleAssetUrlChange } = useFormControl()
    const { value: noteValue, handleChange: handleNoteChange } = useFormControl()
    const { imageValue, handleImageChange, imageName } = useImageHandle()
    const { formIsValid } = useFormValidity(
        tokenNameValue, unitValue, totalSupplyValue, decimalValue, assetUrlValue, noteValue
    )
    const { handleSubmit } = useSubmit()

    const hiddenInputRef = useRef(null);

    const handleUploadImage = () => {
        hiddenInputRef.current.click()
    }

    const handleCreateToken = () => {
        const formData = new FormData()
        formData.append('asset_name', tokenNameValue)
        formData.append('image', imageValue)
        formData.append('unit', unitValue)
        formData.append('total_supply', totalSupplyValue)
        formData.append('decimal', decimalValue)
        formData.append('asset_url', assetUrlValue)
        formData.append('note', noteValue)
        formData.append('phrase', MY_ALGORAND_PASSPHRASE_STRING)
        
        handleSubmit(createAlgorandToken(formData))

        // for (let pair of formData.entries()) {
        //     console.log(pair[0]+ ', ' + pair[1]); 
        // }
    }

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
                            <HiddenInput
                                name="image"
                                handleChange={handleImageChange}
                                hiddenInputRef={hiddenInputRef}
                            />
                            <UploadImageButton onClick={handleUploadImage}>Upload Image</UploadImageButton>
                            <span>{imageName}</span>
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
                        <Button fullWidth disabled={!formIsValid} onClick={handleCreateToken} style={{ marginTop: '20px' }}>
                            create asset
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </SharedStyles.BoxContainer>
    )
}

export default CreateToken
