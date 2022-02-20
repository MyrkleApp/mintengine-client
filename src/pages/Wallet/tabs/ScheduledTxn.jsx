import React, { Fragment } from 'react'
import FormControl from '../../../components/FormControl/FormControl'
import SelectInput from '../../../components/SelectInput/SelectInput'
import scannerIcon from '../../../assets/icons/scanner.svg'
import calenderIcon from '../../../assets/icons/calendar.svg'
import TripleInput from '../../../components/TripleInput/TripleInput'
import { Label, TransactionFee } from '../wallet'
import algorandLogo from '../../../assets/icons/algorandLogo.png'
import { Button } from '../../../components/UI/Button/button'
import { ButtonContainer } from '../wallet'
import useFormControl from '../../../Hooks/FormControl'


function ScheduledTxn() {
    const { value: amountValue, handleChange: handleAmountChange, setValueByClick: setAmountValueByClick } = useFormControl()
    const { value: recipientAddressValue, handleChange: handleRecipientAddressChange } = useFormControl()
    const { value: dateValue, handleChange: handleDateChange } = useFormControl()

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
            <FormControl
                label="Date"
                value={dateValue}
                handleChange={handleDateChange}
                icon={calenderIcon}
                type="date"
                center
            />
            <TripleInput />
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

export default ScheduledTxn
