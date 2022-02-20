import React from 'react'
import * as Styles from './exchange'
import DashboardWrapper from '../../containers/DashboardWrapper/DashboardWrapper'
import { Grid } from '@mui/material'
import ChooseNetwork from '../../components/ChooseNetwork/ChooseNetwork'
import SelectInput from '../../components/SelectInput/SelectInput'
import exchangeLogo from '../../assets/icons/exchange.png'
import { Button } from '../../components/UI/Button/button'
import useFormControl from '../../Hooks/FormControl'

function ExchangeAlgo() {
    const { value: fromValue, handleChange: handleFromChange, setValueByClick: setFromValueByClick } = useFormControl()
    const { value: toValue, handleChange: handleToChange, setValueByClick: setToValueByClick } = useFormControl()

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
                                    value={fromValue}
                                    handleChange={handleFromChange}
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
                                    value={toValue}
                                    handleChange={handleToChange}
                                    handleItemClick={setToValueByClick}
                                />
                            </div>
                        </Styles.Container>
                        <Styles.ButtonContainer>
                            <Button fullWidth disabled>swap</Button>
                        </Styles.ButtonContainer>
                    </Styles.Root>
                </Grid>
            </Grid>
        </DashboardWrapper>
    )
}

export default ExchangeAlgo
