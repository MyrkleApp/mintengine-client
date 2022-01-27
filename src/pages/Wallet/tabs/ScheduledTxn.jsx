import React, { Fragment } from 'react'
import FormControl from '../../../components/FormControl/FormControl'
import SelectInput from '../../../components/SelectInput/SelectInput'
import scannerIcon from '../../../assets/icons/scanner.svg'
import calenderIcon from '../../../assets/icons/calendar.svg'
import TripleInput from '../../../components/TripleInput/TripleInput'


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
        </Fragment>
    )
}

export default ScheduledTxn
