import React, { Fragment } from 'react'
import { ButtonContainer, ModalTitle } from '../../../pages/AssetManager/assetManager'
import SelectItem from '../../../components/SelectInput/SelectItem'
import { Button } from '../../../components/UI/Button/button'
import { useSelector } from 'react-redux'

function OptOut() {
    const { status, data } = useSelector(state => state.algorand.holdings)

    return (
        <Fragment>
            <ModalTitle>REMOVE-TOKEN</ModalTitle>
            <p>Remove token with a given Asset ID to remove an Algorand asset holding from your account.</p>
            <div style={{ backgroundColor: '#f5fefa' }}>
                {
                    data?.assets?.map((_, i) => (
                        <SelectItem key={i}
                        
                        />
                            
                    ))
                }
            </div>
            <ButtonContainer>
                <Button fullWidth disabled>remove</Button>
            </ButtonContainer>
        </Fragment>
    )
}

export default OptOut
