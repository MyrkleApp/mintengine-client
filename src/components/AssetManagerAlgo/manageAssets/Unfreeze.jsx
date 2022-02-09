import React, { Fragment } from 'react'
import { ButtonContainer, ModalTitle } from '../../../pages/AssetManager/assetManager'
import FormControl from '../../FormControl/FormControl'
import { Button } from '../../UI/Button/button'

function Unfreeze() {

    return (
        <Fragment>
            <ModalTitle>UNFREEZE</ModalTitle>
            <p>Upon creation of an asset, you can specify an unfreeze address.</p>
            <FormControl 
                label="Asset ID"
            />
            <FormControl 
                label="Target Address"
            />
            <FormControl 
                label="Note"
                textArea
            />
            <ButtonContainer>
                <Button fullWidth disabled>unfreeze</Button>
            </ButtonContainer>
        </Fragment>
    )
}

export default Unfreeze
