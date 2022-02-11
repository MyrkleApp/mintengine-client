import React, { Fragment } from 'react'
import useFormControl from '../../../Hooks/FormControl'
import { ButtonContainer, ModalTitle } from '../../../pages/AssetManager/assetManager'
import FormControl from '../../../components/FormControl/FormControl'
import { Button } from '../../../components/UI/Button/button'

function Unfreeze() {
    const { value: assetIdValue, handleChange: handleAssetIdChange } = useFormControl()
    const { value: managersAddressValue, handleChange: handleManagersAddressChange } = useFormControl()
    const { value: reserveAddressValue, handleChange: handleReserveAddressChange } = useFormControl()
    const { value: freezeAddressValue, handleChange: handleFreezeAddressChange } = useFormControl()
    const { value: clawbackAddressValue, handleChange: handleClawbackAddressChange } = useFormControl()
    const { value: noteValue, handleChange: handleNoteChange } = useFormControl()

    return (
        <Fragment>
            <ModalTitle>MODIFY</ModalTitle>
            <p>After an asset has been created only the manager, reserve, freeze and clawback accounts can be changed.</p>
            <FormControl 
                type="text"
                label="Asset ID"
                value={assetIdValue}
                handleChange={handleAssetIdChange}
            />
            <FormControl 
                type="text"
                label="Manager's Address"
                value={managersAddressValue}
                handleChange={handleManagersAddressChange}
            />
            <FormControl 
                type="text"
                label="Reserve Address"
                value={reserveAddressValue}
                handleChange={handleReserveAddressChange}
            />
            <FormControl 
                type="text"
                label="Asset ID"
                value={freezeAddressValue}
                handleChange={handleFreezeAddressChange}
            />
            <FormControl 
                type="text"
                label="Clawback Address"
                value={clawbackAddressValue}
                handleChange={handleClawbackAddressChange}
            />
            <FormControl 
                label="Note"
                textArea
                value={noteValue}
                handleChange={handleNoteChange}
            />
            <ButtonContainer>
                <Button fullWidth disabled>modify</Button>
            </ButtonContainer>
        </Fragment>
    )
}

export default Unfreeze
