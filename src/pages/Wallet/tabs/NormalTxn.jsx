import React, { Fragment } from 'react'
import FormControl from '../../../components/FormControl/FormControl'
import SelectInput from '../../../components/SelectInput/SelectInput'
import scannerIcon from '../../../assets/icons/scanner.svg'
import { Label, TransactionFee, ButtonContainer } from '../wallet'
import algorandLogo from '../../../assets/icons/algorandLogo.png'
import addIcon from '../../../assets/icons/add.png'
import { Button } from '../../../components/UI/Button/button'
import useFormControl from '../../../Hooks/FormControl'

function NormalTxn() {
    const { value: amountValue, handleChange: handleAmountChange, setValueByClick: setAmountValueByClick } = useFormControl()
    const { value: recipientAddressValue, handleChange: handleRecipientAddressChange } = useFormControl()

    return (
        <Fragment>
            <SelectInput 
                label="Amount" 
                value={amountValue}
                handleChange={handleAmountChange}
                handleItemClick={setAmountValueByClick}
            />
            <FormControl
                label="Recipient Address"
                value={recipientAddressValue}
                handleChange={handleRecipientAddressChange}
                icon={scannerIcon}
                type="text"
                center
            />
            <div style={{ width: '100%' }}>
                <img src={addIcon} alt="" style={{ margin: '10px auto 0 0', cursor: 'pointer' }} />
            </div>
            <Label>Transaction Fee</Label>
            <TransactionFee>
                <img src={algorandLogo} alt="" />
                <p>0.001</p>
            </TransactionFee>
            <ButtonContainer>
                <Button fullWidth disabled>send asset</Button>
            </ButtonContainer>
        </Fragment>
    )
}

export default NormalTxn
