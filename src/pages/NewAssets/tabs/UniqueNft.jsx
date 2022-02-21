import React, { useRef } from 'react'
import { Grid } from '@mui/material'
import FormControl from '../../../components/FormControl/FormControl'
import { Button, UploadImageButton } from '../../../components/UI/Button/button'
import * as SharedStyles from '../../../components/UI/DashboardShared/dashboardShared'
import imageFrame from '../../../assets/icons/imageFrame.png'
import useFormControl from '../../../Hooks/FormControl'
import useFormValidity from '../../../Hooks/FormValidity'
import useSubmit from '../../../Hooks/Submit'
import useImageHandle from '../../../Hooks/ImageHandle'
import HiddenInput from '../../../components/UI/HiddenInput/HiddenInput'
import { createAlgorandUniqueNft } from '../../../app/algorand/algorandSlice'
import useModal from '../../../Hooks/Modal'
import { MY_ALGORAND_PASSPHRASE_STRING } from '../../../constants/passphrase'
import Modal from '../../../components/UI/Modal/Modal'
import ModalResponse from '../../../components/ModalResponse/ModalResponse'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { HTTP_STATUS } from '../../../constants/httpStatus'

function UniqueNft() {
    const { value: nftNameValue, handleChange: handleNftNameChange } = useFormControl()
    const { value: unitValue, handleChange: handleUnitChange } = useFormControl()
    const { value: nftUrlValue, handleChange: handleNftUrlChange } = useFormControl()
    const { value: noteValue, handleChange: handleNoteChange } = useFormControl()
    const { imageValue, handleImageChange, imageName } = useImageHandle()
    const { formIsValid } = useFormValidity(
        nftNameValue, unitValue, nftUrlValue
    )
    const { handleSubmit } = useSubmit()

    const hiddenInputRef = useRef();

    const handleUploadImage = () => {
        hiddenInputRef.current.click()
    }

    const { modalState, handleModalOpen, handleModalClose } = useModal()

    const handleUniqueNf = () => {
        const formData = new FormData()
        formData.append('name', nftNameValue)
        formData.append('image', imageValue)
        formData.append('asset_url', nftUrlValue)
        formData.append('note', noteValue)
        formData.append('phrase', MY_ALGORAND_PASSPHRASE_STRING)

        handleSubmit(createAlgorandUniqueNft(formData), handleModalOpen, handleModalOpen)
    }

    const { status } = useSelector(state => state.algorand.uniqueNft)
    const success = status === HTTP_STATUS.FULFILLED

    return (
        <Fragment>
            <SharedStyles.BoxContainer>
                <div className="container">
                    <Grid container columnSpacing={3}>
                        <Grid item xs={12} md={5}>
                            <SharedStyles.Title>Unique Nft</SharedStyles.Title>
                            <SharedStyles.Description>
                                Create and manage unique non-fungible tokens that represent real-world or Digital assets and collectibles on the Algorand blockchain with Mint Engine.
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
                            <Button fullWidth disabled={!formIsValid} onClick={handleUniqueNf} style={{ marginTop: '20px' }}>
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
                        success ? 'successfully created your unique nft' : 'an error occurred while creating your nft'
                    }
                />
            </Modal>
        </Fragment>
    )
}

export default UniqueNft
