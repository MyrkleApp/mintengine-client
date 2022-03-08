import React, { Fragment } from 'react'
import useFormControl from '../../../Hooks/FormControl'
import { ButtonContainer, ModalTitle } from '../../../pages/AssetManager/assetManager'
import FormControl from '../../../components/FormControl/FormControl'
import { Button } from '../../../components/UI/Button/button'
import useFormValidity from '../../../Hooks/FormValidity'
import useSubmit from '../../../Hooks/Submit'
import { checkAlgorandAssetIsValid, destroyAlgorand } from '../../../app/algorand/algorandSlice'
import { useSelector } from 'react-redux'
import SelectWithoutDropdown from '../../../components/SelectInput/SelectWithoutDropdown'
import { HTTP_STATUS } from '../../../constants/httpStatus'
import useUserInputDispatch from '../../../Hooks/UserInputDispatch'
import { LoaderContainer } from '../assetManagerAlgo'
import { ThreeDots } from 'react-loader-spinner'

function Destroy({ handleModalClose, handleResponse }) {
    const { value: assetIdValue, handleChange: handleAssetIdChange } = useFormControl()
    const { value: noteValue, handleChange: handleNoteChange } = useFormControl()
    const { formIsValid } = useFormValidity(assetIdValue)
    const passphrase = useSelector(state => state.algorand.passphrase)
    const { handleSubmit } = useSubmit()

    //send check request on input change
    const { status: assetIsValidStatus, data: assetIsValidData } = useUserInputDispatch(assetIdValue, { asset_id: assetIdValue }, checkAlgorandAssetIsValid)

    const handleDestroy = () => {
        handleModalClose()

        const destroyData = { 
            asset_id: assetIdValue, 
            note: noteValue, 
            phrase: passphrase
        }
        handleSubmit(destroyAlgorand(destroyData), handleResponse, handleResponse)
    }

    return (
        <Fragment>
            <ModalTitle>DELETE TOKEN</ModalTitle>
            <p>All of the assets must be owned by the creator of the asset before the asset can be deleted.</p>
            <SelectWithoutDropdown
                label="Asset ID"
                value={assetIdValue}
                handleChange={handleAssetIdChange}
                asset={assetIsValidData}
            />
            { assetIsValidStatus === HTTP_STATUS.PENDING && (
                <LoaderContainer><ThreeDots height="80" width="80" color='gray' /></LoaderContainer>
            )}
            <FormControl 
                label="Note"
                textArea
                value={noteValue}
                handleChange={handleNoteChange}
            />
            <ButtonContainer>
                <Button fullWidth disabled={!formIsValid || !assetIsValidData.name} onClick={handleDestroy}>delete</Button>
            </ButtonContainer>
        </Fragment>
    )
}

export default Destroy
