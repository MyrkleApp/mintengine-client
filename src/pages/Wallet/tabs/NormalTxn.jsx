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
import useUserInputDispatch from '../../../Hooks/UserInputDispatch'
import { checkAlgorandAddressIsValid } from '../../../app/algorand/algorandSlice'
import { HTTP_STATUS } from '../../../constants/httpStatus'
import { useSelector } from 'react-redux'
import useSubmit from '../../../Hooks/Submit'
import { sendAlgorand } from '../../../app/algorand/algorandSlice'

function NormalTxn() {
    const { value: assetValue, setValueByClick: setAssetValueByClick, handleSelectChange: handleAmountSelectChange } = useSelectInput()
    const { value: recipientAddressValue, handleChange: handleRecipientAddressChange, handleSetValue: handleSetRecipientAddressValue } = useFormControl()
    const passphrase = useSelector(state => state.algorand.passphrase)
    const [displayScanner, setDisplayScanner] = useState(false)

    const [addedTxns, setAddedTxns] = useState([])

    const addTxn = () => {
        if (addedTxns.length === 4) return

        setAddedTxns(prevState => [...prevState, { amount: '', address: '' }])
    }

    const removeTxn = () => {
        if (addedTxns.length === 0) return

        const txns = [...addedTxns]
        txns.splice((addedTxns.length - 1), 1)
        setAddedTxns(txns)
    }

    const handleAddedTxnChange = (index, e, fieldToChange) => {
        const txns = [...addedTxns]
        txns[index][fieldToChange] = e.target.value
        setAddedTxns(txns)
    }

    const [addressToSetByScan, setAddressToSetByScan] = useState(null)

    const openScanner = (i) => {
        setAddressToSetByScan(i)
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
        addressToSetByScan === 'main' ? handleSetRecipientAddressValue(decodedText) : setAddedTxnAddressByScan(decodedText)
        setTimeout(() => closeScanner(), 1000) // one second delay just so you can see the green flash on scanner
    }

    const { status: recipientAddressStatus, data } = useUserInputDispatch(recipientAddressValue, { wallet_address: recipientAddressValue }, checkAlgorandAddressIsValid)

    const { handleSubmit } = useSubmit()

    const sendAsset = () => {

        const formData = new FormData()
        formData.append('transaction_type', addedTxns.length === 0 ? 'direct' : 'multiple')
        formData.append('currency_type', !assetValue.id ? 'algo' : 'asset')
        if (assetValue.id) formData.append('asset_id', assetValue.id) //if currency is an asset
        if (addedTxns.length === 0) formData.append('receiver_addr', recipientAddressValue)
        if (addedTxns.length === 0) formData.append('amount', assetValue.amount)
        formData.append('phrase', passphrase)

        handleSubmit(sendAlgorand(formData))
    }

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
            { recipientAddressStatus === HTTP_STATUS.REJECTED && <ErrorMessage>Address is invalid</ErrorMessage> }
            {
                addedTxns.map((txn, i) => (
                    <Fragment key={i}>
                        <SelectWithoutDropdown 
                            label="Amount"
                            value={txn.amount}
                            asset={assetValue}
                            handleChange={e => handleAddedTxnChange(i, e, 'amount')}
                        />
                        <FormControl
                            label="Recipient Address"
                            value={txn.address}
                            handleChange={e => handleAddedTxnChange(i, e, 'address')}
                            icon={scannerIcon}
                            type="text"
                            center
                            handleIconClick={() => openScanner(i)}
                        />
                    </Fragment>
                ))
            }

            <IconButton onClick={addTxn} style={{ display: addedTxns.length === 4 && 'none' }}>
                <AddIcon fontSize="large" />
            </IconButton>
            <IconButton onClick={removeTxn} style={{ display: addedTxns.length === 0 && 'none' }}>
                <RemoveIcon fontSize="large" />
            </IconButton>

            <Label>Transaction Fee</Label>

            <TransactionFee>
                <img src={algorandLogo} alt="" />
                <p>0.001</p>
            </TransactionFee>

            <ButtonContainer>
                <Button fullWidth onClick={sendAsset}>send asset</Button>
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
            
        </Fragment>
    )
}

export default NormalTxn