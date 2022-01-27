import React, { Fragment } from 'react'
import FormControl from '../../../components/FormControl/FormControl'
import SelectInput from '../../../components/SelectInput/SelectInput'
import scannerIcon from '../../../assets/icons/scanner.svg'

function MultipleTxn() {

    return (
        <Fragment>
            <SelectInput label="Amount" />
            <FormControl
                label="Recipient Address"
                icon={scannerIcon}
                type="text"
                center
            />
        </Fragment>
    )
}

export default MultipleTxn
