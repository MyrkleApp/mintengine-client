import React, { Fragment, useState } from 'react'
import FormControl from '../../../components/FormControl/FormControl'
import SelectInput from '../../../components/SelectInput/SelectInput'
import scannerIcon from '../../../assets/icons/scanner.svg'
import { Label, TransactionFee, ButtonContainer, LoaderContainer, ErrorMessage } from '../wallet'
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
import { useSelector } from 'react-redux'
import useSubmit from '../../../Hooks/Submit'
import { sendAlgorand } from '../../../app/algorand/algorandSlice'
import { Grid } from '@mui/material'
import useAddressIsValid from '../../../Hooks/AddressIsValid'
import useFormValidity from '../../../Hooks/FormValidity'

import Modal from '../../../components/UI/Modal/Modal'
import useModal from '../../../Hooks/Modal'
import ModalResponse from '../../../components/ModalResponse/ModalResponse'


// `https://data.messari.io/api/v1/assets/${coin}/metrics`

/**
 * 
 * !!! MAKE SURE TO REWRITE THIS COMPONENT CODE!!!
 */

function NormalTxn() {
    const { value: assetValue, setValueByClick: setAssetValueByClick, handleSelectChange: handleAmountSelectChange } = useSelectInput()
    const { value: recipientAddressValue, handleChange: handleRecipientAddressChange, handleSetValue: handleSetRecipientAddressValue } = useFormControl()

    const { value: assetTwoValue, handleSelectChange: handleAmountTwoSelectChange } = useSelectInput()
    const { value: recipientTwoAddressValue, handleChange: handleRecipientTwoAddressChange, handleSetValue: handleSetRecipientTwoAddressValue } = useFormControl()

    const { value: assetThreeValue, handleSelectChange: handleAmountThreeSelectChange } = useSelectInput()
    const { value: recipientThreeAddressValue, handleChange: handleRecipientThreeAddressChange, handleSetValue: handleSetRecipientThreeAddressValue } = useFormControl()

    const { value: assetFourValue, handleSelectChange: handleAmountFourSelectChange } = useSelectInput()
    const { value: recipientFourAddressValue, handleChange: handleRecipientFourAddressChange, handleSetValue: handleSetRecipientFourAddressValue } = useFormControl()
    
    const { value: assetFiveValue, handleSelectChange: handleAmountFiveSelectChange } = useSelectInput()
    const { value: recipientFiveAddressValue, handleChange: handleRecipientFiveAddressChange, handleSetValue: handleSetRecipientFiveAddressValue } = useFormControl()
    
    const [addedTxns, setAddedTxns] = useState({ two: false, three: false, four: false, five: false })

    const [numOfTxns, setNumOfTxns] = useState(1)
    
    const passphrase = useSelector(state => state.algorand.passphrase)
    const [displayScanner, setDisplayScanner] = useState(false)

    

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

    const setAddedTxnAddressByScan = (scannedData) => {
        const txns = [...addedTxns]
        txns[addressToSetByScan].address = scannedData
        setAddedTxns(txns)
    }

    const scanSuccessCallback = (decodedText) => {
        if (addressToSetByScan === 'main') handleSetRecipientAddressValue(decodedText)
        else if (addressToSetByScan === 'two') handleSetRecipientTwoAddressValue(decodedText)
        else if (addressToSetByScan === 'three') handleSetRecipientThreeAddressValue(decodedText)
        else if (addressToSetByScan === 'four') handleSetRecipientFourAddressValue(decodedText)
        else if (addressToSetByScan === 'five') handleSetRecipientFiveAddressValue(decodedText)

        // addressToSetByScan === 'main' ? handleSetRecipientAddressValue(decodedText) : setAddedTxnAddressByScan(decodedText)

        setTimeout(() => closeScanner(), 1000) // one second delay just so you can see the green flash on scanner
    }

    const { status: recipientAddressStatus, data } = useAddressIsValid(recipientAddressValue)
    const { status: recipientTwoAddressStatus, data: dataTwo } = useAddressIsValid(recipientTwoAddressValue)
    const { status: recipientThreeAddressStatus, data: dataThree } = useAddressIsValid(recipientThreeAddressValue)
    const { status: recipientFourAddressStatus, data: dataFour } = useAddressIsValid(recipientFourAddressValue)
    const { status: recipientFiveAddressStatus, data: dataFive } = useAddressIsValid(recipientFiveAddressValue)


    const { handleSubmit } = useSubmit()

    const addressesArray = [recipientAddressValue, recipientTwoAddressValue, recipientThreeAddressValue, recipientFourAddressValue, recipientFiveAddressValue]
    const amountsArray = [assetValue.amount, assetTwoValue.amount, assetThreeValue.amount, assetFourValue.amount, assetFiveValue.amount]

    const { formIsValid } = useFormValidity(...addressesArray.slice(0, numOfTxns), ...amountsArray.slice(0, numOfTxns));

    const addressData = [data, dataTwo, dataThree, dataFour, dataFive]
    const allAddressesAreValid = addressData.slice(0, numOfTxns).every(address => address === true)

    const { modalState, handleModalOpen, handleModalClose } = useModal()

    let sendStatus = ""

    const submitSuccessCallback = (res) => {
        handleModalOpen()
        sendStatus = HTTP_STATUS.FULFILLED
        console.log(res)
    }

    const submitErrorCallback = (err) => {
        handleModalOpen()
        sendStatus = HTTP_STATUS.REJECTED
        console.log(err)
    }

    const sendAsset = () => {

        const formData = new FormData()
        formData.append('transaction_type', numOfTxns === 1 ? 'direct' : 'multiple')
        formData.append('currency_type', !assetValue.id ? 'algo' : 'asset')
        if (assetValue.id) formData.append('asset_id', assetValue.id) //if currency is an asset

        if (numOfTxns === 1) {
            formData.append('receiver_addr', recipientAddressValue)
            formData.append('amount', assetValue.amount)
        } 

        if (numOfTxns > 1) {
            formData.append('address_array', addressesArray.slice(0, numOfTxns))
            formData.append('amount_array', amountsArray.slice(0, numOfTxns))
        }
        
        formData.append('phrase', passphrase)

        handleSubmit(sendAlgorand(formData), submitSuccessCallback, submitErrorCallback)
    }

    
    const success = sendStatus === HTTP_STATUS.FULFILLED

    return (
        <Fragment>
            <SelectInput
                label="Amount"
                value={assetValue.amount}
                asset={assetValue}
                handleChange={(e) => handleAmountSelectChange('amount', e)}
                handleItemClick={setAssetValueByClick}
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
            
            <Grid item container style={{ display: addedTxns.two ? 'block' : 'none' }}>
                <SelectWithoutDropdown 
                    label="Amount"
                    value={assetTwoValue.amount}
                    asset={assetValue}
                    handleChange={(e) => handleAmountTwoSelectChange('amount', e)}
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
                <SelectWithoutDropdown 
                    label="Amount"
                    value={assetThreeValue.amount}
                    asset={assetValue}
                    handleChange={(e) => handleAmountThreeSelectChange('amount', e)}
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
                <SelectWithoutDropdown 
                    label="Amount"
                    value={assetFourValue.amount}
                    asset={assetValue}
                    handleChange={(e) => handleAmountFourSelectChange('amount', e)}
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
                <SelectWithoutDropdown 
                    label="Amount"
                    value={assetFiveValue.amount}
                    asset={assetValue}
                    handleChange={(e) => handleAmountFiveSelectChange('amount', e)}
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



            <IconButton onClick={addTxn} style={{ display: numOfTxns === 5 && 'none' }}>
                <AddIcon fontSize="large" />
            </IconButton>
            <IconButton onClick={removeTxn} style={{ display: numOfTxns === 1 && 'none' }}>
                <RemoveIcon fontSize="large" />
            </IconButton>

            <Label>Transaction Fee</Label>

            <TransactionFee>
                <img src={algorandLogo} alt="" />
                <p>0.001</p>
            </TransactionFee>

            <ButtonContainer>
                <Button fullWidth onClick={sendAsset} disabled={!formIsValid || !allAddressesAreValid}>send asset</Button>
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

            {/* response modal */}
            <Modal open={modalState} handleClose={handleModalClose}>
                <ModalResponse
                    success={success}
                    title={success ? 'success' : 'error'}
                    description={
                        success ? 'Sent successfully' : 'something went wrong'
                    }
                />
            </Modal>
            
        </Fragment>
    )
}

export default NormalTxn