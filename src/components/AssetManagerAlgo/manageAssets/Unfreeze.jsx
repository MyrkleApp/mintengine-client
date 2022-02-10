import React, { Fragment } from 'react'
import useFormControl from '../../../Hooks/FormControl'
import { ButtonContainer, ModalTitle } from '../../../pages/AssetManager/assetManager'
import FormControl from '../../FormControl/FormControl'
import { Button } from '../../UI/Button/button'

function Unfreeze() {
    const { value: assetIdValue, handleChange: handleAssetIdChange } = useFormControl()
    const { value: targetAddressValue, handleChange: handleTargetAddressChange } = useFormControl()
    const { value: noteValue, handleChange: handleNoteChange } = useFormControl()

    return (
        <Fragment>
            <ModalTitle>UNFREEZE</ModalTitle>
            <p>Upon creation of an asset, you can specify an unfreeze address.</p>
            <FormControl 
                type="text"
                label="Asset ID"
                value={assetIdValue}
                handleChange={handleAssetIdChange}
            />
            <FormControl 
                type="text"
                label="Target Address"
                value={targetAddressValue}
                handleChange={handleTargetAddressChange}
            />
            <FormControl 
                label="Note"
                textArea
                value={noteValue}
                handleChange={handleNoteChange}
            />
            <ButtonContainer>
                <Button fullWidth disabled>unfreeze</Button>
            </ButtonContainer>
        </Fragment>
    )
}

export default Unfreeze
