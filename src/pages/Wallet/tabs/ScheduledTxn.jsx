import React, { Fragment, useRef, useState } from 'react'
import FormControl from '../../../components/FormControl/FormControl'
import SelectInput from '../../../components/SelectInput/SelectInput'
import scannerIcon from '../../../assets/icons/scanner.svg'
import calenderIcon from '../../../assets/icons/calendar.svg'
import TimeInput from '../../../components/TimeInput/TimeInput'
import { Label, TransactionFee } from '../wallet'
import algorandLogo from '../../../assets/icons/algorandLogo.png'
import { Button } from '../../../components/UI/Button/button'
import { ButtonContainer } from '../wallet'
import useFormControl from '../../../Hooks/FormControl'
import TextField from '@mui/material/TextField';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import MobileTimePicker from '@mui/lab/MobileTimePicker';
import { ThemeProvider } from '@mui/material';
import { theme } from '../../../components/MyTabs/MyTabs'
import './scheduledTxn.css'
import useSelectInput from '../../../Hooks/SelectInput'
import QrCodeScanner from '../../../components/QrCodeScanner/QrCodeScanner'
import { formattedTime, getTimeZone } from '../constants'
import { useSelector } from 'react-redux'
import useSubmit from '../../../Hooks/Submit'
import { sendAlgorand } from '../../../app/algorand/algorandSlice'

function ScheduledTxn() {
    const { value: assetValue, setValueByClick: setAssetValueByClick, handleSelectChange: handleAmountSelectChange } = useSelectInput()
    const { value: recipientAddressValue, handleChange: handleRecipientAddressChange, handleSetValue: handleSetRecipientAddressValue } = useFormControl()
    const [timeValue, setTimeValue] = useState(new Date());
    const passphrase = useSelector(state => state.algorand.passphrase)
    const { handleSubmit } = useSubmit()

    const [displayScanner, setDisplayScanner] = useState(false)

    const dateRef = useRef()
    const timeRef = useRef()

    const handleDateClick = () => dateRef.current.click()
    const handleTimeClick = () => timeRef.current.click() 

    const closeScanner = () => setDisplayScanner(false)

    const scanSuccessCallback = (decodedText) => {
        handleSetRecipientAddressValue(decodedText)
        setTimeout(() => closeScanner(), 1000) // one second delay just so you can see the green flash on scanner
    }

    const sendAsset = () => {

        // console.log(timeValue.toLocaleDateString(undefined, {day:'2-digit',timeZoneName: 'short' }))

        const formData = new FormData()
        formData.append('transaction_type', 'scheduled')
        formData.append('currency_type', !assetValue.id ? 'algo' : 'asset')
        formData.append('set_time', formattedTime(timeValue))
        formData.append('receiver_addr', recipientAddressValue)
        formData.append('amount', assetValue.amount)
        formData.append('phrase', passphrase)
        formData.append('timezone', getTimeZone(timeValue))

        //if currency is an asset
        if (assetValue.id) formData.append('asset_id', assetValue.id)

        // handleSubmit(sendAlgorand(formData))

        // target address for testing
        // WBJY32EU6GP3UKAAM5FLUUPHU7K74CZDDH4ULHOKKUQN3PZLZUHVRXN5IY 
    }

    return (
        <Fragment>
            <ThemeProvider theme={theme}>
                <div style={{ display: 'none' }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <MobileDatePicker
                            // label="Date desktop"
                            inputFormat="dd/MM/yyyy"
                            value={timeValue}
                            onChange={(newValue) => setTimeValue(newValue)}
                            renderInput={(params) => <TextField {...params} />}
                            inputRef={dateRef}
                        />
                        <MobileTimePicker
                            // label="For mobile"
                            value={timeValue}
                            onChange={(newValue) => setTimeValue(newValue)}
                            renderInput={(params) => <TextField {...params} />}
                            inputRef={timeRef}
                        />
                    </LocalizationProvider>
                </div>
            </ThemeProvider>
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
                handleIconClick={() => setDisplayScanner(true)}
            />
            <FormControl
                label="Date"
                value={timeValue.toDateString()}
                readOnly
                icon={calenderIcon}
                type="text"
                center
                handleClick={handleDateClick}
                handleIconClick={handleDateClick}
            />
            <TimeInput 
                label="Time (24 hour)"
                value={timeValue}
                handleClick={handleTimeClick}
            />
            <Label>Transaction Fee</Label>
            <TransactionFee>
                <img src={algorandLogo} alt="" />
                <p>0.001</p>
            </TransactionFee>
            <ButtonContainer>
                <Button fullWidth onClick={sendAsset} disabled>send asset</Button>
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

export default ScheduledTxn
