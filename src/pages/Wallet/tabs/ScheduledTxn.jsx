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


function ScheduledTxn() {

    return (
        <Fragment>
            <SelectInput label="Amount" />
            <FormControl
                label="Recipient Address"
                icon={scannerIcon}
                type="text"
                center
            />
            <FormControl
                label="Date"
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
