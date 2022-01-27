import React, { Fragment } from 'react'
import FormControl from '../../../components/FormControl/FormControl'
import SelectInput from '../../../components/SelectInput/SelectInput'
import scannerIcon from '../../../assets/icons/scanner.svg'
import addIcon from '../../../assets/icons/add.png'
import { ButtonContainer } from '../wallet'
import { Button } from '../../../components/UI/Button/button'

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
