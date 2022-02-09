import React, { Fragment } from 'react'
import { ButtonContainer, ModalTitle } from '../../../pages/AssetManager/assetManager'
import FormControl from '../../FormControl/FormControl'
import { Button } from '../../UI/Button/button'

function OptIn() {

    return (
        <Fragment>
            <ModalTitle>OPT-IN</ModalTitle>
            <p>Opt-in with a given asset ID to receive an Algorand asset to your account.</p>
            <FormControl 
                label="Asset ID"
            />
            <FormControl 
                label="Note"
                textArea
            />
            <ButtonContainer>
                <Button fullWidth disabled>opt-in</Button>
            </ButtonContainer>
        </Fragment>
    )
}

export default OptIn
