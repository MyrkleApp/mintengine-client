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
import useSearchAssetWithDropdown from '../../../Hooks/SearchAssetWithDropdown'
import { HTTP_STATUS } from '../../../constants/httpStatus'
import { LoaderContainer } from '../assetManagerAlgo'
import { ThreeDots } from 'react-loader-spinner'


function Destroy({ handleModalClose, handleResponse }) {
    const { 
        value: assetValue, 
        setValueByClick: setAssetValueByClick, 
        handleSelectChange: handleAssetSelectChange,
        handleSetAssetValue: handleSetAssetValue
    } = useSelectInput('emptyId')
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

    const { checkValidAssetStatus, checkValidAssetError } = useSearchAssetWithDropdown(assetValue.id, handleSetAssetValue)

    return (
        <Fragment>
            <ModalTitle>DELETE TOKEN</ModalTitle>
            <p>Completely delete an asset from the network. All assets must be held by the creator address before the manager address can execute this action.</p>
            <SelectInput
                label="Asset"
                value={assetValue.id}
                asset={assetValue}
                handleChange={(e) => handleAssetSelectChange('id', e)}
                handleItemClick={setAssetValueByClick}
            />
            <p>{checkValidAssetError}</p>
            { checkValidAssetStatus === HTTP_STATUS.PENDING && (
                <LoaderContainer><ThreeDots height="80" width="80" color='gray' /></LoaderContainer>
            )}
            <FormControl 
                label="Note"
                textArea
                value={noteValue}
                handleChange={handleNoteChange}
            />
            <ButtonContainer>
                <Button 
                    fullWidth 
                    disabled={!formIsValid || checkValidAssetError || (checkValidAssetStatus === HTTP_STATUS.PENDING)} 
                    onClick={handleDestroy}
                >
                    delete
                </Button>
            </ButtonContainer>
        </Fragment>
    )
}

export default Destroy
