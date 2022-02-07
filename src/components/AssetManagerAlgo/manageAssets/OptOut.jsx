import React, { Fragment } from 'react'
import { ButtonContainer, ModalTitle } from '../../../pages/AssetManager/assetManager'
import FormControl from '../../FormControl/FormControl'
import { Button } from '../../UI/Button/button'

function OptOut() {

    return (
        <Fragment>
            <ModalTitle>OPT-OUT</ModalTitle>
            <p>Opt-Out with a given Asset ID to remove an Algorand asset holding from your account.</p>
            {/* <FormControl 
                icon 
                label="Asset ID"
            />
            <FormControl 
                icon 
                label="Note"
                textArea
            /> */}
            <ButtonContainer>
                <Button fullWidth disabled>opt-out</Button>
            </ButtonContainer>
        </Fragment>
    )
}

export default OptOut
