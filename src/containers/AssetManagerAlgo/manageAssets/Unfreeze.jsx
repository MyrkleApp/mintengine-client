import React, { Fragment } from 'react'
import useFormControl from '../../../Hooks/FormControl'
import { ButtonContainer, ModalTitle } from '../../../pages/AssetManager/assetManager'
import FormControl from '../../../components/FormControl/FormControl'
import { Button } from '../../../components/UI/Button/button'
import useFormValidity from '../../../Hooks/FormValidity'
import useSubmit from '../../../Hooks/Submit'
import { unfreezeAlgorand } from '../../../app/algorand/algorandSlice'
import { useSelector } from 'react-redux'
import useSelectInput from '../../../Hooks/SelectInput'
import SelectInput from '../../../components/SelectInput/SelectInput'
import useSearchAssetWithDropdown from '../../../Hooks/SearchAssetWithDropdown'
import { HTTP_STATUS } from '../../../constants/httpStatus'
import { LoaderContainer } from '../assetManagerAlgo'
import { ThreeDots } from 'react-loader-spinner'


function Unfreeze({ handleModalClose, handleResponse }) {
    const { 
        value: assetValue, 
        setValueByClick: setAssetValueByClick, 
        handleSelectChange: handleAssetSelectChange,
        handleSetAssetValue: handleSetAssetValue
    } = useSelectInput('emptyId')
    const { value: targetAddressValue, handleChange: handleTargetAddressChange } = useFormControl()
    const { value: noteValue, handleChange: handleNoteChange } = useFormControl()
    const { formIsValid } = useFormValidity(assetValue.id, targetAddressValue)
    const passphrase = useSelector(state => state.algorand.passphrase)
    const { handleSubmit } = useSubmit()

    const handleUnfreeze = () => {
        handleModalClose()

        const unfreezeData = { 
            asset_id: assetValue.id, 
            target_addr: targetAddressValue, 
            note: noteValue, 
            phrase: passphrase 
        }
        handleSubmit(unfreezeAlgorand(unfreezeData), handleResponse, handleResponse)
    }

    const { checkValidAssetStatus, checkValidAssetError } = useSearchAssetWithDropdown(assetValue.id, handleSetAssetValue)

    return (
        <Fragment>
            <ModalTitle>UNFREEZE</ModalTitle>
            <p>Enables the specified target address from transacting with the asset, only the freeze address of this asset can carry out this action. Asset must have been previously frozen for the target address.</p>
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
                <Button 
                    fullWidth 
                    disabled={!formIsValid || checkValidAssetError || (checkValidAssetStatus === HTTP_STATUS.PENDING)} 
                    onClick={handleUnfreeze}
                >
                    unfreeze
                </Button>
            </ButtonContainer>
        </Fragment>
    )
}

export default Unfreeze
