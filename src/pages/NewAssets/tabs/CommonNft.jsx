import React, { Fragment, useRef } from 'react'
import { Grid } from '@mui/material'
import FormControl from '../../../components/FormControl/FormControl.jsx'
import { Button, UploadImageButton } from '../../../components/UI/Button/button.js'
import * as SharedStyles from '../../../components/UI/DashboardShared/dashboardShared.js'
import imageFrame from '../../../assets/icons/imageFrame.png'
import useFormControl from '../../../Hooks/FormControl.js'
import useImageHandle from '../../../Hooks/ImageHandle.js'
import useSubmit from '../../../Hooks/Submit.js'
import useFormValidity from '../../../Hooks/FormValidity.js'
import HiddenInput from '../../../components/UI/HiddenInput/HiddenInput'
import useModal from '../../../Hooks/Modal.js'
import { createAlgorandAsset, getActiveAlgorandWallet } from '../../../app/algorand/algorandSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import { HTTP_STATUS } from '../../../constants/httpStatus.js'
import Modal from '../../../components/UI/Modal/Modal.jsx'
import ModalResponse from '../../../components/ModalResponse/ModalResponse.jsx'
import algorandLogo from '../../../assets/icons/algorandLogo.png'

function CommonNft() {
    const dispatch = useDispatch()
    const { value: assetNameValue, handleChange: handleAssetNameChange, handleSetValue: handleSetAssetNameValue } = useFormControl()
    const { value: unitValue, handleChange: handleUnitChange, handleSetValue: handleSetUnitValue } = useFormControl()
    const { value: totalSupplyValue, handleChange: handleTotalSupplyChange, handleSetValue: handleSetTotalSupplyValue } = useFormControl('number')
    const { value: assetUrlValue, handleChange: handleAssetUrlChange, handleSetValue: handleSetAssetUrlValue } = useFormControl()
    const { value: noteValue, handleChange: handleNoteChange, handleSetValue: handleSetNoteValue } = useFormControl()
    const { imageValue, handleImageChange, imageName } = useImageHandle()
    const { formIsValid } = useFormValidity(
        assetNameValue, unitValue, totalSupplyValue, assetUrlValue
    )
    const passphrase = useSelector(state => state.algorand.passphrase)
    const { handleSubmit } = useSubmit()

    const hiddenInputRef = useRef();

    const handleUploadImage = () => {
        hiddenInputRef.current.click()
    }

    const { modalState, handleModalOpen, handleModalClose } = useModal()

    const resetEnteredValues = () => {
        handleSetAssetNameValue('')
        handleSetUnitValue('')
        handleSetTotalSupplyValue('')
        handleSetAssetUrlValue('')
        handleSetNoteValue('')
    }

    const createAssetSuccessCallback = () => {
        handleModalOpen()
        resetEnteredValues()
        dispatch(getActiveAlgorandWallet())
    }

    const createAssetErrorCallback = () => {
        handleModalOpen()
        resetEnteredValues()
    }

    const handleCommonNft = () => {
        const formData = new FormData()
        formData.append('asset_type', 'common_nft')
        formData.append('asset_name', assetNameValue)
        formData.append('image', imageValue)
        formData.append('unit', unitValue)
        formData.append('total_supply', `${totalSupplyValue}`)
        formData.append('asset_url', assetUrlValue)
        formData.append('note', noteValue)
        formData.append('phrase', passphrase)

        handleSubmit(createAlgorandAsset(formData), createAssetSuccessCallback, createAssetErrorCallback)
    }

    const { status, error: errorData } = useSelector(state => state.algorand.createAsset)
    const error = errorData?.error
    const success = status === HTTP_STATUS.FULFILLED

    return (
        <Fragment>
            <SharedStyles.BoxContainer>
                <div className="container">
                    <Grid container columnSpacing={3}>
                        <Grid item xs={12} md={5}>
                            <SharedStyles.Title>Nft Collection</SharedStyles.Title>
                            <SharedStyles.Description>
                                Create and manage digital representations of multiple real-world or digital collectibles tied by the same unique ID on the Algorand blockchain, which can be later sold or distributed as parts of a collection.
                            </SharedStyles.Description>
                        </Grid>

                        <Grid item xs={12} md={7}>
                            <FormControl 
                                label="NFT Collection Name"
                                type="text"
                                value={assetNameValue}
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
                                label="Symbol"
                                type="text"
                                value={unitValue}
                                handleChange={handleUnitChange}
                                maxLength="8"
                            />
                            <FormControl 
                                label="Total Suppy"
                                type="text"
                                value={totalSupplyValue}
                                handleChange={handleTotalSupplyChange}
                            />
                            <FormControl 
                                label="NFT URL"
                                type="text"
                                value={assetUrlValue}
                                handleChange={handleAssetUrlChange}
                                maxLength="96"
                            />
                            <FormControl 
                                textArea
                                label="Note"
                                value={noteValue}
                                handleChange={handleNoteChange}
                            />
                            <SharedStyles.Label>Transaction Fee</SharedStyles.Label>
                            <SharedStyles.TransactionFee>
                                <img src={algorandLogo} alt="" />
                                <p>1.00</p>
                            </SharedStyles.TransactionFee>
                            <Button fullWidth disabled={!formIsValid} onClick={handleCommonNft} style={{ marginTop: '20px' }}>
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
                        success 
                        ? 'Successfully created your nft collection' 
                        : (error || 'An error occurred while creating your nft collection')
                    }
                />
            </Modal>
        </Fragment>
    )
}

export default CommonNft
