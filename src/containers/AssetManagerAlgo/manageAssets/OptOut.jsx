import React, { Fragment, useState } from 'react'
import { ButtonContainer, ModalTitle } from '../../../pages/AssetManager/assetManager'
import { Button } from '../../../components/UI/Button/button'
import { useSelector } from 'react-redux'
import useFormValidity from '../../../Hooks/FormValidity'
import { algorandOptOut } from '../../../app/algorand/algorandSlice'
import useSubmit from '../../../Hooks/Submit'
import useSelectInput from '../../../Hooks/SelectInput'
import SelectInput from '../../../components/SelectInput/SelectInput'
import useFormControl from '../../../Hooks/FormControl'
import FormControl from '../../../components/FormControl/FormControl'


function OptOut({ handleModalClose, handleResponse }) {
    const { value: assetValue, setValueByClick: setAssetValueByClick, handleSelectChange: handleAssetSelectChange } = useSelectInput()
    const activeWalletAddress = useSelector(state => state.algorand.activeWallet.data?.address)
    const { value: receiverAddressValue, handleChange: handleReceiverAddressChange } = useFormControl()
    const { value: noteValue, handleChange: handleNoteChange } = useFormControl()
    const { formIsValid } = useFormValidity(assetValue.id, receiverAddressValue)
    const passphrase = useSelector(state => state.algorand.passphrase)
    const { handleSubmit } = useSubmit()

    const handleOptOut = () => {
        handleModalClose()

        const optOutData = { 
            asset_id: assetValue.id,
            sender_addr: activeWalletAddress,
            receiver_addr: receiverAddressValue,
            note: noteValue, 
            phrase: passphrase
        }
        handleSubmit(algorandOptOut(optOutData), handleResponse, handleResponse)
    }

    return (
        <Fragment>
            <ModalTitle>REMOVE-TOKEN</ModalTitle>
            <p>Disable asset access to your account.</p>
            <SelectInput
                label="Asset"
                value={assetValue.id}
                asset={assetValue}
                handleChange={(e) => handleAssetSelectChange('id', e)}
                handleItemClick={setAssetValueByClick}
            />
            <FormControl 
                type="text"
                label="Receiver Address"
                value={receiverAddressValue}
                handleChange={handleReceiverAddressChange}
            />
            <FormControl 
                label="Note"
                textArea
                value={noteValue}
                handleChange={handleNoteChange}
            />
            <ButtonContainer>
                <Button fullWidth disabled={!formIsValid} onClick={handleOptOut}>remove</Button>
            </ButtonContainer>
        </Fragment>
    )
}

export default OptOut
