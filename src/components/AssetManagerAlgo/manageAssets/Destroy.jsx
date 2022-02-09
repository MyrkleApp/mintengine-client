import React, { Fragment } from 'react'
import { ButtonContainer, ModalTitle } from '../../../pages/AssetManager/assetManager'
import FormControl from '../../FormControl/FormControl'
import { Button } from '../../UI/Button/button'

function Destroy() {

    return (
        <Fragment>
            <ModalTitle>DESTROY</ModalTitle>
            <p>All of the assets must be owned by the creator of the asset before the asset can be deleted.</p>
            <FormControl 
                label="Asset ID"
            />
            <FormControl 
                label="Note"
                textArea
            />
            <ButtonContainer>
                <Button fullWidth disabled>destroy</Button>
            </ButtonContainer>
        </Fragment>
    )
}

export default Destroy
