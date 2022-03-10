import React, { Fragment } from 'react'
import useFormControl from '../../../Hooks/FormControl'
import { ButtonContainer, ModalTitle } from '../../../pages/AssetManager/assetManager'
import FormControl from '../../../components/FormControl/FormControl'
import { Button } from '../../../components/UI/Button/button'
import useFormValidity from '../../../Hooks/FormValidity'
import useSubmit from '../../../Hooks/Submit'
import { destroyAlgorand } from '../../../app/algorand/algorandSlice'
import { useSelector } from 'react-redux'
import useSelectInput from '../../../Hooks/SelectInput'
import SelectInput from '../../../components/SelectInput/SelectInput'

function Destroy({ handleModalClose, handleResponse }) {
    const { value: assetValue, setValueByClick: setAssetValueByClick, handleSelectChange: handleAssetSelectChange } = useSelectInput()
    const { value: noteValue, handleChange: handleNoteChange } = useFormControl()
    const { formIsValid } = useFormValidity(assetValue.id)
    const passphrase = useSelector(state => state.algorand.passphrase)
    const { handleSubmit } = useSubmit()

    const handleDestroy = () => {
        handleModalClose()

        const destroyData = { 
            asset_id: assetValue.id, 
            note: noteValue, 
            phrase: passphrase
        }
        handleSubmit(destroyAlgorand(destroyData), handleResponse, handleResponse)
    }

    return (
        <Fragment>
            <ModalTitle>DELETE TOKEN</ModalTitle>
            <p>All of the assets must be owned by the creator of the asset before the asset can be deleted.</p>
            <SelectInput
                label="Asset"
                value={assetValue.id}
                asset={assetValue}
                handleChange={(e) => handleAssetSelectChange('id', e)}
                handleItemClick={setAssetValueByClick}
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
