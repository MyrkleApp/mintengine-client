import React, { Fragment } from 'react'
import useFormControl from '../../../Hooks/FormControl'
import { ButtonContainer, ModalTitle } from '../../../pages/AssetManager/assetManager'
import FormControl from '../../../components/FormControl/FormControl'
import { Button } from '../../../components/UI/Button/button'
import { algorandOptIn } from '../../../app/algorand/algorandSlice'
import { MY_ALGORAND_PASSPHRASE_STRING } from '../../../constants/passphrase'
import useSubmit from '../../../Hooks/Submit'

function OptIn({ handleModalClose }) {
    const { value: assetIdValue, handleChange: handleAssetIdChange } = useFormControl()
    const { value: noteValue, handleChange: handleNoteChange } = useFormControl()
    const { handleSubmit } = useSubmit()

    const handleOptIn = () => {
        handleModalClose()
        /**
        * ! MY_ALGORAND_PASSPHRASE SHOULD BE CHANGED TO USE REDUX STATE
        */
        const optInData = { asset_id: assetIdValue, note: noteValue, phrase: MY_ALGORAND_PASSPHRASE_STRING }
        handleSubmit(algorandOptIn(optInData))
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
                <Button fullWidth onClick={handleOptIn}>add</Button>
            </ButtonContainer>
        </Fragment>
    )
}

export default OptIn
