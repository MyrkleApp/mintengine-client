import React, { Fragment, useRef, useState } from 'react'
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
import TextField from '@mui/material/TextField';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { ThemeProvider } from '@mui/material';
import { theme } from '../../../components/MyTabs/MyTabs'

function ScheduledTxn() {
    const { value: amountValue, handleChange: handleAmountChange, setValueByClick: setAmountValueByClick } = useFormControl()
    const { value: recipientAddressValue, handleChange: handleRecipientAddressChange } = useFormControl()
    const [dateValue, setDateValue] = useState(new Date());

    const dateRef = useRef()

    const handleDateClick = () => {
        dateRef.current.click()
    }

    return (
        <Fragment>
            <ThemeProvider theme={theme}>
                <div style={{ display: 'none' }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <MobileDatePicker
                            // label="Date desktop"
                            inputFormat="dd/MM/yyyy"
                            value={dateValue}
                            onChange={(newValue) => setDateValue(newValue)}
                            renderInput={(params) => <TextField {...params} />}
                            inputRef={dateRef}
                        />
                    </LocalizationProvider>
                </div>
            </ThemeProvider>
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
                value={dateValue.toDateString()}
                readOnly
                icon={calenderIcon}
                type="text"
                center
                handleClick={handleDateClick}
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
