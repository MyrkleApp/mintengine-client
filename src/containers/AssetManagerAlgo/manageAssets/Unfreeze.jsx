import React, { Fragment } from 'react'
import useFormControl from '../../../Hooks/FormControl'
import { ButtonContainer, ModalTitle } from '../../../pages/AssetManager/assetManager'
import FormControl from '../../../components/FormControl/FormControl'
import { Button } from '../../../components/UI/Button/button'
import useFormValidity from '../../../Hooks/FormValidity'
import useSubmit from '../../../Hooks/Submit'
import { checkAlgorandAssetIsValid, unfreezeAlgorand } from '../../../app/algorand/algorandSlice'
import { useSelector } from 'react-redux'
import SelectWithoutDropdown from '../../../components/SelectInput/SelectWithoutDropdown'
import useUserInputDispatch from '../../../Hooks/UserInputDispatch'
import { ThreeDots } from 'react-loader-spinner'
import { LoaderContainer } from '../assetManagerAlgo'
import { HTTP_STATUS } from '../../../constants/httpStatus'

function Unfreeze({ handleModalClose, handleResponse }) {
    const { value: assetIdValue, handleChange: handleAssetIdChange } = useFormControl()
    const { value: targetAddressValue, handleChange: handleTargetAddressChange } = useFormControl()
    const { value: noteValue, handleChange: handleNoteChange } = useFormControl()
    const { formIsValid } = useFormValidity(assetIdValue, targetAddressValue)
    const passphrase = useSelector(state => state.algorand.passphrase)
    const { handleSubmit } = useSubmit()

    //send check request on input change
    const { status: assetIsValidStatus, data: assetIsValidData } = useUserInputDispatch(assetIdValue, { asset_id: assetIdValue }, checkAlgorandAssetIsValid)

    const handleUnfreeze = () => {
        handleModalClose()

        const unfreezeData = { 
            asset_id: assetIdValue, 
            target_addr: targetAddressValue, 
            note: noteValue, 
            phrase: passphrase 
        }
        handleSubmit(unfreezeAlgorand(unfreezeData), handleResponse, handleResponse)
    }

    return (
        <Fragment>
            <ModalTitle>UNFREEZE</ModalTitle>
            <p>Upon creation of an asset, you can specify an unfreeze address.</p>
            <SelectWithoutDropdown
                label="Asset ID"
                value={assetIdValue}
                handleChange={handleAssetIdChange}
                asset={assetIsValidData}
            />
            <p>{assetIsValidData?.message}</p>

            { assetIsValidStatus === HTTP_STATUS.PENDING && (
                <LoaderContainer><ThreeDots height="80" width="80" color='gray' /></LoaderContainer>
            )}
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
                <Button fullWidth disabled={!formIsValid || !assetIsValidData.name} onClick={handleUnfreeze}>unfreeze</Button>
            </ButtonContainer>
        </Fragment>
    )
}

export default Unfreeze
