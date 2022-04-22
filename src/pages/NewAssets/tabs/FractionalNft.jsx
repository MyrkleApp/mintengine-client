import React, { Fragment, useRef } from 'react'
import { Grid } from '@mui/material'
import FormControl from '../../../components/FormControl/FormControl'
import { Button, UploadImageButton } from '../../../components/UI/Button/button'
import * as SharedStyles from '../../../components/UI/DashboardShared/dashboardShared'
import imageFrame from '../../../assets/icons/imageFrame.png'
import useFormControl from '../../../Hooks/FormControl'
import useImageHandle from '../../../Hooks/ImageHandle'
import { createAlgorandAsset, getActiveAlgorandWallet } from '../../../app/algorand/algorandSlice'
import useSubmit from '../../../Hooks/Submit'
import useFormValidity from '../../../Hooks/FormValidity'
import HiddenInput from '../../../components/UI/HiddenInput/HiddenInput'
import Modal from '../../../components/UI/Modal/Modal'
import ModalResponse from '../../../components/ModalResponse/ModalResponse'
import useModal from '../../../Hooks/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { HTTP_STATUS } from '../../../constants/httpStatus'
import DecimalDropdown from '../../../components/DecimalDropdown/DecimalDropdown'
import algorandLogo from '../../../assets/icons/algorandLogo.png'

function FractionalNft() {
    const dispatch = useDispatch()
    const { value: assetNameValue, handleChange: handleAssetNameChange, handleSetValue: handleSetAssetNameValue } = useFormControl()
    const { value: unitValue, handleChange: handleUnitChange, handleSetValue: handleSetUnitValue } = useFormControl()
    const { value: totalSupplyValue, handleChange: handleTotalSupplyChange, handleSetValue: handleSetTotalSupplyValue } = useFormControl('number')
    const { value: decimalValue, handleSetValue: setDecimalValueByClick, handleSetValue: handleSetDecimalValue } = useFormControl()
    const { value: assetUrlValue, handleChange: handleAssetUrlChange, handleSetValue: handleSetAssetUrlValue } = useFormControl()
    const { value: noteValue, handleChange: handleNoteChange, handleSetValue: handleSetNoteValue } = useFormControl()
    const { imageValue, handleImageChange, imageName } = useImageHandle()
    const { formIsValid } = useFormValidity(
        assetNameValue, unitValue, totalSupplyValue, decimalValue, assetUrlValue
    )
    const passphrase = useSelector(state => state.algorand.passphrase)
    const { handleSubmit } = useSubmit()

    const hiddenInputRef = useRef()

    const handleUploadImage = () => {
        hiddenInputRef.current.click()
    }

    const { modalState, handleModalOpen, handleModalClose } = useModal()

    const resetEnteredValues = () => {
        handleSetAssetNameValue('')
        handleSetUnitValue('')
        handleSetTotalSupplyValue('')
        handleSetDecimalValue('')
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

    const handleFractionalNft = () => {
        const formData = new FormData()
        formData.append('asset_type', 'fractional_nft')
        formData.append('asset_name', assetNameValue)
        formData.append('image', imageValue)
        formData.append('unit', unitValue)
        formData.append('total_supply', `${totalSupplyValue}`)
        formData.append('decimal', decimalValue)
        formData.append('asset_url', assetUrlValue)
        formData.append('note', noteValue)
        formData.append('phrase', passphrase)
        
        handleSubmit(createAlgorandAsset(formData), createAssetSuccessCallback, createAssetErrorCallback)
    }

    const { status } = useSelector(state => state.algorand.createAsset)
    const success = status === HTTP_STATUS.FULFILLED

    return (
        <Fragment>
            <SharedStyles.BoxContainer>
                <div className="container">
                    <Grid container columnSpacing={3}>
                        <Grid item xs={12} md={5}>
                            <SharedStyles.Title>Fractional Nft</SharedStyles.Title>
                            <SharedStyles.Description>
                                Create digital representations of fractions of real-world assets or digital collectibles on the Algorand blockchain with Mint Engine.
                            </SharedStyles.Description>
                        </Grid>

                        <Grid item xs={12} md={7}>
                            <FormControl 
                                label="NFT Name"
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
                                textArea
                                label="Note"
                                value={noteValue}
                                handleChange={handleNoteChange}
                            />
                            <SharedStyles.Label>Transaction Fee</SharedStyles.Label>
                            <SharedStyles.TransactionFee>
                                <img src={algorandLogo} alt="" />
                                <p>0.001</p>
                            </SharedStyles.TransactionFee>
                            <Button fullWidth disabled={!formIsValid} onClick={handleFractionalNft} style={{ marginTop: '20px' }}>
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
                        success ? 'Successfully created your fractional nft' : 'Something went wrong, the nft was not created'
                    }
                />
            </Modal>
        </Fragment>
    )
}

export default FractionalNft
