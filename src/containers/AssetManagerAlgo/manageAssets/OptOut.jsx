import React, { Fragment, useState } from 'react'
import { ButtonContainer, ModalTitle } from '../../../pages/AssetManager/assetManager'
import { Button } from '../../../components/UI/Button/button'
import { useSelector } from 'react-redux'
import useFormValidity from '../../../Hooks/FormValidity'
import { algorandOptOut } from '../../../app/algorand/algorandSlice'
import useSubmit from '../../../Hooks/Submit'
import useSelectInput from '../../../Hooks/SelectInput'
import SelectInput from '../../../components/SelectInput/SelectInput'


function OptOut({ handleModalClose, handleResponse }) {
    const { status, data } = useSelector(state => state.algorand.holdings)
    const { value: assetValue, setValueByClick: setAssetValueByClick, handleSelectChange: handleAssetSelectChange } = useSelectInput()
    const { formIsValid } = useFormValidity(assetValue.id)
    const passphrase = useSelector(state => state.algorand.passphrase)
    const { handleSubmit } = useSubmit()

    const handleOptOut = () => {
        // const optOutData = { 
        //     sender_addr: 
        // }
        // handleSubmit(algorandOptOut(optOutData), handleResponse, handleResponse)
    }

    return (
        <Fragment>
            <ModalTitle>REMOVE-TOKEN</ModalTitle>
            <p>Remove token with a given Asset ID to remove an Algorand asset holding from your account.</p>
            <SelectInput
                label="Asset"
                value={assetValue.id}
                selectedItem={assetValue}
                handleChange={(e) => handleAssetSelectChange('id', e)}
                handleItemClick={setAssetValueByClick}
            />
            <ButtonContainer>
                <Button fullWidth disabled={!formIsValid} onClick={handleOptOut}>remove</Button>
            </ButtonContainer>
        </Fragment>
    )
}

export default OptOut
