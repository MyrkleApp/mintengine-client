import React, { Fragment} from 'react'
import { ButtonContainer, ModalTitle } from '../../../pages/AssetManager/assetManager.js'
import { Button } from '../../../components/UI/Button/button.js'
import { useSelector } from 'react-redux'
import useFormValidity from '../../../Hooks/FormValidity.js'
import { algorandOptOut } from '../../../app/algorand/algorandSlice.js'
import useSubmit from '../../../Hooks/Submit.js'
import useFormControl from '../../../Hooks/FormControl.js'
import FormControl from '../../../components/FormControl/FormControl.jsx'
import useSearchAssetWithDropdown from '../../../Hooks/SearchAssetWithDropdown.js'
import { HTTP_STATUS } from '../../../constants/httpStatus.js'
import { LoaderContainer } from '../assetManagerAlgo.js'
import { ThreeDots } from 'react-loader-spinner'
import useCustomSelect from '../../../Hooks/CustomSelect.js'
import { Grid } from '@mui/material'
import { CustomDropdownContainer, SelectBox } from '../../../components/CustomSelect/CustomSelect.jsx'


function OptOut({ handleModalClose, handleResponse }) {
    const { selectedItem, setSelectedItem, dropdownIsOpen, setDropdownIsOpen, toggleDropdownIsOpen } = useCustomSelect('initializeAsFilled')
    const { value: assetIDValue, handleChange: handleAssetIDChange, handleSetValue: handleSetAssetIDValue } = useFormControl()
    const activeWalletAddress = useSelector(state => state.algorand.activeWallet.data?.address)
    const { value: receiverAddressValue, handleChange: handleReceiverAddressChange } = useFormControl()
    const { value: noteValue, handleChange: handleNoteChange } = useFormControl()
    
    const { checkValidAssetStatus, checkValidAssetError } = useSearchAssetWithDropdown(assetIDValue, setSelectedItem)
    
    const { formIsValid } = useFormValidity(assetIDValue, receiverAddressValue)
    const { data: holdingsData } = useSelector(state => state.algorand.holdings)
    const passphrase = useSelector(state => state.algorand.passphrase)
    const { handleSubmit } = useSubmit()

    const handleOptOut = () => {
        handleModalClose()

        const optOutData = { 
            asset_id: assetIDValue,
            sender_addr: activeWalletAddress,
            receiver_addr: receiverAddressValue,
            note: noteValue, 
            phrase: passphrase
        }
        handleSubmit(algorandOptOut(optOutData), handleResponse, handleResponse)
    }


    return (
        <Fragment>
            <ModalTitle>REMOVE-ASSET</ModalTitle>
            <p>Disable asset access to your account.</p>

            <Grid item container xs={12} style={{ position: 'relative' }}>
                <SelectBox 
                    { ...selectedItem } 
                    label="Asset"
                    handleClick={(e) => toggleDropdownIsOpen(e)} 
                    value={assetIDValue}
                    onChange={handleAssetIDChange}
                    placeholder="Asset ID"
                />

                <CustomDropdownContainer 
                    dropdownItems={holdingsData} 
                    dropdownIsOpen={dropdownIsOpen}
                    setDropdownIsOpen={setDropdownIsOpen}
                    handleDropdownItemClick={setSelectedItem}
                    handleSetInputValue={handleSetAssetIDValue}
                    inputValueToSet="id"
                />
            </Grid>
            <p>{checkValidAssetError}</p>
            { checkValidAssetStatus === HTTP_STATUS.PENDING && (
                <LoaderContainer><ThreeDots height="80" width="80" color='gray' /></LoaderContainer>
            )}
            <FormControl 
                type="text"
                label="Receiver Address"
                value={receiverAddressValue}
                handleChange={handleReceiverAddressChange}
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
                    onClick={handleOptOut}
                >
                    remove
                </Button>
            </ButtonContainer>
        </Fragment>
    )
}

export default OptOut
