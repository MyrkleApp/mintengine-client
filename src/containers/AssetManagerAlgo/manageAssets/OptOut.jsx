import React, { Fragment, useState } from 'react'
import { ButtonContainer, ModalTitle } from '../../../pages/AssetManager/assetManager'
import SelectItem from '../../../components/SelectInput/SelectItem'
import { Button } from '../../../components/UI/Button/button'
import { useSelector } from 'react-redux'
import useFormControl from '../../../Hooks/FormControl'
import useFormValidity from '../../../Hooks/FormValidity'
import { algorandOptOut } from '../../../app/algorand/algorandSlice'
import useSubmit from '../../../Hooks/Submit'


function OptOut({ handleModalClose, handleResponse }) {
    const { status, data } = useSelector(state => state.algorand.holdings)
    const { value: assetToOptOut, setValueByClick: setAssetToOptOut } = useFormControl()
    const { formIsValid } = useFormValidity(assetToOptOut)
    const [selectedItem, setSelectedItem] = useState(null)
    const passphrase = useSelector(state => state.algorand.passphrase)
    const { handleSubmit } = useSubmit()

    const handleOptOut = () => {
        // const optOutData = { 
        //     sender_addr: 
        // }
        // handleSubmit(algorandOptOut(optOutData), handleResponse, handleResponse)
    }

    return (
        <Fragment>
            <ModalTitle>REMOVE-TOKEN</ModalTitle>
            <p>Remove token with a given Asset ID to remove an Algorand asset holding from your account.</p>
            <div style={{ backgroundColor: '#f5fefa' }}>
                {
                    data?.assets?.map((asset) => (
                        <SelectItem
                            key={asset.id}
                            assetId={asset.id}
                            name={asset.name}
                            amount={asset.amount}
                            handleItemClick={setAssetToOptOut}
                            selected={selectedItem === asset.id}
                            setSelectedItem={setSelectedItem}
                        />
                    ))
                }
            </div>
            <ButtonContainer>
                <Button fullWidth disabled={!formIsValid} onClick={handleOptOut}>remove</Button>
            </ButtonContainer>
        </Fragment>
    )
}

export default OptOut
