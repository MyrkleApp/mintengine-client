import { Grid } from '@mui/material'
import React, { Fragment, useRef } from 'react'
import FormControl from '../../../components/FormControl/FormControl'
import { Button, UploadImageButton } from '../../../components/UI/Button/button'
import * as SharedStyles from '../../../components/UI/DashboardShared/dashboardShared'
import imageFrame from '../../../assets/icons/imageFrame.png'
import useFormControl from '../../../Hooks/FormControl'
import useImageHandle from '../../../Hooks/ImageHandle'
import useFormValidity from '../../../Hooks/FormValidity'
import { createAlgorandAsset } from '../../../app/algorand/algorandSlice'
import { useSelector } from 'react-redux'
import { HTTP_STATUS } from '../../../constants/httpStatus'
import useModal from '../../../Hooks/Modal'
import useSubmit from '../../../Hooks/Submit'
import Modal from '../../../components/UI/Modal/Modal'
import ModalResponse from '../../../components/ModalResponse/ModalResponse'
import HiddenInput from '../../../components/UI/HiddenInput/HiddenInput'

function Web3Ticket() {
    const { value: assetNameValue, handleChange: handleAssetNameChange } = useFormControl()
    const { value: assetUrlValue, handleChange: handleAssetUrlChange } = useFormControl()
    const { value: totalSupplyValue, handleChange: handleTotalSupplyChange } = useFormControl('number')
    const { value: noteValue, handleChange: handleNoteChange } = useFormControl()
    const { imageValue, handleImageChange, imageName } = useImageHandle()
    const { formIsValid } = useFormValidity(
        assetNameValue, assetUrlValue, totalSupplyValue
    )
    const passphrase = useSelector(state => state.algorand.passphrase)
    const { handleSubmit } = useSubmit()

    const hiddenInputRef = useRef()

    const handleUploadImage = () => {
        hiddenInputRef.current.click()
    }

    const { modalState, handleModalOpen, handleModalClose } = useModal()

    const handleWeb3Ticket = () => {
        const formData = new FormData()
        formData.append('asset_type', 'web3ticket')
        formData.append('asset_name', assetNameValue)
        formData.append('image', imageValue)
        formData.append('asset_url', assetUrlValue)
        formData.append('total_supply', totalSupplyValue)
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
                            <SharedStyles.Title>Web3 Ticket</SharedStyles.Title>
                            <SharedStyles.Description>
                                Create counterfeit-proof digital representation of real-world tickets on the Algorand blockchain with Mint Engine.
                            </SharedStyles.Description>
                        </Grid>

                        <Grid item xs={12} md={7}>
                            <FormControl 
                                label="Name"
                                type="text"
                                value={assetNameValue}
                                handleChange={handleAssetNameChange}
                                maxLength="32"
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
                                label="Asset URL"
                                type="text"
                                value={assetUrlValue}
                                handleChange={handleAssetUrlChange}
                                maxLength="96"
                            />
                            <FormControl 
                                label="Total Suppy"
                                type="text"
                                value={totalSupplyValue}
                                handleChange={handleTotalSupplyChange}
                            />
                            <FormControl 
                                textArea
                                label="Note"
                                value={noteValue}
                                handleChange={handleNoteChange}
                            />
                            <Button fullWidth disabled={!formIsValid} onClick={handleWeb3Ticket} style={{ marginTop: '20px' }}>
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
                        success ? 'successfully created your web3 ticket' : 'something went wrong, the web3 ticket was not created'
                    }
                />
            </Modal>
        </Fragment>
    )
}

export default Web3Ticket
