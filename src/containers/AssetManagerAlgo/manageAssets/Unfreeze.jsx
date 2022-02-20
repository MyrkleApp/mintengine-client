import React, { Fragment } from 'react'
import useFormControl from '../../../Hooks/FormControl'
import { ButtonContainer, ModalTitle } from '../../../pages/AssetManager/assetManager'
import FormControl from '../../../components/FormControl/FormControl'
import { Button } from '../../../components/UI/Button/button'
import { MY_ALGORAND_PASSPHRASE_STRING } from '../../../constants/passphrase'
import useFormValidity from '../../../Hooks/FormValidity'
import useSubmit from '../../../Hooks/Submit'
import { unfreezeAlgorand } from '../../../app/algorand/algorandSlice'
import SelectInput from '../../../components/SelectInput/SelectInput'

function Unfreeze({ handleModalClose, handleResponse }) {
    const { value: assetIdValue, handleChange: handleAssetIdChange, setValueByClick: setAssetIdValueByClick } = useFormControl()
    const { value: targetAddressValue, handleChange: handleTargetAddressChange } = useFormControl()
    const { value: noteValue, handleChange: handleNoteChange } = useFormControl()
    const { formIsValid } = useFormValidity(assetIdValue, targetAddressValue, noteValue)
    const { handleSubmit } = useSubmit()

    const handleUnfreeze = () => {
        handleModalClose()

        const unfreezeData = { 
            asset_id: assetIdValue, 
            target_addr: targetAddressValue, 
            note: noteValue, 
            phrase: MY_ALGORAND_PASSPHRASE_STRING 
        }
        handleSubmit(unfreezeAlgorand(unfreezeData), handleResponse, handleResponse)
    }

    return (
        <Fragment>
            <ModalTitle>UNFREEZE</ModalTitle>
            <p>Upon creation of an asset, you can specify an unfreeze address.</p>
            <SelectInput
                label="Asset ID"
                value={assetIdValue}
                handleChange={handleAssetIdChange}
                handleItemClick={setAssetIdValueByClick}
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
                <Button fullWidth disabled={!formIsValid} onClick={handleUnfreeze}>unfreeze</Button>
            </ButtonContainer>
        </Fragment>
    )
}

export default Unfreeze
