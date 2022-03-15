import React, { Fragment } from 'react'
import useFormControl from '../../../Hooks/FormControl'
import { ButtonContainer, ModalTitle } from '../../../pages/AssetManager/assetManager'
import FormControl from '../../../components/FormControl/FormControl'
import { Button } from '../../../components/UI/Button/button'
import useFormValidity from '../../../Hooks/FormValidity'
import useSubmit from '../../../Hooks/Submit'
import { createAlgorandClawback } from '../../../app/algorand/algorandSlice'
import { useSelector } from 'react-redux'
import useSelectInput from '../../../Hooks/SelectInput'
import SelectInput from '../../../components/SelectInput/SelectInput'

function Unfreeze({ handleModalClose, handleResponse }) {
    const { value: assetValue, setValueByClick: setAssetValueByClick, handleSelectChange: handleAssetSelectChange } = useSelectInput()
    const { value: amountValue, handleChange: handleAmountChange } = useFormControl()
    const { value: targetAddressValue, handleChange: handleTargetAddressChange } = useFormControl()
    const { value: receivingAddressValue, handleChange: handleReceivingAddressChange } = useFormControl()
    const { value: noteValue, handleChange: handleNoteChange } = useFormControl()
    const { formIsValid } = useFormValidity(assetValue.id, amountValue, targetAddressValue, receivingAddressValue)
    const passphrase = useSelector(state => state.algorand.passphrase)
    const { handleSubmit } = useSubmit()

    const handleClawback = () => {
        handleModalClose()

        const clawbackData = { 
            asset_id: assetValue.id, 
            amount: amountValue,
            target_addr: targetAddressValue, 
            receiving_address: receivingAddressValue,
            note: noteValue, 
            phrase: passphrase
        }
        handleSubmit(createAlgorandClawback(clawbackData), handleResponse, handleResponse)
    }

    return (
        <Fragment>
            <ModalTitle>CLAWBACK</ModalTitle>
            <p>Retrieve the asset from the target address and send it to the receiving address. Only the clawback address of this asset can carryout this action.</p>
            <SelectInput
                label="Asset"
                value={assetValue.id}
                asset={assetValue}
                handleChange={(e) => handleAssetSelectChange('id', e)}
                handleItemClick={setAssetValueByClick}
            />
            <FormControl 
                type="text"
                label="Amount"
                value={amountValue}
                handleChange={handleAmountChange}
            />
            <FormControl 
                type="text"
                label="Target Address"
                value={targetAddressValue}
                handleChange={handleTargetAddressChange}
            />
            <FormControl 
                type="text"
                label="Receiving Address"
                value={receivingAddressValue}
                handleChange={handleReceivingAddressChange}
            />
            <FormControl 
                label="Note"
                textArea
                value={noteValue}
                handleChange={handleNoteChange}
            />
            <ButtonContainer>
                <Button fullWidth disabled={!formIsValid} onClick={handleClawback}>clawback</Button>
            </ButtonContainer>
        </Fragment>
    )
}

export default Unfreeze
