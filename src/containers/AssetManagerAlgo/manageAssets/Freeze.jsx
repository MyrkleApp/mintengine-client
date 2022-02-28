import React, { Fragment } from 'react'
import useFormControl from '../../../Hooks/FormControl'
import { ButtonContainer, ModalTitle } from '../../../pages/AssetManager/assetManager'
import FormControl from '../../../components/FormControl/FormControl'
import { Button } from '../../../components/UI/Button/button'
import useFormValidity from '../../../Hooks/FormValidity'
import useSubmit from '../../../Hooks/Submit'
import { freezeAlgorand } from '../../../app/algorand/algorandSlice'
import SelectInput from '../../../components/SelectInput/SelectInput'
import { useSelector } from 'react-redux'

//target address for testing
// WBJY32EU6GP3UKAAM5FLUUPHU7K74CZDDH4ULHOKKUQN3PZLZUHVRXN5IY 


function Freeze({ handleModalClose, handleResponse }) {
    const { value: assetIdValue, handleChange: handleAssetIdChange, setValueByClick: setAssetIdValueByClick } = useFormControl()
    const { value: targetAddressValue, handleChange: handleTargetAddressChange } = useFormControl()
    const { value: noteValue, handleChange: handleNoteChange } = useFormControl()
    const { formIsValid } = useFormValidity(assetIdValue, targetAddressValue)
    const passphrase = useSelector(state => state.algorand.passphrase)
    const { handleSubmit } = useSubmit()

    const handleFreeze = () => {
        handleModalClose()

        const freezeData = { 
            asset_id: assetIdValue, 
            target_addr: targetAddressValue, 
            note: noteValue, 
            phrase: passphrase
        }
        handleSubmit(freezeAlgorand(freezeData), handleResponse, handleResponse)
    }

    return (
        <Fragment>
            <ModalTitle>FREEZE</ModalTitle>
            <p>Upon creation of an asset, you can specify a freeze address.</p>
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
                <Button fullWidth disabled={!formIsValid} onClick={handleFreeze}>freeze</Button>
            </ButtonContainer>
        </Fragment>
    )
}

export default Freeze
