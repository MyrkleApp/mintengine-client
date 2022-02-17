import React, { Fragment } from 'react'
import { ButtonContainer, ModalTitle } from '../../../pages/AssetManager/assetManager'
import { DropdownItem } from '../../../components/SelectInput/selectInput'
import { Button } from '../../../components/UI/Button/button'
import algorandLogo from '../../../assets/icons/algorandLogo.png'


function OptOut() {

    return (
        <Fragment>
            <ModalTitle>REMOVE-TOKEN</ModalTitle>
            <p>Remove token with a given Asset ID to remove an Algorand asset holding from your account.</p>
            <div style={{ backgroundColor: '#f5fefa' }}>
                {
                    Array(3).fill().map((_, i) => (
                        <DropdownItem key={i}>
                            <div className="left">
                                <div className="leftTop">
                                    <img src={algorandLogo} alt="" />
                                    <span>ALGORAND</span>
                                </div>
                                <div className="leftBottom">
                                    <span>ALGO</span>
                                </div>
                            </div>
                            <div className="right">
                                <div className="rightTop">
                                    <span>0.00</span>
                                </div>
                                <div className="rightBottom">
                                    <span>Asset ID:</span>
                                    <span>384303832</span>
                                </div>
                            </div>
                        </DropdownItem>
                    ))
                }
            </div>
            <ButtonContainer>
                <Button fullWidth disabled>opt-out</Button>
            </ButtonContainer>
        </Fragment>
    )
}

export default OptOut
