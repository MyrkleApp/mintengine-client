import React, { Fragment } from 'react'
import useFormControl from '../../../Hooks/FormControl'
import { ButtonContainer, ModalTitle } from '../../../pages/AssetManager/assetManager'
import FormControl from '../../../components/FormControl/FormControl'
import { Button } from '../../../components/UI/Button/button'
import { algorandOptIn } from '../../../app/algorand/algorandSlice'
import { MY_ALGORAND_PASSPHRASE_STRING } from '../../../constants/passphrase'
import useSubmit from '../../../Hooks/Submit'
import useFormValidity from '../../../Hooks/FormValidity'
import SelectInput from '../../../components/SelectInput/SelectInput'


function OptIn({ handleModalClose, handleResponse }) {
    const { value: assetIdValue, handleChange: handleAssetIdChange, setValueByClick: setAssetIdValueByClick } = useFormControl()
    const { value: noteValue, handleChange: handleNoteChange } = useFormControl()
    const { formIsValid } = useFormValidity(assetIdValue, noteValue)
    const { handleSubmit } = useSubmit()

    const handleOptIn = () => {
        handleModalClose()
        /**
        * ! MY_ALGORAND_PASSPHRASE SHOULD BE CHANGED TO USE REDUX STATE
        */
        const optInData = { asset_id: assetIdValue, note: noteValue, phrase: MY_ALGORAND_PASSPHRASE_STRING }
        handleSubmit(algorandOptIn(optInData), handleResponse, handleResponse)
    }

    
    return (
        <Fragment>
            <ModalTitle>ADD-TOKEN</ModalTitle>
            <p>Add token with a given asset ID to receive an Algorand asset to your account.</p>
            <SelectInput
                label="Asset ID"
                value={assetIdValue}
                handleChange={handleAssetIdChange}
                handleItemClick={setAssetIdValueByClick}
            />
            <FormControl 
                label="Note"
                textArea
                value={noteValue}
                handleChange={handleNoteChange}
            />
            <ButtonContainer>
                <Button fullWidth onClick={handleOptIn} disabled={!formIsValid}>add</Button>
            </ButtonContainer>
        </Fragment>
    )
}

export default OptIn
