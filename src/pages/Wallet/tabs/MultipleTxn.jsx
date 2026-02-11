import React, { Fragment } from 'react'
import FormControl from '../../../components/FormControl/FormControl.jsx'
import SelectInput from '../../../components/SelectInput/SelectInput.jsx'
import scannerIcon from '../../../assets/icons/scanner.svg'
import addIcon from '../../../assets/icons/add.png'
import { ButtonContainer } from '../wallet.js'
import { Button } from '../../../components/UI/Button/button.js'
import useFormControl from '../../../Hooks/FormControl.js'

function MultipleTxn() {
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

            <ButtonContainer>
                <Button fullWidth disabled>send asset</Button>
            </ButtonContainer>
        </Fragment>
    )
}

export default MultipleTxn
