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
                label="Asset ID"
            />
            <FormControl 
                label="Manager's Address"
            />
            <FormControl 
                label="Reserve Address"
            />
            <FormControl 
                label="Freeze Address"
            />
            <FormControl 
                label="Clawback Address"
            />
            <FormControl 
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
