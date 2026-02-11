import { Grid } from '@mui/material'
import React from 'react'
import * as Styles from './timeInput.js'


function TimeInput({ half, label, value, handleHourClick, handleMinuteClick, handleSecondClick }) {

    return (
        <Grid item xs={ half ? 6 : 12 }>
            <Styles.Root>
                <label>{label}</label>
                <div className="container">
                    <input 
                        type="number" 
                        placeholder="hh" 
                        value={value.getHours()}
                        onClick={handleHourClick}
                        readOnly 
                    />  
                    <input 
                        type="number" 
                        placeholder="mm" 
                        value={value.getMinutes()}
                        onClick={handleMinuteClick}
                        readOnly
                    />
                    <input  
                        type="number" 
                        placeholder="ss" 
                        value={value.getSeconds()}
                        onClick={handleSecondClick}
                        readOnly 
                    />
                </div>
            </Styles.Root>
        </Grid>
    )
}

export default TimeInput
