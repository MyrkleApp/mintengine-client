import React, { Fragment, useEffect, useState } from 'react'
import FormControl from '../../../components/FormControl/FormControl'
import SelectInput from '../../../components/SelectInput/SelectInput'
import scannerIcon from '../../../assets/icons/scanner.svg'
import { Label, TransactionFee, ButtonContainer, LoaderContainer, ErrorMessage, Title, SubTitle, ConfirmTransferItem } from '../wallet'
import algorandLogo from '../../../assets/icons/algorandLogo.png'
import { Button } from '../../../components/UI/Button/button'
import useFormControl from '../../../Hooks/FormControl'
import useSelectInput from '../../../Hooks/SelectInput'
import { IconButton } from '../wallet'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SelectWithoutDropdown from '../../../components/SelectInput/SelectWithoutDropdown'
import QrCodeScanner from '../../../components/QrCodeScanner/QrCodeScanner'
import { ThreeDots } from 'react-loader-spinner'
import { HTTP_STATUS } from '../../../constants/httpStatus'
import { useSelector, useDispatch } from 'react-redux'
import useSubmit from '../../../Hooks/Submit'
import { sendAlgorand, getActiveAlgorandWallet } from '../../../app/algorand/algorandSlice'
import { Grid } from '@mui/material'
import useAddressIsValid from '../../../Hooks/AddressIsValid'
import useFormValidity from '../../../Hooks/FormValidity'

import Modal from '../../../components/UI/Modal/Modal'
import useModal from '../../../Hooks/Modal'
import ModalResponse from '../../../components/ModalResponse/ModalResponse'
import { CustomDropdownContainer, SelectBox } from '../../../components/CustomSelect/CustomSelect'
import useCustomSelect from '../../../Hooks/CustomSelect'


/**
 * 
 * !!! MAKE SURE TO REWRITE THIS COMPONENT CODE!!!
 */
const defaultAlgoSelect = { id: 0, name: 'Algorand', amount: "", image: algorandLogo, unit: 'ALGO' }

