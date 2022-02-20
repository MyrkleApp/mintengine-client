import React, { Fragment } from 'react'
import useFormControl from '../../../Hooks/FormControl'
import { ButtonContainer, ModalTitle } from '../../../pages/AssetManager/assetManager'
import FormControl from '../../../components/FormControl/FormControl'
import { Button } from '../../../components/UI/Button/button'
import useFormValidity from '../../../Hooks/FormValidity'
import useSubmit from '../../../Hooks/Submit'
import { modifyAlgorand } from '../../../app/algorand/algorandSlice'
import { MY_ALGORAND_PASSPHRASE_STRING } from '../../../constants/passphrase'
import SelectInput from '../../../components/SelectInput/SelectInput'

function Modify({ handleModalClose, handleResponse }) {
    const { value: assetIdValue, handleChange: handleAssetIdChange, setValueByClick: setAssetIdValueByClick } = useFormControl()
    const { value: managerAddressValue, handleChange: handleManagerAddressChange } = useFormControl()
    const { value: reserveAddressValue, handleChange: handleReserveAddressChange } = useFormControl()
    const { value: freezeAddressValue, handleChange: handleFreezeAddressChange } = useFormControl()
    const { value: clawbackAddressValue, handleChange: handleClawbackAddressChange } = useFormControl()
    const { value: noteValue, handleChange: handleNoteChange } = useFormControl()
    const { formIsValid } = useFormValidity(
        assetIdValue, managerAddressValue, reserveAddressValue, freezeAddressValue, clawbackAddressValue, noteValue
    )
    const { handleSubmit } = useSubmit()

    const handleModify = () => {
        handleModalClose()

        const modifyData = { 
            asset_id: assetIdValue, 
            manager_addr: managerAddressValue, 
            reserve_addr: reserveAddressValue,
            freeze_addr: freezeAddressValue,
            clawback_addr: clawbackAddressValue,
            note: noteValue, 
            phrase: MY_ALGORAND_PASSPHRASE_STRING 
        }
        handleSubmit(modifyAlgorand(modifyData), handleResponse, handleResponse)
    }

    return (
        <Fragment>
            <ModalTitle>MODIFY</ModalTitle>
            <p>After an asset has been created only the manager, reserve, freeze and clawback accounts can be changed.</p>
            <SelectInput
                label="Asset ID"
                value={assetIdValue}
                handleChange={handleAssetIdChange}
                handleItemClick={setAssetIdValueByClick}
            />
            <FormControl 
                type="text"
                label="Manager's Address"
                value={managerAddressValue}
                handleChange={handleManagerAddressChange}
            />
            <FormControl 
                type="text"
                label="Reserve Address"
                value={reserveAddressValue}
                handleChange={handleReserveAddressChange}
            />
            <FormControl 
                type="text"
                label="Freeze Address"
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
                <Button fullWidth disabled={!formIsValid} onClick={handleModify}>modify</Button>
            </ButtonContainer>
        </Fragment>
    )
}

export default Modify
