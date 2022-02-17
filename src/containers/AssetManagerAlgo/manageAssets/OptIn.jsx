import React, { Fragment } from 'react'
import useFormControl from '../../../Hooks/FormControl'
import { ButtonContainer, ModalTitle } from '../../../pages/AssetManager/assetManager'
import FormControl from '../../../components/FormControl/FormControl'
import { Button } from '../../../components/UI/Button/button'
import { useDispatch } from 'react-redux'
import { algorandOptIn } from '../../../app/algorand/algorandSlice'
import { hideBackdrop, showBackdrop } from '../../../app/backdrop/backdropSlice'
import { MY_ALGORAND_PASSPHRASE_STRING } from '../../../constants/passphrase'

function OptIn({ handleModalClose }) {
    const dispatch = useDispatch()
    const { value: assetIdValue, handleChange: handleAssetIdChange } = useFormControl()
    const { value: noteValue, handleChange: handleNoteChange } = useFormControl()

    const handleSubmit = () => {
        handleModalClose()
        dispatch(showBackdrop())

        /**
         * ! MY_ALGORAND_PASSPHRASE SHOULD BE CHANGED TO USE REDUX STATE
         */
        const optInData = { asset_id: assetIdValue, note: noteValue, phrase: MY_ALGORAND_PASSPHRASE_STRING }
        console.log(MY_ALGORAND_PASSPHRASE_STRING)

        dispatch(algorandOptIn(optInData))
        .unwrap()
        .then(() => dispatch(hideBackdrop()))
        .catch(() => dispatch(hideBackdrop()))

    }

    return (
        <Fragment>
            <ModalTitle>ADD-TOKEN</ModalTitle>
            <p>Add token with a given asset ID to receive an Algorand asset to your account.</p>
            <FormControl 
                type="text"
                label="Asset ID"
                value={assetIdValue}
                handleChange={handleAssetIdChange}
            />
            <FormControl 
                label="Note"
                textArea
                value={noteValue}
                handleChange={handleNoteChange}
            />
            <ButtonContainer>
                <Button fullWidth onClick={handleSubmit}>opt-in</Button>
            </ButtonContainer>
        </Fragment>
    )
}

export default OptIn
