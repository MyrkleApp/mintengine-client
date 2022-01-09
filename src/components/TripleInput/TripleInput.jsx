import { Grid } from '@mui/material'
import React from 'react'
import * as Styles from './tripleInput'


function TripleInput({ half }) {

    return (
        <Grid item xs={ half ? 6 : 12 }>
            <Styles.Root>
                <label>Time</label>
                <div className="container">
                    <input type="text" placeholder="hh" />  
                    <input type="text" placeholder="mm" />
                    <input type="text" placeholder="ss" />
                </div>
            </Styles.Root>
        </Grid>
    )
}

export default TripleInput