function NormalTxn() {
    const dispatch = useDispatch()

    const { 
        value: assetValue, 
        setValueByClick: setAssetValueByClick, 
        handleSelectChange: handleAmountSelectChange,
        handleSetAssetValue: handleSetAssetValue 
    } = useSelectInput()
    const { value: recipientAddressValue, handleChange: handleRecipientAddressChange, handleSetValue: handleSetRecipientAddressValue } = useFormControl()

    const { 
        value: assetTwoValue, 
        handleSelectChange: handleAmountTwoSelectChange, 
        setValueByClick: setAssetTwoValueByClick, 
        handleSetAssetValue: handleSetAssetTwoValue 
    } = useSelectInput()
    const { value: recipientTwoAddressValue, handleChange: handleRecipientTwoAddressChange, handleSetValue: handleSetRecipientTwoAddressValue } = useFormControl()

    const { 
        value: assetThreeValue, 
        handleSelectChange: handleAmountThreeSelectChange,
        setValueByClick: setAssetThreeValueByClick, 
        handleSetAssetValue: handleSetAssetThreeValue 
    } = useSelectInput()
    const { value: recipientThreeAddressValue, handleChange: handleRecipientThreeAddressChange, handleSetValue: handleSetRecipientThreeAddressValue } = useFormControl()

    const { 
        value: assetFourValue, 
        handleSelectChange: handleAmountFourSelectChange,
        setValueByClick: setAssetFourValueByClick, 
        handleSetAssetValue: handleSetAssetFourValue 
    } = useSelectInput()
    const { value: recipientFourAddressValue, handleChange: handleRecipientFourAddressChange, handleSetValue: handleSetRecipientFourAddressValue } = useFormControl()
    
    const { 
        value: assetFiveValue, 
        handleSelectChange: handleAmountFiveSelectChange,
        setValueByClick: setAssetFiveValueByClick, 
        handleSetAssetValue: handleSetAssetFiveValue 
    } = useSelectInput()
    const { value: recipientFiveAddressValue, handleChange: handleRecipientFiveAddressChange, handleSetValue: handleSetRecipientFiveAddressValue } = useFormControl()
    
    const [addedTxns, setAddedTxns] = useState({ two: false, three: false, four: false, five: false })

    const [numOfTxns, setNumOfTxns] = useState(1)
    
    const passphrase = useSelector(state => state.algorand.passphrase)
    const [displayScanner, setDisplayScanner] = useState(false)

    const { modalState, handleModalOpen, handleModalClose } = useModal()
    const { 
        modalState: confirmModalState, 
        handleModalOpen: handleConfirmModalOpen, 
        handleModalClose: handleConfirmModalClose 
    } = useModal()

    // const transferContainer = document.getElementsByClassName("normal-transfer-container");
    // console.log(transferContainer[0])

    // const item2 = document.getElementsByClassName("item-2");

    // useEffect(() => {
    //     item2.scrollIntoView();
    // }, [numOfTxns])  

    const addTxn = () => {
        if (numOfTxns === 1) {
            setAddedTxns({ two: true, three: false, four: false, five: false })
            setNumOfTxns(2)
        } else if (numOfTxns === 2) {
            setAddedTxns({ two: true, three: true, four: false, five: false })
            setNumOfTxns(3)
        } else if (numOfTxns === 3) {
            setAddedTxns({ two: true, three: true, four: true, five: false })
            setNumOfTxns(4)
        } else if (numOfTxns === 4) {
            setAddedTxns({ two: true, three: true, four: true, five: true })
            setNumOfTxns(5)
        } else {
            return
        }
    }

    const removeTxn = () => {
        if (numOfTxns === 5) {
            setAddedTxns({ two: true, three: true, four: true, five: false })
            setNumOfTxns(4)
        } else if (numOfTxns === 4) {
            setAddedTxns({ two: true, three: true, four: false, five: false })
            setNumOfTxns(3)
        } else if (numOfTxns === 3) {
            setAddedTxns({ two: true, three: false, four: false, five: false })
            setNumOfTxns(2)
        } else if (numOfTxns === 2) {
            setAddedTxns({ two: false, three: false, four: false, five: false })
            setNumOfTxns(1)
        } else {
            return
        }
    }

    const [addressToSetByScan, setAddressToSetByScan] = useState(null)

    const openScanner = (num) => {
        setAddressToSetByScan(num)
        setDisplayScanner(true)
    }

    const closeScanner = () => {
        setDisplayScanner(false)
        setAddressToSetByScan(null)
    }

    const scanSuccessCallback = (decodedText) => {
        if (addressToSetByScan === 'main') handleSetRecipientAddressValue(decodedText)
        else if (addressToSetByScan === 'two') handleSetRecipientTwoAddressValue(decodedText)
        else if (addressToSetByScan === 'three') handleSetRecipientThreeAddressValue(decodedText)
        else if (addressToSetByScan === 'four') handleSetRecipientFourAddressValue(decodedText)
        else if (addressToSetByScan === 'five') handleSetRecipientFiveAddressValue(decodedText)

        setTimeout(() => closeScanner(), 1000) // one second delay just so you can see the green flash on scanner
    }

    const { status: recipientAddressStatus, data } = useAddressIsValid(recipientAddressValue)
    const { status: recipientTwoAddressStatus, data: dataTwo } = useAddressIsValid(recipientTwoAddressValue)
    const { status: recipientThreeAddressStatus, data: dataThree } = useAddressIsValid(recipientThreeAddressValue)
    const { status: recipientFourAddressStatus, data: dataFour } = useAddressIsValid(recipientFourAddressValue)
    const { status: recipientFiveAddressStatus, data: dataFive } = useAddressIsValid(recipientFiveAddressValue)


    const { handleSubmit } = useSubmit()

    const assetsArray = [assetValue.id, assetTwoValue.id, assetThreeValue.id, assetFourValue.id, assetFiveValue.id]
    const addressesArray = [recipientAddressValue, recipientTwoAddressValue, recipientThreeAddressValue, recipientFourAddressValue, recipientFiveAddressValue]
    const amountsArray = [assetValue.amount, assetTwoValue.amount, assetThreeValue.amount, assetFourValue.amount, assetFiveValue.amount]

    const { formIsValid } = useFormValidity(...addressesArray.slice(0, numOfTxns), ...amountsArray.slice(0, numOfTxns));

    const addressData = [data, dataTwo, dataThree, dataFour, dataFive]
    const allAddressesAreValid = addressData.slice(0, numOfTxns).every(address => address === true)

    const [sendCurrencyStatus, setSendCurrencyStatus] = useState('')

    const resetValues = () => {
        handleSetAssetValue(defaultAlgoSelect)
        handleSetRecipientAddressValue('')

        handleSetAssetTwoValue(defaultAlgoSelect)
        handleSetRecipientTwoAddressValue('')

        handleSetAssetThreeValue(defaultAlgoSelect)
        handleSetRecipientThreeAddressValue('')

        handleSetAssetFourValue(defaultAlgoSelect)
        handleSetRecipientFourAddressValue('')

        handleSetAssetFiveValue(defaultAlgoSelect)
        handleSetRecipientFiveAddressValue('')

        setNumOfTxns(1)
    }

    const submitSuccessCallback = (res) => {
        setSendCurrencyStatus(HTTP_STATUS.FULFILLED)
        handleModalOpen()
        dispatch(getActiveAlgorandWallet())
        resetValues()
        console.log(res)
    }

    const submitErrorCallback = (err) => {
        setSendCurrencyStatus(HTTP_STATUS.REJECTED)
        handleModalOpen()
        resetValues()
        console.log(err)
    }

    const sendCurrency = () => {
        handleConfirmModalClose()

        const formData = new FormData()
        formData.append('transaction_type', numOfTxns === 1 ? 'direct' : 'multiple')
        
        if (numOfTxns === 1) {
            if (assetValue?.id !== 0) formData.append('asset_id', assetValue.id) //if currency is an asset
            formData.append('currency_type', assetValue?.id === 0 ? 'algo' : 'asset')
            formData.append('receiver_addr', recipientAddressValue)
            formData.append('amount', assetValue.amount)
        } 

        if (numOfTxns > 1) {
            formData.append('asset_list', assetsArray.slice(0, numOfTxns).join(','))
            formData.append('address_list', addressesArray.slice(0, numOfTxns).join(','))
            formData.append('amount_list', amountsArray.slice(0, numOfTxns).join(','))
        }
        
        formData.append('phrase', passphrase)

        for (let pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]);
        }

        // handleSubmit(sendAlgorand(formData), submitSuccessCallback, submitErrorCallback)
    }

    const transactionFee = (0.001 + (numOfTxns - 1) * 0.1).toFixed(3)
    
    const success = sendCurrencyStatus === HTTP_STATUS.FULFILLED

    const {
        selectedItem: fromSelectedItem,
        setSelectedItem: setFromSelectedItem,
        dropdownIsOpen: fromDropdownIsOpen,
        setDropdownIsOpen: setFromDropdownIsOpen,
        toggleDropdownIsOpen: toggleFromDropdownIsOpen,
    } = useCustomSelect('initializeAsFilled')

    const { data: holdingsData } = useSelector(state => state.algorand.holdings)
    const { value: fromInputValue, handleChange: handleFromInputChange, handleSetValue: handleSetFromInputValue } = useFormControl()

    return (
        <Fragment>
            {/* <Grid item container xs={12} className="normal-transfer-container" style={{ border: '1px solid red', overflowY: 'scroll' }}> */}
                
                
                <Grid item container xs={12} style={{ position: 'relative' }}>
                    <SelectBox 
                        { ...fromSelectedItem } 
                        handleClick={toggleFromDropdownIsOpen} 
                        value={fromInputValue}
                        onChange={handleFromInputChange}
                        placeholder="0"
                    />

                    <CustomDropdownContainer 
                        dropdownItems={holdingsData} 
                        dropdownIsOpen={fromDropdownIsOpen}
                        setDropdownIsOpen={setFromDropdownIsOpen}
                        handleDropdownItemClick={setFromSelectedItem}
                        handleSetInputValue={handleSetFromInputValue}
                    />
                </Grid>


                <SelectInput
                    label="Amount"
                    value={assetValue.amount}
                    asset={assetValue}
                    handleChange={(e) => handleAmountSelectChange('amount', e)}
                    handleItemClick={setAssetValueByClick}
                    placeholder="0"
                />
                <FormControl
                    label="Recipient Address"
                    value={recipientAddressValue}
                    handleChange={handleRecipientAddressChange}
                    icon={scannerIcon}
                    type="text"
                    center
                    handleIconClick={() => openScanner('main')}
                />
                { recipientAddressStatus === HTTP_STATUS.PENDING && <LoaderContainer><ThreeDots height="80" width="80" color='gray' /></LoaderContainer> }
                { data === false && <ErrorMessage>Address is invalid</ErrorMessage> }
                
                <Grid item container style={{ display: addedTxns.two ? 'block' : 'none' }} className="item-2">
                    <SelectInput
                        label="Amount"
                        value={assetTwoValue.amount}
                        asset={assetTwoValue}
                        handleChange={(e) => handleAmountTwoSelectChange('amount', e)}
                        handleItemClick={setAssetTwoValueByClick}
                        placeholder="0"
                    />
                    <FormControl
                        label="Recipient Address"
                        value={recipientTwoAddressValue}
                        handleChange={handleRecipientTwoAddressChange}
                        icon={scannerIcon}
                        type="text"
                        center
                        handleIconClick={() => openScanner('two')}
                    />
                    { recipientTwoAddressStatus === HTTP_STATUS.PENDING && <LoaderContainer><ThreeDots height="80" width="80" color='gray' /></LoaderContainer> }
                    { dataTwo === false && <ErrorMessage>Address is invalid</ErrorMessage> }
                </Grid>

                <Grid item container style={{ display: addedTxns.three ? 'block' : 'none' }}>
                    <SelectInput 
                        label="Amount"
                        value={assetThreeValue.amount}
                        asset={assetThreeValue}
                        handleChange={(e) => handleAmountThreeSelectChange('amount', e)}
                        handleItemClick={setAssetThreeValueByClick}
                        placeholder="0"
                    />
                    <FormControl
                        label="Recipient Address"
                        value={recipientThreeAddressValue}
                        handleChange={handleRecipientThreeAddressChange}
                        icon={scannerIcon}
                        type="text"
                        center
                        handleIconClick={() => openScanner('three')}
                    />
                    { recipientThreeAddressStatus === HTTP_STATUS.PENDING && <LoaderContainer><ThreeDots height="80" width="80" color='gray' /></LoaderContainer> }
                    { dataThree === false && <ErrorMessage>Address is invalid</ErrorMessage> }
                </Grid>

                <Grid item container style={{ display: addedTxns.four ? 'block' : 'none' }}>
                    <SelectInput 
                        label="Amount"
                        value={assetFourValue.amount}
                        asset={assetFourValue}
                        handleChange={(e) => handleAmountFourSelectChange('amount', e)}
                        handleItemClick={setAssetFourValueByClick}
                        placeholder="0"
                        passedDown
                    />
                    <FormControl
                        label="Recipient Address"
                        value={recipientFourAddressValue}
                        handleChange={handleRecipientFourAddressChange}
                        icon={scannerIcon}
                        type="text"
                        center
                        handleIconClick={() => openScanner('four')}
                    />
                    { recipientFourAddressStatus === HTTP_STATUS.PENDING && <LoaderContainer><ThreeDots height="80" width="80" color='gray' /></LoaderContainer> }
                    { dataFour === false && <ErrorMessage>Address is invalid</ErrorMessage> }
                </Grid>

                <Grid item container style={{ display: addedTxns.five ? 'block' : 'none' }}>
                    <SelectInput 
                        label="Amount"
                        value={assetFiveValue.amount}
                        asset={assetFiveValue}
                        handleChange={(e) => handleAmountFiveSelectChange('amount', e)}
                        handleItemClick={setAssetFiveValueByClick}
                        placeholder="0"
                        passedDown
                    />
                    <FormControl
                        label="Recipient Address"
                        value={recipientFiveAddressValue}
                        handleChange={handleRecipientFiveAddressChange}
                        icon={scannerIcon}
                        type="text"
                        center
                        handleIconClick={() => openScanner('five')}
                    />
                    { recipientFiveAddressStatus === HTTP_STATUS.PENDING && <LoaderContainer><ThreeDots height="80" width="80" color='gray' /></LoaderContainer> }
                    { dataFive === false && <ErrorMessage>Address is invalid</ErrorMessage> }
                </Grid>
            {/* </Grid> */}


            <IconButton onClick={addTxn} style={{ display: numOfTxns === 5 && 'none' }}>
                <AddIcon fontSize="large" />
            </IconButton>
            <IconButton onClick={removeTxn} style={{ display: numOfTxns === 1 && 'none' }}>
                <RemoveIcon fontSize="large" />
            </IconButton>

            <Label>Transaction Fee</Label>

            <TransactionFee>
                <img src={algorandLogo} alt="" />
                <p>{ transactionFee }</p>
            </TransactionFee>

            <ButtonContainer>
                <Button 
                    fullWidth 
                    onClick={() => handleConfirmModalOpen()} 
                    disabled={!formIsValid || !allAddressesAreValid}
                >
                    send asset
                </Button>
            </ButtonContainer>
            

            {
                displayScanner && (
                    <QrCodeScanner
                        handleClickAway={closeScanner}
                        fps={10}
                        qrbox={250}
                        disableFlip={false}
                        qrCodeSuccessCallback={scanSuccessCallback}
                    />
                )
            }

            {/* confirm transaction modal */}
            <Modal open={confirmModalState} handleClose={handleConfirmModalClose} fullScreenForMobile>
                <Title center>Confirm Transaction</Title>
                <ConfirmTransferItem>
                    <span>Asset</span>
                    <span>Algo</span>
                </ConfirmTransferItem>
                <ConfirmTransferItem>
                    <span>Amount</span>
                    <span>100</span>
                </ConfirmTransferItem>
                <ConfirmTransferItem>
                    <span>To</span>
                    <span>TL5BSUBQ5RROY4BWUUE4DN3QAHER635JDZUAJD7PSBJCQW4TQD42GOE2HU</span>
                </ConfirmTransferItem>
                <ConfirmTransferItem>
                    <span>Fee</span>
                    <span>{transactionFee}</span>
                </ConfirmTransferItem>
                
                <Button fullWidth onClick={sendCurrency}>confirm</Button>
                <Title center onClick={() => handleConfirmModalClose()} style={{ cursor: 'pointer' }}>CANCEL</Title>
            </Modal>

            {/* response modal */}
            <Modal open={modalState} handleClose={handleModalClose}>
                <ModalResponse
                    success={success}
                    title={success ? 'success' : 'error'}
                    description={
                        success ? 'Sent successfully' : 'Sorry, unable to complete your transfer at the moment'
                    }
                />
            </Modal>
            
        </Fragment>
    )
}

export default NormalTxn