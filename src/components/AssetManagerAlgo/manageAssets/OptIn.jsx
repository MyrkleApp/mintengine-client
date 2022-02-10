import React, { Fragment } from 'react'
import useFormControl from '../../../Hooks/FormControl'
import { ButtonContainer, ModalTitle } from '../../../pages/AssetManager/assetManager'
import FormControl from '../../FormControl/FormControl'
import { Button } from '../../UI/Button/button'

function OptIn() {
    const { value: assetIdValue, handleChange: handleAssetIdChange } = useFormControl()
    const { value: noteValue, handleChange: handleNoteChange } = useFormControl()

    const handleSubmit = () => {
        alert(`${assetIdValue}, ${noteValue}`)
    }

    return (
        <Fragment>
            <ModalTitle>OPT-IN</ModalTitle>
            <p>Opt-in with a given asset ID to receive an Algorand asset to your account.</p>
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
