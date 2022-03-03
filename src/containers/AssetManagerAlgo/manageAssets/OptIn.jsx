import React, { Fragment } from 'react'
import useFormControl from '../../../Hooks/FormControl'
import { ButtonContainer, ModalTitle } from '../../../pages/AssetManager/assetManager'
import FormControl from '../../../components/FormControl/FormControl'
import { Button } from '../../../components/UI/Button/button'
import { algorandOptIn } from '../../../app/algorand/algorandSlice'
import useSubmit from '../../../Hooks/Submit'
import useFormValidity from '../../../Hooks/FormValidity'
import { useSelector } from 'react-redux'
import SelectWithoutDropdown from '../../../components/SelectInput/SelectWithoutDropdown'


function OptIn({ handleModalClose, handleResponse }) {
    const { value: assetIdValue, handleChange: handleAssetIdChange } = useFormControl()
    const { value: noteValue, handleChange: handleNoteChange } = useFormControl()
    const { formIsValid } = useFormValidity(assetIdValue)
    const passphrase = useSelector(state => state.algorand.passphrase)
    const { handleSubmit } = useSubmit()

    const handleOptIn = () => {
        handleModalClose()
        
        const optInData = { asset_id: assetIdValue, note: noteValue, phrase: passphrase }
        handleSubmit(algorandOptIn(optInData), handleResponse, handleResponse)
    }

    
    return (
        <Fragment>
            <ModalTitle>ADD-TOKEN</ModalTitle>
            <p>Add token with a given asset ID to receive an Algorand asset to your account.</p>

            <SelectWithoutDropdown
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
                <Button fullWidth onClick={handleOptIn} disabled={!formIsValid}>add</Button>
            </ButtonContainer>
        </Fragment>
    )
}

export default OptIn
