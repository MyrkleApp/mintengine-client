import React, { Fragment } from 'react'
import { ButtonContainer, ModalTitle } from '../../../pages/AssetManager/assetManager'
import FormControl from '../../FormControl/FormControl'
import { Button } from '../../UI/Button/button'

function Unfreeze() {

    return (
        <Fragment>
            <ModalTitle>MODIFY</ModalTitle>
            <p>After an asset has been created only the manager, reserve, freeze and clawback accounts can be changed.</p>
            <FormControl 
                icon 
                label="Asset ID"
            />
            <FormControl 
                icon 
                label="Manager's Address"
            />
            <FormControl 
                icon 
                label="Reserve Address"
            />
            <FormControl 
                icon 
                label="Freeze Address"
            />
            <FormControl 
                icon 
                label="Clawback Address"
            />
            <FormControl 
                icon 
                label="Note"
                textArea
            />
            <ButtonContainer>
                <Button fullWidth disabled>modify</Button>
            </ButtonContainer>
        </Fragment>
    )
}

export default Unfreeze
