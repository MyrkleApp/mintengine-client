import React, { Fragment } from 'react'
import useFormControl from '../../../Hooks/FormControl'
import { ButtonContainer, ModalTitle } from '../../../pages/AssetManager/assetManager'
import FormControl from '../../../components/FormControl/FormControl'
import { Button } from '../../../components/UI/Button/button'

function Destroy() {
    const { value: assetIdValue, handleChange: handleAssetIdChange } = useFormControl()
    const { value: noteValue, handleChange: handleNoteChange } = useFormControl()

    return (
        <Fragment>
            <ModalTitle>DESTROY</ModalTitle>
            <p>All of the assets must be owned by the creator of the asset before the asset can be deleted.</p>
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
                <Button fullWidth disabled>destroy</Button>
            </ButtonContainer>
        </Fragment>
    )
}

export default Destroy
