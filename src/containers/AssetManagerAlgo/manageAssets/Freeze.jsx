import React, { Fragment } from 'react'
import useFormControl from '../../../Hooks/FormControl'
import { ButtonContainer, ModalTitle } from '../../../pages/AssetManager/assetManager'
import FormControl from '../../../components/FormControl/FormControl'
import { Button } from '../../../components/UI/Button/button'
import useFormValidity from '../../../Hooks/FormValidity'
import useSubmit from '../../../Hooks/Submit'
import { freezeAlgorand } from '../../../app/algorand/algorandSlice'
import { useSelector } from 'react-redux'
import useSelectInput from '../../../Hooks/SelectInput'
import SelectInput from '../../../components/SelectInput/SelectInput'

//target address for testing
// WBJY32EU6GP3UKAAM5FLUUPHU7K74CZDDH4ULHOKKUQN3PZLZUHVRXN5IY 


function Freeze({ handleModalClose, handleResponse }) {
    const { value: assetValue, setValueByClick: setAssetValueByClick, handleSelectChange: handleAssetSelectChange } = useSelectInput()
    const { value: targetAddressValue, handleChange: handleTargetAddressChange } = useFormControl()
    const { value: noteValue, handleChange: handleNoteChange } = useFormControl()
    const { formIsValid } = useFormValidity(assetValue.id, targetAddressValue)
    const passphrase = useSelector(state => state.algorand.passphrase)
    const { handleSubmit } = useSubmit()

    const handleFreeze = () => {
        handleModalClose()

        const freezeData = { 
            asset_id: assetValue.id, 
            target_addr: targetAddressValue, 
            note: noteValue, 
            phrase: passphrase
        }
        handleSubmit(freezeAlgorand(freezeData), handleResponse, handleResponse)
    }

    return (
        <Fragment>
            <ModalTitle>FREEZE</ModalTitle>
            <p>Disables the specified target address from transacting with the asset, only the freeze address of this asset can carry out this action.</p>
            <SelectInput
                label="Asset"
                value={assetValue.id}
                asset={assetValue}
                handleChange={(e) => handleAssetSelectChange('id', e)}
                handleItemClick={setAssetValueByClick}
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
                <Button fullWidth disabled={!formIsValid} onClick={handleFreeze}>freeze</Button>
            </ButtonContainer>
        </Fragment>
    )
}

export default Freeze
