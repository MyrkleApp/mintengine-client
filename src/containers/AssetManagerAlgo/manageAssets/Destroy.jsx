import React, { Fragment } from 'react'
import useFormControl from '../../../Hooks/FormControl'
import { ButtonContainer, ModalTitle } from '../../../pages/AssetManager/assetManager'
import FormControl from '../../../components/FormControl/FormControl'
import { Button } from '../../../components/UI/Button/button'
import SelectInput from '../../../components/SelectInput/SelectInput'
import useFormValidity from '../../../Hooks/FormValidity'
import useSubmit from '../../../Hooks/Submit'
import { destroyAlgorand } from '../../../app/algorand/algorandSlice'
import { MY_ALGORAND_PASSPHRASE_STRING } from '../../../constants/passphrase'

function Destroy({ handleModalClose, handleResponse }) {
    const { value: assetIdValue, handleChange: handleAssetIdChange, setValueByClick: setAssetIdValueByClick } = useFormControl()
    const { value: noteValue, handleChange: handleNoteChange } = useFormControl()
    const { formIsValid } = useFormValidity(assetIdValue, noteValue)
    const { handleSubmit } = useSubmit()

    const handleDestroy = () => {
        handleModalClose()

        const destroyData = { 
            asset_id: assetIdValue, 
            note: noteValue, 
            phrase: MY_ALGORAND_PASSPHRASE_STRING 
        }
        handleSubmit(destroyAlgorand(destroyData), handleResponse, handleResponse)
    }

    return (
        <Fragment>
            <ModalTitle>DELETE TOKEN</ModalTitle>
            <p>All of the assets must be owned by the creator of the asset before the asset can be deleted.</p>
            <SelectInput
                label="Asset ID"
                value={assetIdValue}
                handleChange={handleAssetIdChange}
                handleItemClick={setAssetIdValueByClick}
            />
            <FormControl 
                label="Note"
                textArea
                value={noteValue}
                handleChange={handleNoteChange}
            />
            <ButtonContainer>
                <Button fullWidth disabled={!formIsValid} onClick={handleDestroy}>delete</Button>
            </ButtonContainer>
        </Fragment>
    )
}

export default Destroy
