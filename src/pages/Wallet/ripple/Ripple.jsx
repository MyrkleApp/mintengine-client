import React, { Fragment } from 'react'
import FormControl from '../../../components/FormControl/FormControl.jsx'
import SelectInput from '../../../components/SelectInput/SelectInput.jsx'
import scannerIcon from '../../../assets/icons/scanner.svg'

function Ripple() {

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

export default Ripple
