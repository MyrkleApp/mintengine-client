import { Grid } from '@mui/material'
import React from 'react'
import * as Styles from './timeInput'


function TimeInput({ half, label, value, handleClick }) {

    return (
        <Grid item xs={ half ? 6 : 12 }>
            <Styles.Root>
                <label>{label}</label>
                <div className="container" onClick={handleClick}>
                    <input 
                        type="number" 
                        placeholder="hh" 
                        value={value.getHours()}
                        readOnly 
                    />  
                    <input 
                        type="number" 
                        placeholder="mm" 
                        value={value.getMinutes()}
                        readOnly
                    />
                    <input  
                        type="number" 
                        placeholder="ss" 
                        value="00"
                        readOnly 
                    />
                </div>
            </Styles.Root>
        </Grid>
    )
}

export default TimeInput
