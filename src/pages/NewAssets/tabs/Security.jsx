import React, { Fragment, useRef } from 'react'
import { Grid } from '@mui/material'
import FormControl from '../../../components/FormControl/FormControl'
import { Button, UploadImageButton } from '../../../components/UI/Button/button'
import * as SharedStyles from '../../../components/UI/DashboardShared/dashboardShared'
import imageFrame from '../../../assets/icons/imageFrame.png'
import useFormControl from '../../../Hooks/FormControl'
import useImageHandle from '../../../Hooks/ImageHandle'
import useFormValidity from '../../../Hooks/FormValidity'
import useSubmit from '../../../Hooks/Submit'
import useModal from '../../../Hooks/Modal'
import HiddenInput from '../../../components/UI/HiddenInput/HiddenInput'
import Modal from '../../../components/UI/Modal/Modal'
import ModalResponse from '../../../components/ModalResponse/ModalResponse'
import { useSelector } from 'react-redux'
import { HTTP_STATUS } from '../../../constants/httpStatus'
import DecimalDropdown from '../../../components/DecimalDropdown/DecimalDropdown'
import { createAlgorandAsset } from '../../../app/algorand/algorandSlice'

function Security() {
    const { value: assetName, handleChange: handleAssetNameChange } = useFormControl()
    const { value: unitValue, handleChange: handleUnitChange } = useFormControl()
    const { value: totalSupplyValue, handleChange: handleTotalSupplyChange } = useFormControl('number')
    const { value: decimalValue, handleSetValue: setDecimalValueByClick } = useFormControl()
    const { value: assetUrlValue, handleChange: handleAssetUrlChange } = useFormControl()
    const { value: metadataHashValue, handleChange: handleMetadataHashChange } = useFormControl()
    const { value: noteValue, handleChange: handleNoteChange } = useFormControl()
    const { imageValue, handleImageChange, imageName } = useImageHandle()
    const passphrase = useSelector(state => state.algorand.passphrase)
    const { formIsValid } = useFormValidity(
        assetName, unitValue, totalSupplyValue, decimalValue, assetUrlValue, metadataHashValue
    )
    const { handleSubmit } = useSubmit()

    const hiddenInputRef = useRef()

    const handleUploadImage = () => {
        hiddenInputRef.current.click()
    }

    const { modalState, handleModalOpen, handleModalClose } = useModal()

    const handleSecurityToken = () => {
        const formData = new FormData()
        formData.append('asset_type', 'security')
        formData.append('asset_name', assetName)
        formData.append('image', imageValue)
        formData.append('unit', unitValue)
        formData.append('total_supply', `${totalSupplyValue}`)
        formData.append('decimal', decimalValue)
        formData.append('asset_url', assetUrlValue)
        formData.append('note', noteValue)
        formData.append('phrase', passphrase)
        
        handleSubmit(createAlgorandAsset(formData), handleModalOpen, handleModalOpen)
    }

    const { status } = useSelector(state => state.algorand.createAsset)
    const success = status === HTTP_STATUS.FULFILLED

    return (
        <Fragment>
            <SharedStyles.BoxContainer>
                <div className="container">
                    <Grid container columnSpacing={3}>
                        <Grid item xs={12} md={5}>
                            <SharedStyles.Title>Security</SharedStyles.Title>
                            <SharedStyles.Description>
                                Create and manage algorithmically backed digital representations of tradable financial instruments on the Algorand blockchain with Mint Engine. 
                            </SharedStyles.Description>
                        </Grid>

                        <Grid item xs={12} md={7}>
                            <FormControl 
                                label="Asset Name"
                                type="text"
                                value={assetName}
                                handleChange={handleAssetNameChange}
                                maxLength="32"
                            />
                            {/* <SharedStyles.UploadImageBox>
                                <img src={imageFrame} alt="" />
                                <HiddenInput
                                    name="image"
                                    handleChange={handleImageChange}
                                    hiddenInputRef={hiddenInputRef}
                                />
                                <UploadImageButton onClick={handleUploadImage}>Upload Image</UploadImageButton>
                                <span>{imageName}</span>
                            </SharedStyles.UploadImageBox> */}
                            <FormControl 
                                label="Unit"
                                type="text"
                                value={unitValue}
                                handleChange={handleUnitChange}
                                maxLength="8"
                            />
                            <Grid item container xs={12} columnSpacing={2}>
                                <Grid item xs={9}>
                                    <FormControl 
                                        type="text"
                                        label="Total Supply"
                                        value={totalSupplyValue}
                                        handleChange={handleTotalSupplyChange}
                                    />
                                </Grid>
                                <Grid item xs={3} style={{ position: 'relative' }}>
                                    <DecimalDropdown 
                                        value={decimalValue}
                                        handleClick={setDecimalValueByClick}
                                    />
                                </Grid>
                            </Grid>
                            <SharedStyles.CalcResult>{`Total Supply = ${(totalSupplyValue/Math.pow(10, decimalValue)).toFixed(decimalValue)}`}</SharedStyles.CalcResult>
                            <FormControl 
                                label="NFT URL"
                                type="text"
                                value={assetUrlValue}
                                handleChange={handleAssetUrlChange}
                                maxLength="96"
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
                            <Button fullWidth disabled={!formIsValid} onClick={handleSecurityToken} style={{ marginTop: '20px' }}>
                                create asset
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </SharedStyles.BoxContainer>

            {/* response modal */}
            <Modal open={modalState} handleClose={handleModalClose}>
            <ModalResponse
                success={success}
                title={success ? 'success' : 'error'}
                description={
                    success ? 'successfully created your security token' : 'something went wrong, the token was not created'
                }
            />
        </Modal>
    </Fragment>
    )
}

export default Security
