import React, { Fragment, useState } from 'react'
import FormControl from '../../../components/FormControl/FormControl'
import SelectInput from '../../../components/SelectInput/SelectInput'
import scannerIcon from '../../../assets/icons/scanner.svg'
import { Label, TransactionFee, ButtonContainer } from '../wallet'
import algorandLogo from '../../../assets/icons/algorandLogo.png'
import { Button } from '../../../components/UI/Button/button'
import useFormControl from '../../../Hooks/FormControl'
import useSelectInput from '../../../Hooks/SelectInput'
import { IconButton } from '../wallet'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SelectWithoutDropdown from '../../../components/SelectInput/SelectWithoutDropdown'
import QrCodeScanner from '../../../components/QrCodeScanner/QrCodeScanner'
import { Backdrop } from '@mui/material'

function NormalTxn() {
    const { value: assetValue, setValueByClick: setAssetValueByClick, handleSelectChange: handleAmountSelectChange } = useSelectInput()
    const { value: recipientAddressValue, handleChange: handleRecipientAddressChange, handleSetValue: handleSetRecipientAddressValue } = useFormControl()
    const [displayScanner, setDisplayScanner] = useState(false)

    const [addedTxns, setAddedTxns] = useState([])

    const addTxn = () => {
        if (addedTxns.length === 4) return

        setAddedTxns(prevState => [...prevState, { amount: '', address: '' }])
    }

    const removeTxn = () => {
        if (addedTxns.length === 0) return

        const txns = [...addedTxns]
        txns.splice(addedTxns.length - 1, 1)
        setAddedTxns(txns)
    }

    const handleAddedTxnChange = (index, e, fieldToChange) => {
        const txns = [...addedTxns]
        txns[index][fieldToChange] = e.target.value
        setAddedTxns(txns)
    }

    const [addressToSetByScan, setAddressToSetByScan] = useState(null)

    const openScanner = (address) => {
        setAddressToSetByScan(address)
        setDisplayScanner(true)
    }

    const closeScanner = () => {
        setDisplayScanner(false)
        setAddressToSetByScan(null)
    }

    const setAddedTxnAddressByScan = scannedData => {
        const txns = [...addedTxns]
        txns[addressToSetByScan].address = scannedData
        setAddedTxns(txns)
    }



    return (
        <Fragment>
            <SelectInput
                label="Amount"
                value={assetValue.amount}
                selectedItem={assetValue}
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
                <Button fullWidth disabled>send asset</Button>
            </ButtonContainer>

            {
                displayScanner && (
                    <Backdrop open={displayScanner} onClick={() => setDisplayScanner(false)}>
                        <QrCodeScanner 
                            setValue={addressToSetByScan === 'main' ? handleSetRecipientAddressValue : setAddedTxnAddressByScan}
                            handleClose={closeScanner}
                        />
                    </Backdrop>
                )
            }
            
        </Fragment>
    )
}

export default NormalTxn
