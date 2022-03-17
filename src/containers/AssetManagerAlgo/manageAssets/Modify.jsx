import React, { Fragment } from 'react'
import useFormControl from '../../../Hooks/FormControl'
import { ButtonContainer, ModalTitle } from '../../../pages/AssetManager/assetManager'
import FormControl from '../../../components/FormControl/FormControl'
import { Button } from '../../../components/UI/Button/button'
import useFormValidity from '../../../Hooks/FormValidity'
import useSubmit from '../../../Hooks/Submit'
import { modifyAlgorand } from '../../../app/algorand/algorandSlice'
import { useSelector } from 'react-redux'
import SelectInput from '../../../components/SelectInput/SelectInput'
import useSelectInput from '../../../Hooks/SelectInput'
import useSearchAssetWithDropdown from '../../../Hooks/SearchAssetWithDropdown'
import { HTTP_STATUS } from '../../../constants/httpStatus'
import { LoaderContainer } from '../assetManagerAlgo'
import { ThreeDots } from 'react-loader-spinner'


function Modify({ handleModalClose, handleResponse }) {
    const { 
        value: assetValue, 
        setValueByClick: setAssetValueByClick, 
        handleSelectChange: handleAssetSelectChange,
        handleSetAssetValue: handleSetAssetValue
    } = useSelectInput('emptyId')
    const { value: managerAddressValue, handleChange: handleManagerAddressChange } = useFormControl()
    const { value: reserveAddressValue, handleChange: handleReserveAddressChange } = useFormControl()
    const { value: freezeAddressValue, handleChange: handleFreezeAddressChange } = useFormControl()
    const { value: clawbackAddressValue, handleChange: handleClawbackAddressChange } = useFormControl()
    const { value: noteValue, handleChange: handleNoteChange } = useFormControl()
    const { formIsValid } = useFormValidity(
        assetValue.id, managerAddressValue, reserveAddressValue, freezeAddressValue, clawbackAddressValue
    )
    const passphrase = useSelector(state => state.algorand.passphrase)
    const { handleSubmit } = useSubmit()

    const handleModify = () => {
        handleModalClose()

        const modifyData = { 
            asset_id: assetValue.id, 
            manager_addr: managerAddressValue, 
            reserve_addr: reserveAddressValue,
            freeze_addr: freezeAddressValue,
            clawback_addr: clawbackAddressValue,
            note: noteValue, 
            phrase: passphrase
        }
        handleSubmit(modifyAlgorand(modifyData), handleResponse, handleResponse)
    }

    const { checkValidAssetStatus, checkValidAssetError } = useSearchAssetWithDropdown(assetValue.id, handleSetAssetValue)

    return (
        <Fragment>
            <ModalTitle>MODIFY</ModalTitle>
            <p>Modify the principal addresses of the specified asset. Only the manager address of this asset can carryout this action.</p>
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
                label="Manager's Address"
                value={managerAddressValue}
                handleChange={handleManagerAddressChange}
            />
            <FormControl 
                type="text"
                label="Reserve Address"
                value={reserveAddressValue}
                handleChange={handleReserveAddressChange}
            />
            <FormControl 
                type="text"
                label="Freeze Address"
                value={freezeAddressValue}
                handleChange={handleFreezeAddressChange}
            />
            <FormControl 
                type="text"
                label="Clawback Address"
                value={clawbackAddressValue}
                handleChange={handleClawbackAddressChange}
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
                    onClick={handleModify}
                >
                    modify
                </Button>
            </ButtonContainer>
        </Fragment>
    )
}

export default Modify
