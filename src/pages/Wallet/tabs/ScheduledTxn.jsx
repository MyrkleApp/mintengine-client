import React, { Fragment, useState } from 'react'
import FormControl from '../../../components/FormControl/FormControl.jsx'
import SelectInput from '../../../components/SelectInput/SelectInput.jsx'
import scannerIcon from '../../../assets/icons/scanner.svg'
import calenderIcon from '../../../assets/icons/calendar.svg'
import TimeInput from '../../../components/TimeInput/TimeInput.jsx'
import { Label, TransactionFee, ButtonContainer, LoaderContainer, ErrorMessage, Title, SubTitle } from '../wallet.js'
import algorandLogo from '../../../assets/icons/algorandLogo.png'
import { Button } from '../../../components/UI/Button/button.js'
import useFormControl from '../../../Hooks/FormControl.js'
import TextField from '@mui/material/TextField';
import { LocalizationProvider, DesktopDatePicker, TimePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import useSelectInput from '../../../Hooks/SelectInput.js'
import QrCodeScanner from '../../../components/QrCodeScanner/QrCodeScanner.jsx'
import { formattedTime, getTimeZone } from '../constants.js'
import { useDispatch, useSelector } from 'react-redux'
import useSubmit from '../../../Hooks/Submit.js'
import { getActiveAlgorandWallet, sendAlgorand } from '../../../app/algorand/algorandSlice.js'
import { Grid } from '@mui/material'
import useAddressIsValid from '../../../Hooks/AddressIsValid.js'
import { HTTP_STATUS } from '../../../constants/httpStatus.js'
import { ThreeDots } from 'react-loader-spinner'
import useFormValidity from '../../../Hooks/FormValidity.js'
import useModal from '../../../Hooks/Modal.js'
import Modal from '../../../components/UI/Modal/Modal.jsx'
import ModalResponse from '../../../components/ModalResponse/ModalResponse.jsx'

const muiHiddenInputStyles = { position: 'absolute', top: '80px', left: '30px', height: '10px', transform: 'scale(0.2)', zIndex: '-1' }

const defaultAlgoSelect = { id: 0, name: 'Algorand', amount: "", image: algorandLogo, unit: 'ALGO' }

function ScheduledTxn() {
    const dispatch = useDispatch()
    const { value: assetValue, setValueByClick: setAssetValueByClick, handleSelectChange: handleAmountSelectChange, handleSetAssetValue: handleSetAssetValue } = useSelectInput()
    const { value: recipientAddressValue, handleChange: handleRecipientAddressChange, handleSetValue: handleSetRecipientAddressValue } = useFormControl()
    const [timeValue, setTimeValue] = useState(new Date());
    const [timePickerView, setTimePickerView] = useState("hours")
    const { formIsValid } = useFormValidity(assetValue.amount, recipientAddressValue, timeValue)
    const [datePickerIsOpen, setDatePickerIsOpen] = useState(false)
    const [timePickerIsOpen, setTimePickerIsOpen] = useState(false)
    const passphrase = useSelector(state => state.algorand.passphrase)
    const { handleSubmit } = useSubmit()

    const [displayScanner, setDisplayScanner] = useState(false)

    const closeScanner = () => setDisplayScanner(false)

    const scanSuccessCallback = (decodedText) => {
        handleSetRecipientAddressValue(decodedText)
        setTimeout(() => closeScanner(), 1000) // one second delay just so you can see the green flash on scanner
    }

    const handleHourClick = () => {
        setTimePickerIsOpen(true)
        setTimePickerView('hours')
    }

    const handleMinuteClick = () => {
        setTimePickerIsOpen(true)
        setTimePickerView('minutes')
    }

    const handleSecondClick = () => {
        setTimePickerIsOpen(true)
        setTimePickerView('seconds')
    }

    const { status: recipientAddressStatus, data: addressIsValid } = useAddressIsValid(recipientAddressValue)

    const { modalState, handleModalOpen, handleModalClose } = useModal()
    const { 
        modalState: confirmModalState, 
        handleModalOpen: handleConfirmModalOpen, 
        handleModalClose: handleConfirmModalClose 
    } = useModal()

    const [sendCurrencyStatus, setSendCurrencyStatus] = useState('')

    const submitSuccessCallback = (res) => {
        setSendCurrencyStatus(HTTP_STATUS.FULFILLED)
        handleModalOpen()
        dispatch(getActiveAlgorandWallet())
        handleSetAssetValue(defaultAlgoSelect)
        handleSetRecipientAddressValue('')
        
        console.log(res)
    }

    const submitErrorCallback = (err) => {
        setSendCurrencyStatus(HTTP_STATUS.REJECTED)
        handleModalOpen()
        console.log(err)
    }

    const sendAsset = () => {
        handleConfirmModalClose()

        // console.log(timeValue.toLocaleDateString(undefined, {day:'2-digit',timeZoneName: 'short' }))

        const formData = new FormData()
        formData.append('transaction_type', 'scheduled')
        formData.append('currency_type', !assetValue.id ? 'algo' : 'asset')
        formData.append('set_time', formattedTime(timeValue))
        formData.append('receiver_addr', recipientAddressValue)
        formData.append('amount', assetValue.amount)
        formData.append('phrase', passphrase)
        // formData.append('timezone', getTimeZone(timeValue))

        //if currency is an asset
        if (assetValue.id) formData.append('asset_id', assetValue.id)

        const timezone = getTimeZone(timeValue)
        const operator = timezone[3]
        const hourVariant = timezone.slice(4, timezone.length)
        const modifiedTime = new Date(timeValue)
        
        if (operator === '+') {
            modifiedTime.setHours(modifiedTime.getHours() - Number(hourVariant.slice(0, 2)))
        } else {
            modifiedTime.setHours(modifiedTime.getHours() + Number(hourVariant.slice(0, 2)))
        }

        formData.append('set_time', formattedTime(modifiedTime))

        handleSubmit(sendAlgorand(formData), submitSuccessCallback, submitErrorCallback)

        // target address for testing
        // WBJY32EU6GP3UKAAM5FLUUPHU7K74CZDDH4ULHOKKUQN3PZLZUHVRXN5IY 
    }

    const success = sendCurrencyStatus === HTTP_STATUS.FULFILLED

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
                handleIconClick={() => setDisplayScanner(true)}
            />
            { recipientAddressStatus === HTTP_STATUS.PENDING && <LoaderContainer><ThreeDots height="80" width="80" color='gray' /></LoaderContainer> }
            { addressIsValid === false && <ErrorMessage>Address is invalid</ErrorMessage> }

            <Grid item container xs={12} style={{ position: 'relative' }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            open={datePickerIsOpen}
                            onClose={() => setDatePickerIsOpen(false)}
                            label="Date desktop"
                            inputFormat="MM/dd/yyyy"
                            value={timeValue}
                            onChange={(newValue) => setTimeValue(newValue)}
                            renderInput={(params) => <TextField {...params} style={muiHiddenInputStyles} />}
                        />
                    </LocalizationProvider>
            
                <FormControl
                    label="Date"
                    whiteBackground
                    value={timeValue.toDateString()}
                    readOnly
                    icon={calenderIcon}
                    type="text"
                    center
                    handleClick={() => setDatePickerIsOpen(true)}
                    handleIconClick={() => setDatePickerIsOpen(true)}
                />
            </Grid>
            <Grid item container xs={12} style={{ position: 'relative' }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker
                            open={timePickerIsOpen}
                            onClose={() => setTimePickerIsOpen(false)}
                            ampm={false}
                            openTo={timePickerView}
                            views={['hours', 'minutes', 'seconds']}
                            inputFormat="HH:mm:ss"
                            mask="__:__:__"
                            label="With seconds"
                            value={timeValue}
                            onChange={(newValue) => setTimeValue(newValue)}
                            renderInput={(params) => <TextField {...params} style={muiHiddenInputStyles}  />}
                        />
                    </LocalizationProvider>

                <TimeInput 
                    label="Time (24 hour)"
                    value={timeValue}
                    handleHourClick={handleHourClick}
                    handleMinuteClick={handleMinuteClick}
                    handleSecondClick={handleSecondClick}
                />
            </Grid>
            <Label>Transaction Fee</Label>
            <TransactionFee>
                <img src={algorandLogo} alt="" />
                <p>0.001</p>
            </TransactionFee>
            <ButtonContainer>
                <Button 
                    fullWidth 
                    onClick={() => handleConfirmModalOpen()} 
                    disabled={!formIsValid || !addressIsValid}
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
            <Modal open={confirmModalState} handleClose={handleConfirmModalClose}>
                <Title center>Confirm Transaction</Title>
                <SubTitle center>{ `${assetValue.amount} ${assetValue.id === 0 ? 'Algo' : assetValue.name}` } will be sent to</SubTitle>
                <SubTitle center>{`${recipientAddressValue.substring(0, 12)}...`}</SubTitle>
                <SubTitle center>by the time:</SubTitle>
                <SubTitle center>{timeValue.toLocaleString()}</SubTitle>
                <Button fullWidth onClick={sendAsset}>Send asset</Button>
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

export default ScheduledTxn
