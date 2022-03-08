import React from 'react'
import * as Styles from './exchange'
import DashboardWrapper from '../../containers/DashboardWrapper/DashboardWrapper'
import { Grid } from '@mui/material'
import ChooseNetwork from '../../components/ChooseNetwork/ChooseNetwork'
import SelectInput from '../../components/SelectInput/SelectInput'
import exchangeLogo from '../../assets/icons/exchange.png'
import { Button } from '../../components/UI/Button/button'
import useSelectInput from '../../Hooks/SelectInput'
import useFormValidity from '../../Hooks/FormValidity'
import { useSelector } from 'react-redux'
import { swapAlgorand } from '../../app/algorand/algorandSlice'
import { HTTP_STATUS } from '../../constants/httpStatus'
import Modal from '../../components/UI/Modal/Modal'
import ModalResponse from '../../components/ModalResponse/ModalResponse'
import useModal from '../../Hooks/Modal'
import useSubmit from '../../Hooks/Submit'

function ExchangeAlgo() {
    const { value: fromValue, setValueByClick: setFromValueByClick, handleSelectChange: handleFromSelectChange } = useSelectInput()
    const { value: toValue, setValueByClick: setToValueByClick, handleSelectChange: handleToSelectChange } = useSelectInput()
    const passphrase = useSelector(state => state.algorand.passphrase)

    const { formIsValid } = useFormValidity(fromValue.amount)
    const { modalState, handleModalOpen, handleModalClose } = useModal()
    const { handleSubmit } = useSubmit()

    const handleSwap = () => {
        const data = {
            from_asset: fromValue.id, 
            to_asset: toValue.id,
            asset_amount: fromValue.amount,
            phrase: passphrase
        }
        
        handleSubmit(swapAlgorand(data), handleModalOpen, handleModalOpen)
    }

    const { status } = useSelector(state => state.algorand.swap)
    const success = status === HTTP_STATUS.FULFILLED

    return (
        <DashboardWrapper>
            <ChooseNetwork />
            <Grid container>
                <Grid item xs={12} md={8}>
                    <Styles.Root>
                        <Styles.Title>Swap</Styles.Title>
                        <Styles.Text>Swap your tokens.</Styles.Text>
                        <Styles.Line />
                        <Styles.Container>
                            <div className="innerContainer">
                                <SelectInput
                                    exchange
                                    label="From"
                                    value={fromValue.amount}
                                    asset={fromValue}
                                    handleChange={(e) => handleFromSelectChange('amount', e)}
                                    handleItemClick={setFromValueByClick}
                                />
                                <Styles.Info>
                                    Balance: <strong>2.023</strong>
                                </Styles.Info>
                            </div>
                            <img src={exchangeLogo} alt="" />
                        </Styles.Container>
                        <Styles.Container>
                            <div className="innerContainer">
                                <SelectInput
                                    exchange
                                    label="To"
                                    asset={toValue}
                                    handleItemClick={setToValueByClick}
                                    readOnly
                                />
                            </div>
                        </Styles.Container>
                        <Styles.ButtonContainer>
                            <Button fullWidth disabled={!formIsValid} onClick={handleSwap}>swap</Button>
                        </Styles.ButtonContainer>
                    </Styles.Root>
                </Grid>
            </Grid>

            {/* response modal */}
            <Modal open={modalState} handleClose={handleModalClose}>
                <ModalResponse
                    success={success}
                    title={success ? 'success' : 'error'}
                    description={
                        success ? 'successfully swapped asset' : 'something went wrong!'
                    }
                />
            </Modal>
        </DashboardWrapper>
    )
}

export default ExchangeAlgo
