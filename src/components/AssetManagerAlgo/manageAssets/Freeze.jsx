import React, { Fragment } from 'react'
import { ButtonContainer, ModalTitle } from '../../../pages/AssetManager/assetManager'
import FormControl from '../../FormControl/FormControl'
import { Button } from '../../UI/Button/button'

function Freeze() {

    return (
        <Fragment>
            <ModalTitle>FREEZE</ModalTitle>
            <p>Upon creation of an asset, you can specify a freeze address.</p>
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
                <Button fullWidth disabled>freeze</Button>
            </ButtonContainer>
        </Fragment>
    )
}

export default Freeze
