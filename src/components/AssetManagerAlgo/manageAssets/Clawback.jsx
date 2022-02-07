import React, { Fragment } from 'react'
import { ButtonContainer, ModalTitle } from '../../../pages/AssetManager/assetManager'
import FormControl from '../../FormControl/FormControl'
import { Button } from '../../UI/Button/button'

function Unfreeze() {

    return (
        <Fragment>
            <ModalTitle>CLAWBACK</ModalTitle>
            <p>The clawback address represents an account that is allowed to transfer assets from and to any asset holder.</p>
            <FormControl 
                icon 
                label="Asset ID"
            />
            <FormControl 
                icon 
                label="Target Address"
            />
            <FormControl 
                icon 
                label="Note"
                textArea
            />
            <ButtonContainer>
                <Button fullWidth disabled>clawback</Button>
            </ButtonContainer>
        </Fragment>
    )
}

export default Unfreeze
