import React, { Fragment } from 'react'
import useFormControl from '../../../Hooks/FormControl'
import { ButtonContainer, ModalTitle } from '../../../pages/AssetManager/assetManager'
import FormControl from '../../../components/FormControl/FormControl'
import { Button } from '../../../components/UI/Button/button'
import useFormValidity from '../../../Hooks/FormValidity'
import useSubmit from '../../../Hooks/Submit'
import { checkAlgorandAssetIsValid, createAlgorandClawback } from '../../../app/algorand/algorandSlice'
import { useSelector } from 'react-redux'
import SelectWithoutDropdown from '../../../components/SelectInput/SelectWithoutDropdown'
import useUserInputDispatch from '../../../Hooks/UserInputDispatch'
import { LoaderContainer } from '../assetManagerAlgo'
import { ThreeDots } from 'react-loader-spinner'
import { HTTP_STATUS } from '../../../constants/httpStatus'

function Unfreeze({ handleModalClose, handleResponse }) {
    const { value: assetIdValue, handleChange: handleAssetIdChange } = useFormControl()
    const { value: amountValue, handleChange: handleAmountChange } = useFormControl()
    const { value: targetAddressValue, handleChange: handleTargetAddressChange } = useFormControl()
    const { value: receivingAddressValue, handleChange: handleReceivingAddressChange } = useFormControl()
    const { value: noteValue, handleChange: handleNoteChange } = useFormControl()
    const { formIsValid } = useFormValidity(assetIdValue, amountValue, targetAddressValue, receivingAddressValue)
    const passphrase = useSelector(state => state.algorand.passphrase)
    const { handleSubmit } = useSubmit()

    //send check request on input change
    const { status: assetIsValidStatus, data: assetIsValidData } = useUserInputDispatch(assetIdValue, { asset_id: assetIdValue }, checkAlgorandAssetIsValid)

    const handleClawback = () => {
        handleModalClose()

        const clawbackData = { 
            asset_id: assetIdValue, 
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
            <p>The clawback address represents an account that is allowed to transfer assets from and to any asset holder.</p>
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
                <Button fullWidth disabled={!formIsValid || !assetIsValidData.name} onClick={handleClawback}>clawback</Button>
            </ButtonContainer>
        </Fragment>
    )
}

export default Unfreeze
