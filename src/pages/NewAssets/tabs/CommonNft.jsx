import React, { Fragment, useRef } from 'react'
import { Grid } from '@mui/material'
import FormControl from '../../../components/FormControl/FormControl'
import { Button, UploadImageButton } from '../../../components/UI/Button/button'
import * as SharedStyles from '../../../components/UI/DashboardShared/dashboardShared'
import imageFrame from '../../../assets/icons/imageFrame.png'
import useFormControl from '../../../Hooks/FormControl'
import useImageHandle from '../../../Hooks/ImageHandle'
import useSubmit from '../../../Hooks/Submit'
import useFormValidity from '../../../Hooks/FormValidity'
import HiddenInput from '../../../components/UI/HiddenInput/HiddenInput'
import { MY_ALGORAND_PASSPHRASE_STRING } from '../../../constants/passphrase'
import useModal from '../../../Hooks/Modal'
import { createAlgorandCommonNft } from '../../../app/algorand/algorandSlice'
import { useSelector } from 'react-redux'
import { HTTP_STATUS } from '../../../constants/httpStatus'
import Modal from '../../../components/UI/Modal/Modal'
import ModalResponse from '../../../components/ModalResponse/ModalResponse'

function CommonNft() {
    const { value: nftNameValue, handleChange: handleNftNameChange } = useFormControl()
    const { value: unitValue, handleChange: handleUnitChange } = useFormControl()
    const { value: totalSupplyValue, handleChange: handleTotalSupplyChange } = useFormControl()
    const { value: nftUrlValue, handleChange: handleNftUrlChange } = useFormControl()
    const { value: noteValue, handleChange: handleNoteChange } = useFormControl()
    const { imageValue, handleImageChange, imageName } = useImageHandle()
    const { formIsValid } = useFormValidity(
        nftNameValue, unitValue, totalSupplyValue, nftUrlValue
    )
    const { handleSubmit } = useSubmit()

    const hiddenInputRef = useRef();

    const handleUploadImage = () => {
        hiddenInputRef.current.click()
    }

    const { modalState, handleModalOpen, handleModalClose } = useModal()

    const handleCommonNft = () => {
        const formData = new FormData()
        formData.append('nft_name', nftNameValue)
        formData.append('image', imageValue)
        formData.append('unit', unitValue)
        formData.append('total_supply', totalSupplyValue)
        formData.append('nft_url', nftUrlValue)
        formData.append('note', noteValue)
        formData.append('phrase', MY_ALGORAND_PASSPHRASE_STRING)

        handleSubmit(createAlgorandCommonNft(formData), handleModalOpen, handleModalOpen)
    }

    const { status } = useSelector(state => state.algorand.commonNft)
    const success = status === HTTP_STATUS.FULFILLED

    return (
        <Fragment>
            <SharedStyles.BoxContainer>
                <div className="container">
                    <Grid container columnSpacing={3}>
                        <Grid item xs={12} md={5}>
                            <SharedStyles.Title>Common Nft</SharedStyles.Title>
                            <SharedStyles.Description>
                                Create and manage digital representations of multiple real-world or digital collectibles tied by the same unique ID on the Algorand blockchain, which can be later sold or distributed as parts of a collection.
                            </SharedStyles.Description>
                        </Grid>

                        <Grid item xs={12} md={7}>
                            <FormControl 
                                label="NFT Name"
                                type="text"
                                value={nftNameValue}
                                handleChange={handleNftNameChange}
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
                                label="NFT URL"
                                type="text"
                                value={nftUrlValue}
                                handleChange={handleNftUrlChange}
                            />
                            <FormControl 
                                textArea
                                label="Note"
                                value={noteValue}
                                handleChange={handleNoteChange}
                            />
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
                        success ? 'successfully created your common nft' : 'an error occurred while creating your nft'
                    }
                />
            </Modal>
        </Fragment>
    )
}

export default CommonNft
