import { Grid } from '@mui/material'
import React, { useRef } from 'react'
import FormControl from '../../../components/FormControl/FormControl'
import { Button, UploadImageButton } from '../../../components/UI/Button/button'
import * as SharedStyles from '../../../components/UI/DashboardShared/dashboardShared'
import imageFrame from '../../../assets/icons/imageFrame.png'
import useFormControl from '../../../Hooks/FormControl'
import useImageHandle from '../../../Hooks/ImageHandle'
import useFormValidity from '../../../Hooks/FormValidity'
import useModal from '../../../Hooks/Modal'
import { HTTP_STATUS } from '../../../constants/httpStatus'
import { useDispatch, useSelector } from 'react-redux'
import useSubmit from '../../../Hooks/Submit'
import { createAlgorandAsset, getActiveAlgorandWallet } from '../../../app/algorand/algorandSlice'
import HiddenInput from '../../../components/UI/HiddenInput/HiddenInput'
import Modal from '../../../components/UI/Modal/Modal'
import ModalResponse from '../../../components/ModalResponse/ModalResponse'
import { Fragment } from 'react'
import FormControlRadio from '../../../components/FormControl/FormControlRadio'
import useFormControlRadio from '../../../Hooks/FormControlRadio'
import DecimalDropdown from '../../../components/DecimalDropdown/DecimalDropdown'
import algorandLogo from '../../../assets/icons/algorandLogo.png'

function CustomNft() {
    const dispatch = useDispatch()
    const { value: assetNameValue, handleChange: handleAssetNameChange, handleSetValue: handleSetAssetNameValue } = useFormControl()
    const { value: unitValue, handleChange: handleUnitChange, handleSetValue: handleSetUnitValue } = useFormControl()
    const { value: totalSupplyValue, handleChange: handleTotalSupplyChange, handleSetValue: handleSetTotalSupplyValue } = useFormControl('number')
    const { value: decimalValue, handleSetValue: setDecimalValueByClick, handleSetValue: handleSetDecimalValue } = useFormControl()
    const { value: assetUrlValue, handleChange: handleAssetUrlChange, handleSetValue: handleSetAssetUrlValue } = useFormControl()
    const { value: metadataHashValue, handleChange: handleMetadataHashChange, handleSetValue: handleSetMetadataHashValue } = useFormControl()
    const { value: managerAddressValue, handleChange: handleManagerAddressChange, handleSetValue: handleSetManagerAddressValue } = useFormControl()
    const { value: freezeAddressValue, handleChange: handleFreezeAddressChange, handleSetValue: handleSetFreezeAddressValue } = useFormControl()
    const { value: defaultFrozenValue, handleClick: handleRadioClick } = useFormControlRadio("No")
    const { value: reserveAddressValue, handleChange: handleReserveAddressChange, handleSetValue: handleSetReserveAddressValue } = useFormControl()
    const { value: clawbackAddressValue, handleChange: handleClawbackAddressChange, handleSetValue: handleSetClawbackAddressValue } = useFormControl()
    const { value: noteValue, handleChange: handleNoteChange, handleSetValue: handleSetNoteValue } = useFormControl()
    const { imageValue, handleImageChange, imageName } = useImageHandle()
    const { formIsValid } = useFormValidity(
        assetNameValue, unitValue, totalSupplyValue, decimalValue, assetUrlValue, metadataHashValue, managerAddressValue, freezeAddressValue, defaultFrozenValue, reserveAddressValue, clawbackAddressValue
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
        handleSetDecimalValue('')
        handleSetTotalSupplyValue('')
        handleSetAssetUrlValue('')
        handleSetMetadataHashValue('')
        handleSetManagerAddressValue('')
        handleSetFreezeAddressValue('')
        handleSetReserveAddressValue('')
        handleSetClawbackAddressValue('')
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

    const handleCustomNft = () => {
        const formData = new FormData()
        formData.append('asset_type', 'custom_asset')
        formData.append('asset_name', assetNameValue)
        formData.append('image', imageValue)
        formData.append('unit', unitValue)
        formData.append('total_supply', `${totalSupplyValue}`)
        formData.append('decimal', decimalValue)
        formData.append('asset_url', assetUrlValue)
        formData.append('metadata_hash', metadataHashValue)
        formData.append('manager_addr', managerAddressValue)
        formData.append('freeze_addr', freezeAddressValue)
        formData.append('default_frozen', defaultFrozenValue)
        formData.append('reserve_addr', reserveAddressValue)
        formData.append('clawback_addr', clawbackAddressValue)
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
                            <SharedStyles.Title>Custom Asset</SharedStyles.Title>
                            <SharedStyles.Description>
                                Mint Engine gives you the option to fully interact with the ASA creation layer and explores all the features provided by the smart contract.
                            </SharedStyles.Description>
                        </Grid>

                        <Grid item xs={12} md={7}>
                            <FormControl 
                                label="Token Name"
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
                                label="Asset URL"
                                type="text"
                                value={assetUrlValue}
                                handleChange={handleAssetUrlChange}
                                maxLength="96"
                            />
                            <FormControl 
                                label="Metadata"
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
                            <FormControlRadio
                                label="Default Frozen"  
                                options={['Yes', 'No']}
                                value={defaultFrozenValue}
                                handleClick={handleRadioClick}
                            />
                            <FormControl 
                                label="Reserve Address"
                                type="text"
                                value={reserveAddressValue}
                                handleChange={handleReserveAddressChange}
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
                            <SharedStyles.Label>Transaction Fee</SharedStyles.Label>
                            <SharedStyles.TransactionFee>
                                <img src={algorandLogo} alt="" />
                                <p>0.001</p>
                            </SharedStyles.TransactionFee>
                            <Button fullWidth disabled={!formIsValid} onClick={handleCustomNft} style={{ marginTop: '20px' }}>
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
                        success ? 'Successfully created your custom asset' : 'An error occurred while creating your asset'
                    }
                />
            </Modal>
        </Fragment>
    )
}

export default CustomNft
